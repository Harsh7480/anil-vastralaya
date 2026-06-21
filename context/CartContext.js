'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

function getCartKey(userId) {
  return userId ? `cart_${userId}` : 'cart_guest'
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [prevUserId, setPrevUserId] = useState(null)

  useEffect(() => {
    try {
      const key = getCartKey(user?.id)
      const saved = localStorage.getItem(key)
      if (saved) {
        setItems(JSON.parse(saved))
      } else {
        setItems([])
      }
    } catch {
      setItems([])
    }
    setLoaded(true)
  }, [user?.id])

  useEffect(() => {
    if (loaded) {
      const key = getCartKey(user?.id)
      localStorage.setItem(key, JSON.stringify(items))
    }
  }, [items, loaded, user?.id])

  useEffect(() => {
    if (prevUserId !== undefined && prevUserId !== user?.id) {
      setPrevUserId(user?.id)
    }
  }, [user?.id, prevUserId])

  const addItem = useCallback((product, quantity = 1, size = null) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size)
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category?.name || '',
        size: size || null,
        quantity,
      }]
    })
  }, [])

  const removeItem = useCallback((productId, size = null) => {
    setItems(prev => prev.filter(item => !(item.id === productId && item.size === size)))
  }, [])

  const updateQuantity = useCallback((productId, quantity, size = null) => {
    if (quantity < 1) {
      removeItem(productId, size)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId && item.size === size ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalSaved = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        loaded,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalSaved,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
