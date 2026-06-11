import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedProducts() {
  const products = [
    {
      name: 'Stylish Kurta',
      price: '₹999',
      originalPrice: '₹1,499',
      image: '/images/product1.png',
      tag: 'New',
    },
    {
      name: 'Casual Shirt',
      price: '₹799',
      originalPrice: '₹1,199',
      image: '/images/product2.png',
      tag: null,
    },
    {
      name: 'Designer Saree',
      price: '₹1,999',
      originalPrice: '₹2,999',
      image: '/images/product3.png',
      tag: 'Bestseller',
    },
    {
      name: 'Kids Party Dress',
      price: '₹699',
      originalPrice: '₹999',
      image: '/images/product4.jpg',
      tag: null,
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F2]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-3">
              Curated Selection
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900">
              Featured Products
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product, index) => (
            <Link key={index} href="/shop" className="group">
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-white text-gray-900 text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-medium">
                    {product.tag}
                  </span>
                )}

                {/* Quick View on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <button className="w-full bg-white/95 backdrop-blur-sm text-gray-900 text-xs tracking-[0.2em] uppercase py-3 hover:bg-gray-900 hover:text-white transition-colors duration-300">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-sm text-gray-600 tracking-wide mb-2 group-hover:text-gray-900 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm text-gray-900 font-medium">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
