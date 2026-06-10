'use client'

import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { fetchAPI } from '@/utils/api'
import { useToast } from '@/context/ToastContext'

export default function ContactPage() {
  const toast = useToast()
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchAPI('/settings/public')
        setSettings(data)
      } catch (err) {
        console.error('Failed to load settings:', err)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetchAPI('/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
      toast.success('Message sent successfully! We will get back to you soon.')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      toast.error('Failed to send message: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const storeAddress = settings?.storeAddress || 'Main Market, Chandni Chowk, Delhi - 110006, India'
  const storePhone = settings?.storePhone || '+91 98765 43210'
  const storePhone2 = settings?.storePhone2 || '+91 11 2345 6789'
  const storeEmail = settings?.storeEmail || 'contact@anilvastralaya.com'
  const supportEmail = settings?.emailSettings?.supportEmail || 'support@anilvastralaya.com'
  const businessHours = settings?.businessHours || {
    monday_friday: '10:00 AM - 9:00 PM',
    saturday: '10:00 AM - 9:00 PM',
    sunday: '11:00 AM - 8:00 PM'
  }
  const socialMedia = settings?.socialMedia || {}

  if (loading) {
    return (
      <main>
        <section className="bg-[#FFF8E7] py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm tracking-[4px] text-gray-600 mb-3">GET IN TOUCH</p>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Contact Us</h1>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#98635D]"></div>
            </div>
          </div>
        </section>
      </main>
    )
  }

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
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {storeAddress}
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
                      {storePhone}
                      {storePhone2 && <><br />{storePhone2}</>}
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
                      {storeEmail}
                      {supportEmail && <><br />{supportEmail}</>}
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
                      Monday - Friday: {businessHours.monday_friday}<br />
                      Saturday: {businessHours.saturday}<br />
                      Sunday: {businessHours.sunday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialMedia.facebook && (
                    <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#EDE5DB] rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-colors">
                      <FaFacebookF size={18} />
                    </a>
                  )}
                  {socialMedia.instagram && (
                    <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#EDE5DB] rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-colors">
                      <FaInstagram size={18} />
                    </a>
                  )}
                  {socialMedia.whatsapp && (
                    <a href={`https://wa.me/${socialMedia.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#EDE5DB] rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white transition-colors">
                      <FaWhatsapp size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#FFF8E7] p-10 rounded-xl">
              <h2 className="text-3xl font-serif text-gray-900 mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white text-gray-900"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Related">Order Related</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Styling Advice">Styling Advice</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-gray-900 placeholder-gray-500 resize-none"
                    placeholder="Write your message here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gray-900 text-white px-8 py-4 text-sm tracking-widest hover:bg-gray-800 transition duration-300 rounded-lg disabled:bg-gray-400"
                >
                  {submitting ? 'SENDING...' : 'SEND MESSAGE'}
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
            <p className="text-sm text-gray-500 mt-2">{storeAddress}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
