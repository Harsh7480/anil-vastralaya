'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from 'react-icons/fa'
import { fetchAPI } from '@/utils/api'

export default function Footer() {
  const [settings, setSettings] = useState(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchAPI('/settings/public')
        setSettings(data)
      } catch (err) {
        console.error('Failed to load settings:', err)
      }
    }
    loadSettings()
  }, [])

  const storeName = settings?.storeName || 'Anil Vastralaya'
  const storeDescription = settings?.storeDescription || 'Premium ethnic wear & modern fashion for every occasion. Quality you trust, style you love.'
  const storeAddress = settings?.storeAddress || 'Main Market, Chandni Chowk, Delhi - 110006'
  const storePhone = settings?.storePhone || '+91 98765 43210'
  const storeEmail = settings?.storeEmail || 'contact@anilvastralaya.com'
  const socialMedia = settings?.socialMedia || {}

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const shopLinks = [
    { href: '/shop', label: 'New Arrivals' },
    { href: '/shop?category=women', label: 'Sarees' },
    { href: '/shop?category=ethnic', label: 'Lehengas' },
    { href: '/shop?category=kids', label: 'Kids Wear' },
    { href: '/shop?category=men', label: "Men's Collection" },
  ]

  const companyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/shop', label: 'Store Locator' },
    { href: '/my-bookings', label: 'My Bookings' },
    { href: '/Gallery', label: 'Gallery' },
  ]

  return (
    <footer className="bg-[#FAF7F2] text-gray-700">
      {/* Trust Badges */}
      <div className="border-b border-[#EDE5DB]">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#98635D]/10 flex items-center justify-center shrink-0">
                <FaTruck className="text-[#98635D] text-sm" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Free Shipping</p>
                <p className="text-[11px] text-gray-500">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#98635D]/10 flex items-center justify-center shrink-0">
                <FaShieldAlt className="text-[#98635D] text-sm" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Secure Payment</p>
                <p className="text-[11px] text-gray-500">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#98635D]/10 flex items-center justify-center shrink-0">
                <FaUndo className="text-[#98635D] text-sm" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Easy Returns</p>
                <p className="text-[11px] text-gray-500">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#98635D]/10 flex items-center justify-center shrink-0">
                <FaHeart className="text-[#98635D] text-sm" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">Pre-Book Now</p>
                <p className="text-[11px] text-gray-500">Pay 10% to reserve</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-[#EDE5DB]">
        <div className="max-w-[1400px] mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-serif text-gray-900 mb-1">Stay in Style</h3>
              <p className="text-sm text-gray-500">Subscribe for exclusive offers, new arrivals & fashion tips.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-3 bg-white border border-gray-200 rounded-l-full text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#98635D] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#98635D] text-white text-sm font-semibold rounded-r-full hover:bg-[#B8826D] transition-all duration-300 flex items-center gap-2 shrink-0"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <FaArrowRight size={12} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 - Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <img
                src="/images/Anil Vastralaya.png"
                alt={storeName}
                className="h-30 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {storeDescription}
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#98635D] hover:border-[#98635D] hover:text-white transition-all duration-300"
                >
                  <FaFacebookF size={14} />
                </a>
              )}
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#98635D] hover:border-[#98635D] hover:text-white transition-all duration-300"
                >
                  <FaInstagram size={14} />
                </a>
              )}
              {socialMedia.whatsapp && (
                <a
                  href={`https://wa.me/${socialMedia.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#98635D] hover:border-[#98635D] hover:text-white transition-all duration-300"
                >
                  <FaWhatsapp size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm tracking-wider uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#98635D] hover:pl-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm tracking-wider uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#98635D] hover:pl-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm tracking-wider uppercase mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#98635D]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-[#98635D] text-xs" />
                </div>
                <span className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{storeAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#98635D]/10 flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-[#98635D] text-xs" />
                </div>
                <a href={`tel:${storePhone}`} className="text-sm text-gray-500 hover:text-[#98635D] transition-colors">
                  {storePhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#98635D]/10 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-[#98635D] text-xs" />
                </div>
                <a href={`mailto:${storeEmail}`} className="text-sm text-gray-500 hover:text-[#98635D] transition-colors">
                  {storeEmail}
                </a>
              </li>
            </ul>

            {/* Store Hours */}
            <div className="mt-6 p-4 bg-white rounded-xl border border-[#EDE5DB]">
              <p className="text-xs font-semibold text-gray-900 mb-2 tracking-wider uppercase">Store Hours</p>
              <p className="text-xs text-gray-500">Mon - Sat: 10:00 AM - 9:00 PM</p>
              <p className="text-xs text-gray-500">Sunday: 11:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#EDE5DB] bg-[#F5F0EA]">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} {storeName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Secure Payments:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-600">UPI</span>
                <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-600">Visa</span>
                <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-600">Mastercard</span>
                <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-600">Cash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
