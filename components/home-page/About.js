import Image from 'next/image'
import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] lg:aspect-square bg-gray-100 overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/about.png"
              alt="About Anil Vastralaya"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-4">
              Our Story
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-gray-900 mb-8 leading-tight">
              A Legacy of
              <br />
              Timeless Fashion
            </h2>

            <div className="space-y-5 text-gray-500 leading-relaxed mb-10">
              <p>
                In 1992, a young entrepreneur embarked on a journey fueled by
                ambition and a love for fashion. Just out of school, the founder
                started a part-time business specializing in women&apos;s garments,
                sowing the seeds for what would eventually become a family
                legacy.
              </p>
              <p>
                The vision was always to blend traditional aesthetics with
                contemporary styles, creating clothing that celebrates elegance
                and comfort. Today, Anil Vastralaya stands as a testament to
                that enduring vision.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-10 py-8 border-y border-gray-100">
              <div>
                <p className="text-3xl lg:text-4xl font-serif text-gray-900">30+</p>
                <p className="text-xs text-gray-400 tracking-wider uppercase mt-1">Years</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-serif text-gray-900">10K+</p>
                <p className="text-xs text-gray-400 tracking-wider uppercase mt-1">Customers</p>
              </div>
              <div>
                <p className="text-3xl lg:text-4xl font-serif text-gray-900">50+</p>
                <p className="text-xs text-gray-400 tracking-wider uppercase mt-1">Collections</p>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-gray-900 hover:text-gray-600 transition-colors duration-300"
            >
              <span>Read Our Story</span>
              <span className="block w-8 h-[1px] bg-gray-900 group-hover:w-12 group-hover:bg-gray-600 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
