import React from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export const metadata = {
  title: 'Contact Us - Anil Vastralaya',
  description: 'Get in touch with Anil Vastralaya. Visit our store, call us, or send us a message.',
}

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#FFF8E7] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm tracking-[4px] text-gray-600 mb-3">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out to us for any queries, feedback, or styling advice.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-serif text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#EDE5DB] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Main Market, Chandni Chowk<br />
                      Delhi - 110006, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#EDE5DB] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      +91 98765 43210<br />
                      +91 11 2345 6789
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#EDE5DB] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      contact@anilvastralaya.com<br />
                      support@anilvastralaya.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-[#EDE5DB] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 10:00 AM - 9:00 PM<br />
                      Sunday: 11:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-[#EDE5DB] rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-colors">
                    <FaFacebookF size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#EDE5DB] rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-colors">
                    <FaInstagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[#EDE5DB] rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-colors">
                    <FaWhatsapp size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#FFF8E7] p-10 rounded-xl">
              <h2 className="text-3xl font-serif text-gray-900 mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Related</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="styling">Styling Advice</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
                    placeholder="Write your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-8 py-4 text-sm tracking-widest hover:bg-gray-800 transition duration-300 rounded-lg"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200 w-full">
        <div className="w-full h-full bg-[#EDE5DB] flex items-center justify-center">
          <div className="text-center">
            <FaMapMarkerAlt className="text-4xl text-gray-500 mb-4 mx-auto" />
            <p className="text-gray-600">Map placeholder - Add Google Maps embed here</p>
            <p className="text-sm text-gray-500 mt-2">Main Market, Chandni Chowk, Delhi - 110006</p>
          </div>
        </div>
      </section>
    </main>
  )
}
