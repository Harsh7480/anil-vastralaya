'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchAPI } from '@/utils/api'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchAPI('/testimonials')
        const allTestimonials = Array.isArray(data) ? data : data.testimonials || data.data || []
        const activeTestimonials = allTestimonials.filter(t => t.status === 'active')
        setTestimonials(activeTestimonials)
      } catch (err) {
        console.error('Failed to load testimonials:', err)
      } finally {
        setLoading(false)
      }
    }
    loadTestimonials()
  }, [])

  const totalSlides = testimonials.length
  const isSlider = totalSlides > 3
  const maxIndex = isSlider ? totalSlides - 3 : 0

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  useEffect(() => {
    if (!isSlider || loading) return
    const interval = setInterval(goNext, 5000)
    return () => clearInterval(interval)
  }, [isSlider, loading, goNext])

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Testimonials</p>
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border border-gray-300 border-t-gray-900 rounded-full animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  const TestimonialCard = ({ item }) => (
    <div className="group p-8 lg:p-10 bg-[#FAF7F2] hover:bg-[#98635D] transition-colors duration-500 h-full flex flex-col">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < item.rating ? 'text-gray-900 group-hover:text-white' : 'text-gray-300 group-hover:text-gray-600'} transition-colors duration-500`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed mb-8 transition-colors duration-500 flex-1">
        &ldquo;{item.review}&rdquo;
      </p>
      <div className="w-8 h-[1px] bg-gray-300 group-hover:bg-gray-600 mb-6 transition-colors duration-500" />
      <p className="text-sm tracking-wider text-gray-900 group-hover:text-white font-medium transition-colors duration-500">
        {item.name}
      </p>
    </div>
  )

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">Testimonials</p>
          <h2 className="text-4xl lg:text-5xl font-serif text-gray-900">What Our Customers Say</h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:block relative">
          {/* Grid when <=3 */}
          {!isSlider && (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item, index) => (
                <TestimonialCard key={item.id || index} item={item} />
              ))}
            </div>
          )}

          {/* Slider when >3 */}
          {isSlider && (
            <div className="overflow-hidden mx-8">
              <div
                className="flex gap-8 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{ transform: `translateX(calc(-${currentIndex} * (33.333% + 32px)))` }}
              >
                {testimonials.map((item, index) => (
                  <div key={item.id || index} className="shrink-0 w-[calc(33.333%-21.34px)]">
                    <TestimonialCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Arrows */}
          {isSlider && (
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={goPrev}
                className="w-10 h-10 border border-gray-400 flex items-center justify-center hover:bg-[#98635D] text-gray-900 hover:text-white hover:border-[#98635D] transition-all duration-300"
                aria-label="Previous"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 border border-gray-400 flex items-center justify-center hover:bg-[#98635D] text-gray-900 hover:text-white hover:border-[#98635D] transition-all duration-300"
                aria-label="Next"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Mobile: scrollable */}
        <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none">
          {testimonials.map((item, index) => (
            <div key={item.id || index} className="min-w-[85%] snap-start">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
