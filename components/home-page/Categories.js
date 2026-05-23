import Image from 'next/image'
import Link from 'next/link'

export default function Categories() {
  const categories = [
    {
      name: "Men's Wear",
      image: '/images/men.png',
      link: '/category/men',
    },
    {
      name: "Women's Wear",
      image: '/images/women.png',
      link: '/category/women',
    },
    {
      name: 'Kids Wear',
      image: '/images/kids.png',
      link: '/category/kids',
    },
    {
      name: 'Ethnic Collection',
      image: '/images/ethnic.png',
      link: '/category/ethnic',
    },
  ]

  return (
    <section className="py-24 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[4px] text-gray-600 uppercase mb-3">
            Collection
          </p>
          <h2 className="text-4xl font-semibold text-gray-900">
            Shop by Category
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {categories.map((cat, index) => (
            <Link key={index} href={cat.link}>

              <div className="group cursor-pointer">

                {/* Circle Image */}
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-2xl transition duration-300">

                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>

                {/* Category Name */}
                <h3 className="mt-5 text-lg font-semibold text-gray-800 group-hover:text-black transition">
                  {cat.name}
                </h3>

              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  )
}
