'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchAPI } from '@/utils/api'

function CategoryImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg className="w-6 h-6 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
      onError={() => setHasError(true)}
    />
  )
}

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAPI('/categories')
        setCategories(Array.isArray(data) ? data : data.data || [])
      } catch (err) {
        console.error('Failed to load categories:', err)
      } finally {
        setLoading(false)
      }
    }
    loadCategories()
  }, [])

  if (loading || categories.length === 0) return null

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-[#FAF7F2]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#98635D] mb-2 font-medium">
            Explore Our Collections
          </p>
          <h2 className="text-2xl lg:text-3xl font-serif text-gray-900 mb-3">
            Shop by Category
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#98635D] to-[#C4A882] mx-auto" />
        </div>

        {/* Mobile: horizontal scrollable slider */}
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none md:hidden">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group shrink-0 snap-start"
            >
              <div className="relative w-[110px] aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] shadow-sm hover:shadow-lg transition-all duration-500">
                <div className="absolute inset-2">
                  <CategoryImage src={cat.image} alt={cat.name} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <h3 className="text-white text-[10px] font-medium tracking-wide drop-shadow-lg text-center leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: compact grid — 8 cards per row */}
        <div className="hidden md:grid md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-2">
                  <CategoryImage src={cat.image} alt={cat.name} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white text-[10px] font-semibold tracking-wide drop-shadow-lg text-center leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
              <p className="text-center text-[11px] font-medium text-gray-600 mt-2 group-hover:text-[#98635D] transition-colors duration-300 truncate">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 px-6 py-2.5 border border-[#98635D] text-[#98635D] text-xs tracking-[0.15em] uppercase hover:bg-[#98635D] hover:text-white transition-all duration-500 rounded-full"
          >
            <span>View All Products</span>
            <span className="block w-4 h-[1px] bg-current group-hover:w-6 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
