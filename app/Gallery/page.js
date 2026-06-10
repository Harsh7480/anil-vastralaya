'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchAPI } from '@/utils/api'

function GalleryImage({ src, alt, className }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  if (!src || src === '/images/placeholder.png' || hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] flex flex-col items-center justify-center">
        <svg className="w-20 h-20 text-[#98635D] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="text-sm text-[#98635D] font-medium px-4 text-center">{alt}</span>
      </div>
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await fetchAPI('/gallery?status=active')
        setGalleryItems(Array.isArray(data) ? data : data.data || [])
      } catch (err) {
        console.error('Failed to load gallery:', err)
      } finally {
        setLoading(false)
      }
    }
    loadGallery()
  }, [])

  const galleryCategories = ['All', ...new Set(galleryItems.map(item => item.category))]

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory)

  if (loading) {
    return (
      <main>
        <section className="bg-[#FFF8E7] py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm tracking-[4px] text-gray-600 mb-3">OUR COLLECTION</p>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Gallery</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our exquisite range of outfits that blend tradition with contemporary fashion.
            </p>
          </div>
        </section>
        <section className="py-20 bg-white">
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
      {/* Hero Section */}
      <section className="bg-[#FFF8E7] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[4px] text-gray-600 mb-3">OUR COLLECTION</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our exquisite range of outfits that blend tradition with contemporary fashion.
          </p>
        </div>
      </section>

      {/* Gallery Filter */}
      {galleryCategories.length > 1 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {galleryCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'bg-[#EDE5DB] text-gray-700 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {galleryItems.length === 0
                  ? 'No gallery images available yet.'
                  : 'No images found in this category.'}
              </p>
              {galleryItems.length > 0 && activeCategory !== 'All' && (
                <button
                  onClick={() => setActiveCategory('All')}
                  className="mt-4 text-gray-900 underline hover:text-gray-600 transition-colors"
                >
                  View All Images
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer"
                >
                  <GalleryImage
                    src={item.image}
                    alt={item.title}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                    <span className="text-xs text-white/80 tracking-widest uppercase">{item.category}</span>
                    <h3 className="text-white font-medium mt-1">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#EDE5DB]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
            Love What You See?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Visit our store or contact us to explore more of our collection and get personalized styling advice.
          </p>
          <a
            href="/contact"
            className="inline-block border border-gray-700 px-8 py-3.5 text-sm tracking-widest text-black hover:bg-black hover:text-white transition duration-300"
          >
            GET IN TOUCH
          </a>
        </div>
      </section>
    </main>
  )
}
