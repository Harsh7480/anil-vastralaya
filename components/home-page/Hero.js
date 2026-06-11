'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const slides = [
    {
      image: '/images/hero1.png',
      tagline: 'New Season 2024',
      title: 'Timeless\nElegance',
    },
    {
      image: '/images/hero2.png',
      tagline: 'Ethnic Collection',
      title: 'Grace\nRedefined',
    },
    {
      image: '/images/hero3.png',
      tagline: 'Premium Selection',
      title: 'Pure\nSophistication',
    },
  ]

  const goToSlide = useCallback((index) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 800)
    }
  }, [currentSlide, isTransitioning])

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [currentSlide, slides.length, goToSlide])

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      {/* Background Images with crossfade */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover object-center scale-[1.02]"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex flex-col justify-end h-full pb-32 lg:pb-40">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute bottom-32 lg:bottom-40 left-8 lg:left-16 transition-all duration-1000 ease-out ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6 pointer-events-none'
              }`}
            >
              {index === currentSlide && (
                <div className="max-w-2xl">
                  {/* Tagline */}
                  <p className="text-white/60 text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 font-light">
                    {slide.tagline}
                  </p>

                  {/* Main Title */}
                  <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-serif text-white leading-[1.05] mb-0 whitespace-pre-line">
                    {slide.title}
                  </h1>

                  {/* CTA */}
                  <div className="mt-10">
                    <Link
                      href="/shop"
                      className="group inline-flex items-center gap-4 text-white/90 text-sm tracking-[0.25em] uppercase transition-all duration-500 hover:text-white"
                    >
                      <span className="block w-12 h-[1px] bg-white/50 group-hover:w-16 group-hover:bg-white transition-all duration-500" />
                      Shop Now
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar with indicators and slide number */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 flex items-center justify-between h-16">
          {/* Left: Slide indicators */}
          <div className="flex items-center gap-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group"
                aria-label={`Slide ${index + 1}`}
              >
                <span
                  className={`block h-[1px] transition-all duration-700 ease-out ${
                    index === currentSlide
                      ? 'w-16 bg-white'
                      : 'w-8 bg-white/30 group-hover:bg-white/50'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right: Slide counter */}
          <div className="text-white/40 text-xs tracking-[0.3em] font-light">
            <span className="text-white/80">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="mx-2 text-white/20">—</span>
            <span>{String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
