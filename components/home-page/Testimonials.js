'use client'

import { useState, useEffect } from 'react'
import { fetchAPI } from '@/utils/api'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

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

  const showDesktopGrid = testimonials.length <= 3

  if (loading) {
    return (
      <section className="relative py-24">
        <div className="absolute inset-0 bg-[url('/images/floral-bg.png')] bg-cover bg-center z-[-20]" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[4px] text-gray-500 mb-2">TESTIMONIALS</p>
            <h2 className="text-4xl font-semibold text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#98635D]"></div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="relative py-24">
      {/* Floral Background */}
      <div className="absolute inset-0 bg-[url('/images/floral-bg.png')] bg-cover bg-center z-[-20]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[4px] text-gray-500 mb-2">
            TESTIMONIALS
          </p>

          <h2 className="text-4xl font-semibold text-gray-900">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials: mobile always slider; desktop grid only when <=3 cards */}
        {showDesktopGrid ? (
          <div className="hidden md:grid md:grid-cols-3 sm:grid-cols-2 gap-10">
            {testimonials.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-[#98635D]/90 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500"
              >
                <div className="text-4xl text-white/30 mb-3">&ldquo;</div>
                <p className="text-gray-100 text-sm leading-relaxed mb-6">
                  {item.review}
                </p>
                <div className="w-10 h-[2px] bg-white/30 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <div className="flex justify-center mt-2 text-yellow-400 text-sm">
                  {'★'.repeat(item.rating)}
                  <span className="text-gray-300">
                    {'★'.repeat(5 - item.rating)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div
          className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none ${
            showDesktopGrid ? 'md:hidden' : 'md:flex'
          }`}
        >
          {testimonials.map((item, index) => (
            <div
              key={item.id || index}
              className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] snap-start bg-[#98635D]/90 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500"
            >
              <div className="text-4xl text-white/30 mb-3">&ldquo;</div>
              <p className="text-gray-100 text-sm leading-relaxed mb-6">
                {item.review}
              </p>
              <div className="w-10 h-[2px] bg-white/30 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <div className="flex justify-center mt-2 text-yellow-400 text-sm">
                {'★'.repeat(item.rating)}
                <span className="text-gray-300">
                  {'★'.repeat(5 - item.rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
