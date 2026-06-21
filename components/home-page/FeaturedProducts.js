'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fetchAPI } from '@/utils/api'

function FeaturedProductImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
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
      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      onError={() => setHasError(true)}
    />
  )
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAPI('/products/featured')
        const allProducts = Array.isArray(data) ? data : data.data || []
        setProducts(allProducts.slice(0, 8))
      } catch (err) {
        console.error('Failed to load featured products:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#98635D] mb-2 font-medium">
              Curated Selection
            </p>
            <h2 className="text-2xl lg:text-3xl font-serif text-gray-900 mb-3">
              Featured Products
            </h2>
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#98635D] to-[#C4A882] mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-2xl bg-gray-200 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#FAF7F2] to-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#98635D] mb-2 font-medium">
            Curated Selection
          </p>
          <h2 className="text-2xl lg:text-3xl font-serif text-gray-900 mb-3">
            Featured Products
          </h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#98635D] to-[#C4A882] mx-auto" />
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">No featured products yet.</p>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product) => {
                const discount = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0

                return (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    className="group block"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#EDE5DB] via-[#F5F0EA] to-[#D9CFC3] mb-3">
                      <FeaturedProductImage src={product.image} alt={product.name} />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 rounded-2xl" />

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
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-2xl">
                          <span className="bg-[#98635D] text-white text-xs font-semibold px-5 py-2 rounded-full tracking-wider uppercase">
                            Sold Out
                          </span>
                        </div>
                      )}

                      {/* Quick View on hover */}
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <span className="block w-full bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold py-2.5 rounded-xl text-center hover:bg-[#98635D] hover:text-white transition-all duration-300 tracking-wider uppercase shadow-lg">
                          Quick View
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="px-1">
                      <p className="text-[10px] text-[#98635D] font-medium tracking-wider uppercase mb-1">
                        {product.subcategory || product.category?.name || 'Collection'}
                      </p>
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1.5 group-hover:text-[#98635D] transition-colors duration-300 leading-snug">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-gray-900">
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
          </>
        )}
      </div>
    </section>
  )
}
