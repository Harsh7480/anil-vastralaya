import Image from 'next/image'
import Link from 'next/link'

export default function Categories() {
  const categories = [
    {
      name: "Men's Wear",
      image: '/images/men.png',
      link: '/shop',
    },
    {
      name: "Women's Wear",
      image: '/images/women.png',
      link: '/shop',
    },
    {
      name: 'Kids Wear',
      image: '/images/kids.png',
      link: '/shop',
    },
    {
      name: 'Ethnic Collection',
      image: '/images/ethnic.png',
      link: '/shop',
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">
              Browse
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="group mt-6 sm:mt-0 inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors duration-300"
          >
            <span>View All</span>
            <span className="block w-8 h-[1px] bg-gray-400 group-hover:w-12 group-hover:bg-gray-900 transition-all duration-300" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat, index) => (
            <Link key={index} href={cat.link} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="text-white text-lg lg:text-xl font-light tracking-wide">
                    {cat.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 mt-3 text-white/70 text-xs tracking-[0.2em] uppercase group-hover:text-white group-hover:gap-3 transition-all duration-300">
                    Explore
                    <span className="w-4 h-[1px] bg-white/70 group-hover:w-6 group-hover:bg-white transition-all duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
