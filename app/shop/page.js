'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchAPI } from '@/utils/api'

function ShopCategoryImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (!src || src === '/images/placeholder.png' || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg className="w-12 h-12 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      className="object-contain group-hover:scale-110 transition-transform duration-300"
      onError={() => setHasError(true)}
    />
  )
}

function ShopProductImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (!src || src === '/images/placeholder.png' || hasError) {
    return (
      <svg className="w-16 h-16 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => setHasError(true)}
    />
  )
}

export default function ShopPage() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchAPI('/categories'),
          fetchAPI('/products'),
        ])
        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.data || [])
        setProducts(Array.isArray(productsData) ? productsData : productsData.data || [])
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filterOptions = ['All', 'Sarees', 'Lehengas', 'Kurtas', 'Suits']

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.categoryId === activeCategory
    const matchesFilter =
      activeFilter === 'All' ||
      product.subcategory?.toLowerCase() === activeFilter.toLowerCase()
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <main>
        <section className="bg-[#FFF8E7] py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm tracking-[4px] text-gray-600 mb-3">EXPLORE</p>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Shop</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover our curated collection of ethnic and contemporary fashion for every occasion.
            </p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#98635D]"></div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-[#FFF8E7] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[4px] text-gray-600 mb-3">EXPLORE</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Shop</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our curated collection of ethnic and contemporary fashion for every occasion.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-serif text-gray-900 mb-10 text-center">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative overflow-hidden rounded-xl aspect-square cursor-pointer transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'ring-4 ring-gray-900 bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]'
                      : 'bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] hover:ring-2 hover:ring-gray-400'
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 mb-4 relative">
                      <ShopCategoryImage src={category.image} alt={category.name} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description || ''}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            {activeCategory !== 'all' && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveCategory('all')}
                  className="text-sm text-gray-600 underline hover:text-gray-900 transition-colors"
                >
                  Show All Categories
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16 bg-[#EDE5DB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <h2 className="text-2xl font-serif text-gray-900 mb-6 md:mb-0">
              Our Collection
              {activeCategory !== 'all' && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  — {categories.find((c) => c.id === activeCategory)?.name}
                </span>
              )}
            </h2>
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-96 px-5 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#98635D] focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {products.length === 0
                  ? 'No products available yet.'
                  : 'No products found in this category.'}
              </p>
              {products.length > 0 && (
                <button
                  onClick={() => {
                    setActiveCategory('all')
                    setActiveFilter('All')
                    setSearchTerm('')
                  }}
                  className="mt-4 text-gray-900 underline hover:text-gray-600 transition-colors"
                >
                  View All Products
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] flex items-center justify-center">
                    <ShopProductImage src={product.image} alt={product.name} />
                    {product.tag && (
                      <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                        {product.tag}
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
