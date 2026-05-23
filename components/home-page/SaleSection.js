'use client'

import Image from 'next/image'

export default function SaleSection() {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/sale.png"
        alt="Sale Banner"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        
        <div className="bg-white/20 backdrop-blur-md 
                        px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 
                        text-center 
                        w-full max-w-[90%] sm:max-w-md md:max-w-lg 
                        rounded-lg">

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                         font-serif text-gray-900 mb-2 sm:mb-3">
            End Of The Year Sale
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-4 sm:mb-6">
            Upto 60% Off
          </p>

          {/* Button */}
          <button className="border border-black 
                             px-4 py-2 sm:px-6 sm:py-3 
                             text-xs sm:text-sm tracking-widest 
                             hover:bg-black hover:text-white 
                             transition duration-300">
            EXPLORE OUR COLLECTION
          </button>

        </div>

      </div>
    </section>
  )
}