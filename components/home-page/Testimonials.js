'use client'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Aarav Sharma',
      review:
        'Amazing quality clothes! The fabric feels premium and the fit is perfect.',
      rating: 5,
    },
    {
      name: 'Priya Verma',
      review:
        'Loved the collection! Stylish designs and great pricing. Highly recommended.',
      rating: 4,
    },
    {
      name: 'Rohit Singh',
      review:
        'Fast delivery and the outfit looks exactly like the pictures. Great experience!',
      rating: 5,
    },
  ]

  const showDesktopGrid = testimonials.length <= 3

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
                key={index}
                className="bg-[#98635D]/90 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500"
              >
                <div className="text-4xl text-white/30 mb-3">“</div>
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
              key={index}
              className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] snap-start bg-[#98635D]/90 backdrop-blur-md border border-white/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-500"
            >
              <div className="text-4xl text-white/30 mb-3">“</div>
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
