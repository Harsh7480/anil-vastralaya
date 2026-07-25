'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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

function ShopPageContent() {
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')
  const urlSearchQuery = searchParams.get('search') || ''

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState(urlSearchQuery)

  useEffect(() => {
    setSearchTerm(urlSearchQuery)
  }, [urlSearchQuery])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchAPI('/categories'),
          fetchAPI('/products'),
        ])
        const cats = Array.isArray(categoriesData) ? categoriesData : categoriesData.data || []
        setCategories(cats)
        setProducts(Array.isArray(productsData) ? productsData : productsData.data || [])

        if (categorySlug) {
          const matched = cats.find((c) => c.slug === categorySlug)
          if (matched) {
            setActiveCategory(matched.id)
          }
        }
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [categorySlug])

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
            {/* Mobile: horizontal scrollable slider */}
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-none md:hidden">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => { setActiveCategory(category.id); setSearchTerm(''); }}
                  className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 shrink-0 snap-start ${
                    activeCategory === category.id
                      ? 'ring-2 ring-gray-900 shadow-lg'
                      : 'shadow-md'
                  }`}
                >
                  <div className="relative w-[140px] aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]">
                      <ShopCategoryImage src={category.image} alt={category.name} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white text-sm font-medium tracking-wide drop-shadow">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop: original centered design, 6 columns */}
            <div className="hidden md:grid md:grid-cols-6 gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => { setActiveCategory(category.id); setSearchTerm(''); }}
                  className={`group relative overflow-hidden rounded-xl aspect-square cursor-pointer transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'ring-4 ring-gray-900 bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]'
                      : 'bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] hover:ring-2 hover:ring-gray-400'
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-20 h-20 mb-3 relative">
                      <ShopCategoryImage src={category.image} alt={category.name} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {category.description || ''}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {activeCategory !== 'all' && (
              <div className="text-center mt-8">
                <button
                  onClick={() => { setActiveCategory('all'); setSearchTerm(''); }}
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
                      ? 'bg-[#98635D] text-white'
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => {
                const discount = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0

                return (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    className="block bg-white rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
                  >
                    {/* Image Section */}
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-[#EDE5DB] via-[#F5F0EA] to-[#D9CFC3] overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <ShopProductImage src={product.image} alt={product.name} />
                      </div>

                      {/* Hover overlay with quick actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.tag && (
                          <span className="bg-gradient-to-r from-[#98635D] to-[#B8826D] text-white text-[10px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase shadow-lg">
                            {product.tag}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                            -{discount}%
                          </span>
                        )}
                      </div>

                      {!product.inStock && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                          <span className="bg-[#98635D] text-white text-xs font-semibold px-5 py-2 rounded-full tracking-wider uppercase">
                            Sold Out
                          </span>
                        </div>
                      )}

                      {/* Hover action button */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <span className="block w-full bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold py-2.5 rounded-xl text-center hover:bg-[#98635D] hover:text-white transition-all duration-300 tracking-wider uppercase shadow-lg">
                          Quick View
                        </span>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-3">
                      <p className="text-[10px] text-[#98635D] font-medium tracking-wider uppercase mb-1">
                        {product.subcategory || 'Collection'}
                      </p>
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-[#98635D] transition-colors duration-300 leading-snug">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-gray-900">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main>
          <section className="bg-[#FFF8E7] py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm tracking-[4px] text-gray-600 mb-3">EXPLORE</p>
              <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Shop</h1>
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
      }
    >
      <ShopPageContent />
    </Suspense>
  )
}
