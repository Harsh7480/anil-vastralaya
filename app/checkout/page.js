'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { fetchAPI } from '@/utils/api'

function CheckoutItemImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)
  if (!src || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] rounded-xl">
        <svg className="w-6 h-6 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }
  return <Image src={src} alt={alt} fill className="object-contain rounded-xl" onError={() => setHasError(true)} />
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, subtotal, totalSaved, totalItems, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  if (!user) {
    router.push('/login')
    return null
  }

  if (items.length === 0 && !success) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-serif text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Add some items before checking out.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#98635D] text-white text-sm tracking-wider uppercase rounded-full hover:bg-[#7A4E49] transition-all duration-500 shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) return

    setLoading(true)
    try {
      const result = await fetchAPI('/orders', {
        method: 'POST',
        body: JSON.stringify({
          customerName: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            size: item.size || null,
          })),
        }),
      })
      setOrderId(result.id)
      setSuccess(true)
      clearCart()
    } catch (err) {
      console.error('Order failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  if (success) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif text-gray-900 mb-3">Order Placed Successfully!</h1>
          <p className="text-gray-500 mb-2">Thank you for your order. We&apos;ll process it shortly.</p>
          <p className="text-sm text-gray-400 mb-8">Order ID: <span className="font-mono font-semibold text-gray-600">{orderId}</span></p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/my-bookings"
              className="px-6 py-3 bg-[#98635D] text-white text-sm tracking-wider uppercase rounded-full hover:bg-[#7A4E49] transition-all duration-500"
            >
              View My Orders
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border border-[#98635D] text-[#98635D] text-sm tracking-wider uppercase rounded-full hover:bg-[#98635D] hover:text-white transition-all duration-500"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#FAF7F2] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#98635D] mb-2 font-medium">Secure Checkout</p>
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900">Checkout</h1>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Shipping Form */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-serif text-gray-900">Shipping Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 tracking-wider uppercase">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 tracking-wider uppercase">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2 tracking-wider uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2 tracking-wider uppercase">Address *</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors resize-none"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 tracking-wider uppercase">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 tracking-wider uppercase">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors"
                      placeholder="000000"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-[#FAF7F2] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-lg font-serif text-gray-900 mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-14 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]">
                          <CheckoutItemImage src={item.image} alt={item.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-[10px] text-gray-500">
                            Qty: {item.quantity}{item.size ? ` | Size: ${item.size}` : ''}
                          </p>
                        </div>
                        <p className="text-xs font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                      <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                    </div>
                    {totalSaved > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Savings</span>
                        <span className="font-medium text-emerald-600">-₹{totalSaved.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-medium text-emerald-600">
                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 border-t border-gray-200 mb-6">
                    <span className="text-sm font-medium text-gray-500">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#98635D] text-white text-sm font-semibold py-4 rounded-full tracking-wider uppercase hover:bg-[#7A4E49] transition-all duration-500 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
