'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const categories = [
  {
    id: 'women',
    name: 'Women',
    description: 'Elegant sarees, lehengas & more',
    image: '/images/women.png',
  },
  {
    id: 'ethnic',
    name: 'Ethnic Wear',
    description: 'Traditional & festive collections',
    image: '/images/ethnic.png',
  },
  {
    id: 'kids',
    name: 'Kids',
    description: 'Adorable outfits for little ones',
    image: '/images/kids.png',
  },
  {
    id: 'men',
    name: "Men's Collection",
    description: 'Shirts, kurtas, and suits for men',
    image: '/images/men.png',
  },
]

const products = [
  {
    id: 1,
    name: 'Silk Banarasi Saree',
    price: 2999,
    originalPrice: 4999,
    image: '/images/product1.png',
    tag: 'Bestseller',
    category: 'women',
    subcategory: 'sarees',
  },
  {
    id: 2,
    name: 'Bridal Red Lehenga',
    price: 12999,
    originalPrice: 18999,
    image: '/images/product2.png',
    tag: 'New',
    category: 'ethnic',
    subcategory: 'lehengas',
  },
  {
    id: 3,
    name: 'Cotton Anarkali Set',
    price: 1899,
    originalPrice: 2999,
    image: '/images/product3.png',
    tag: 'Sale',
    category: 'women',
    subcategory: 'kurtas',
  },
  {
    id: 4,
    name: 'Designer Sharara Set',
    price: 4599,
    originalPrice: 6999,
    image: '/images/product4.jpg',
    tag: 'Trending',
    category: 'ethnic',
    subcategory: 'kurtas',
  },
  {
    id: 5,
    name: 'Embroidered Suit',
    price: 3299,
    originalPrice: 5499,
    image: '/images/product1.png',
    tag: 'Bestseller',
    category: 'women',
    subcategory: 'suits',
  },
  {
    id: 6,
    name: 'Georgette Party Saree',
    price: 2199,
    originalPrice: 3999,
    image: '/images/product2.png',
    tag: 'New',
    category: 'women',
    subcategory: 'sarees',
  },
  {
    id: 7,
    name: "Men's Silk Kurta",
    price: 1499,
    originalPrice: 2499,
    image: '/images/product3.png',
    tag: 'Bestseller',
    category: 'men',
    subcategory: 'kurtas',
  },
  {
    id: 8,
    name: 'Kids Lehenga Set',
    price: 999,
    originalPrice: 1599,
    image: '/images/product4.jpg',
    tag: 'New',
    category: 'kids',
    subcategory: 'lehengas',
  },
]

const filterOptions = ['All', 'Sarees', 'Lehengas', 'Kurtas', 'Suits']

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory
    const matchesFilter =
      activeFilter === 'All' ||
      product.subcategory === activeFilter.toLowerCase()
    return matchesCategory && matchesFilter
  })

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-[#FFF8E7] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[4px] text-gray-600 mb-3">EXPLORE</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Shop
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover our curated collection of ethnic and contemporary fashion
            for every occasion.
          </p>
        </div>
      </section>

      {/* Categories */}
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
                    ? 'ring-4 ring-gray-900 bg-[#EDE5DB]'
                    : 'bg-[#EDE5DB] hover:ring-2 hover:ring-gray-400'
                }`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 mb-4 relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
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

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No products found in this category.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setActiveFilter('All')
                }}
                className="mt-4 text-gray-900 underline hover:text-gray-600 transition-colors"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
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
