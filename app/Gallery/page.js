import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'Gallery - Anil Vastralaya',
  description: 'Explore our stunning collection through our gallery. See our latest designs, collections, and store photos.',
}

const galleryCategories = ['All', 'New Arrivals', 'Bridal', 'Festive', 'Casual']

const galleryItems = [
  { id: 1, image: '/images/product1.png', category: 'New Arrivals', title: 'Silk Saree Collection' },
  { id: 2, image: '/images/product2.png', category: 'Bridal', title: 'Bridal Lehenga' },
  { id: 3, image: '/images/product3.png', category: 'Festive', title: 'Festive Kurtas' },
  { id: 4, image: '/images/product4.jpg', category: 'Casual', title: 'Casual Elegance' },
  { id: 5, image: '/images/Gemini_Generated_Image_h3152bh3152bh315.png', category: 'Bridal', title: 'Royal Bridal Set' },
  { id: 6, image: '/images/Gemini_Generated_Image_mfee8qmfee8qmfee.png', category: 'New Arrivals', title: 'Designer Sets' },
  { id: 7, image: '/images/Gemini_Generated_Image_pbi32opbi32opbi3.png', category: 'Festive', title: 'Banarasi Collection' },
  { id: 8, image: '/images/Gemini_Generated_Image_r8znntr8znntr8zn.png', category: 'Casual', title: 'Party Wear' },
  { id: 9, image: '/images/Gemini_Generated_Image_shew83shew83shew.png', category: 'New Arrivals', title: 'Men\'s Collection' },
]

export default function GalleryPage() {
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {galleryCategories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  index === 0
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

      {/* Gallery Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-[#EDE5DB] cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs text-white/80 tracking-widest uppercase">{item.category}</span>
                  <h3 className="text-white font-medium mt-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
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
