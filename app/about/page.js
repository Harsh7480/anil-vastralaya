import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'About Us - Anil Vastralaya',
  description:
    'Learn about the story behind Anil Vastralaya - your trusted destination for premium ethnic wear and modern fashion.',
}

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#FFF8E7] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[4px] text-gray-600 mb-3">OUR STORY</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A legacy of elegance, rooted in tradition, blooming with modern
            fashion.
          </p>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative w-full flex justify-center">
              <Image
                src="/images/about.png"
                alt="Anil Vastralaya Store"
                width={600}
                height={600}
                className="w-full h-auto rounded-xl object-contain"
                priority
              />
            </div>
            <div className="max-w-xl">
              <p className="text-sm tracking-[4px] text-gray-600 mb-3">
                SINCE 1992
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                Our Journey
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  In 1992, a young entrepreneur embarked on a journey fueled by
                  ambition and a love for fashion. Just out of school, the
                  founder started a part-time business specializing in
                  women&apos;s garments, sowing the seeds for what would
                  eventually become a family legacy.
                </p>
                <p>
                  Life took an exciting turn when the brand expanded into
                  designer wear and modern fashion collections. The vision was
                  always to blend traditional aesthetics with contemporary
                  styles, creating clothing that celebrates elegance and
                  comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#EDE5DB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[4px] text-gray-600 mb-3">
              WHY CHOOSE US
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Quality First',
                description:
                  'Every piece in our collection undergoes rigorous quality checks to ensure you receive nothing but the best.',
              },
              {
                title: 'Traditional Meets Modern',
                description:
                  'We blend timeless Indian craftsmanship with contemporary designs to create outfits for the modern Indian.',
              },
              {
                title: 'Customer Satisfaction',
                description:
                  'Your happiness is our priority. From personalized styling advice to hassle-free returns, we ensure a delightful experience.',
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-10 rounded-xl text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[4px] text-gray-600 mb-3">
              OUR MILESTONES
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">
              Growing With You
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '30+', label: 'Years of Trust' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '5000+', label: 'Products' },
              { number: '100+', label: 'Brands' },
            ].map((stat, index) => (
              <div key={index} className="p-8">
                <p className="text-5xl font-serif text-gray-900 mb-3">
                  {stat.number}
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
