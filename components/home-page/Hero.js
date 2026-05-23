'use client' // Required for Next.js App Router (client-side interactivity)

import { useState, useEffect } from 'react'

export default function Hero() {
  const slides = [
    '/images/hero1.png',
    '/images/hero2.png',
    '/images/hero3.png',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000) 

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
      {/* Slides wrapper */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((imageSrc, index) => (
          <div
            key={index}
            className="min-w-full h-full relative flex-shrink-0 bg-gray-100"
          >
            {/* Full-screen background image – no text added */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageSrc})` }}
            >
              {/* Optional subtle overlay – remove if you want images 100% clear */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Optional centered content – remove this whole block if you want NO text */}
            <div className="hidden relative h-full flex items-center justify-center text-center px-6 z-10">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                  New Fashion Collection
                </h1>

                <p className="text-xl md:text-2xl text-gray-100 mb-10 drop-shadow-lg">
                  Discover the latest trends in clothing and fashion.
                </p>

                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all shadow-xl">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-md'
                : 'bg-white/60 hover:bg-white/90'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
