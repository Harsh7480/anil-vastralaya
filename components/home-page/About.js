import Image from 'next/image'
import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="w-full bg-[#EDE5DB] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT IMAGE - Full image visible */}
          {/* LEFT IMAGE - Full image visible */}
          <div className="relative w-full flex justify-center items-center order-2 md:order-1">
            <Image
              src="/images/about.png"
              alt="About Brand - Label Anju Kumar"
              width={600}
              height={600}
              className="w-full h-auto rounded-xl object-contain"
              priority
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="max-w-xl order-1 md:order-2">
            <p className="text-sm tracking-[4px] text-gray-600 mb-3">ABOUT</p>

            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
              Anil Vastralaya
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                In 1992, a young entrepreneur embarked on a journey fueled by
                ambition and a love for fashion. Just out of school, the founder
                started a part-time business specializing in women's garments,
                sowing the seeds for what would eventually become a family
                legacy.
              </p>

              <p>
                Life took an exciting turn when the brand expanded into designer
                wear and modern fashion collections. The vision was always to
                blend traditional aesthetics with contemporary styles, creating
                clothing that celebrates elegance and comfort.
              </p>
            </div>

            <Link href="/about">
              <button className="cursor-pointer mt-10 border border-gray-700 px-8 py-3.5 text-sm tracking-widest text-black hover:bg-black hover:text-white transition duration-300">
                READ OUR STORY
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
