'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

function CartItemImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] rounded-xl">
        <svg className="w-8 h-8 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain rounded-xl"
      onError={() => setHasError(true)}
    />
  )
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, totalSaved, totalItems } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FAF7F2] flex items-center justify-center">
            <svg className="w-12 h-12 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif text-gray-900 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added any items to your cart yet. Start exploring our collection!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#98635D] text-white text-sm tracking-wider uppercase rounded-full hover:bg-[#7A4E49] transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#FAF7F2] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#98635D] mb-2 font-medium">Your Selection</p>
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900">Shopping Cart</h1>
          <p className="text-sm text-gray-500 mt-2">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const itemSaved = item.originalPrice
                  ? (item.originalPrice - item.price) * item.quantity
                  : 0

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* Image */}
                    <Link
                      href={`/shop/${item.slug}`}
                      className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]"
                    >
                      <CartItemImage src={item.image} alt={item.name} />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          {item.category && (
                            <p className="text-[10px] text-[#98635D] font-medium tracking-wider uppercase mb-1">
                              {item.category}
                            </p>
                          )}
                          <Link
                            href={`/shop/${item.slug}`}
                            className="text-sm sm:text-base font-medium text-gray-900 hover:text-[#98635D] transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                          >
                            -
                          </button>
                          <span className="w-8 sm:w-9 text-center font-medium text-gray-900 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-base sm:text-lg font-bold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.originalPrice && (
                            <div className="flex items-center gap-2 justify-end">
                              <span className="text-xs text-gray-400 line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString()}
                              </span>
                              {itemSaved > 0 && (
                                <span className="text-[10px] font-semibold text-emerald-600">
                                  Save ₹{itemSaved.toLocaleString()}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Clear Cart */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors tracking-wider uppercase"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8">
                <h2 className="text-lg font-serif text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {totalSaved > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Total Savings</span>
                      <span className="font-medium text-emerald-600">-₹{totalSaved.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-emerald-600">
                      {subtotal >= 999 ? 'FREE' : '₹99'}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors"
                    />
                    <button className="px-4 py-2.5 bg-[#98635D] text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-[#7A4E49] transition-all duration-300">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline pt-4 border-t border-gray-200 mb-6">
                  <span className="text-sm font-medium text-gray-500">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{(subtotal >= 999 ? subtotal : subtotal + 99).toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-[#98635D] text-white text-sm font-semibold py-4 rounded-full tracking-wider uppercase hover:bg-[#7A4E49] transition-all duration-500 shadow-lg hover:shadow-xl mb-4">
                  Proceed to Checkout
                </button>

                <Link
                  href="/shop"
                  className="block text-center text-xs text-gray-500 hover:text-gray-900 transition-colors tracking-wider uppercase"
                >
                  Continue Shopping
                </Link>

                {subtotal < 999 && (
                  <div className="mt-4 p-3 bg-white rounded-xl text-center">
                    <p className="text-xs text-gray-500">
                      Add <span className="font-semibold text-[#98635D]">₹{(999 - subtotal).toLocaleString()}</span> more for <span className="font-semibold text-emerald-600">FREE Shipping</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
