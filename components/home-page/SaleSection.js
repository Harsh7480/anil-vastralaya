'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function SaleSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/sale.png"
        alt="Sale"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-16 flex items-center">
        <div className="max-w-xl">
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4">
            Limited Time
          </p>
          <h2 className="text-5xl lg:text-7xl font-serif text-white leading-tight mb-4">
            End of Season
            <br />
            <span className="italic">Sale</span>
          </h2>
          <p className="text-white/70 text-lg font-light mb-10 max-w-md">
            Up to 60% off on selected styles. Don&apos;t miss out on your favorites.
          </p>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-4 bg-white text-gray-900 px-10 py-4 text-xs tracking-[0.25em] uppercase font-medium hover:bg-gray-900 hover:text-white transition-all duration-500"
          >
            Shop the Sale
            <span className="block w-5 h-[1px] bg-gray-900 group-hover:bg-white group-hover:w-7 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
