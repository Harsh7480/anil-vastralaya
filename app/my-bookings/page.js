'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/utils/api'
import { useAuth } from '@/context/AuthContext'

function BookingItemImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] rounded-xl">
        <svg className="w-8 h-8 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <Image src={src} alt={alt} fill className="object-contain rounded-xl" onError={() => setHasError(true)} />
  )
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  booked: { label: 'Booked', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', dot: 'bg-indigo-500' },
  ready: { label: 'Ready for Pickup', color: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
  delivered: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
}

export default function MyBookingsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const loadBookings = async () => {
      if (!user) return
      try {
        const data = await fetchAPI('/orders/my-bookings')
        setBookings(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load bookings:', err)
      } finally {
        setLoading(false)
      }
    }
    loadBookings()
  }, [user])

  if (authLoading || !user) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#98635D]"></div>
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
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#98635D] mb-2 font-medium">Your Orders</p>
          <h1 className="text-3xl lg:text-4xl font-serif text-gray-900">My Orders</h1>
          <p className="text-sm text-gray-500 mt-2">Track and manage your orders and bookings</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 lg:py-14">
        <div className="max-w-5xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#98635D]"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FAF7F2] flex items-center justify-center">
                <svg className="w-12 h-12 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif text-gray-900 mb-3">No Orders Yet</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven&apos;t placed any orders yet. Browse our shop and find something you love!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#98635D] text-white text-sm tracking-wider uppercase rounded-full hover:bg-[#7A4E49] transition-all duration-500 shadow-lg"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => {
                const status = statusConfig[booking.status] || statusConfig.booked

                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Booking Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-[#FAF7F2]/50 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium">
                            {booking.bookingCode ? 'Booking Code' : 'Order ID'}
                          </p>
                          <p className="text-lg font-bold text-gray-900 tracking-wider">
                            {booking.bookingCode || booking.id.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          booking.bookingType === 'advance' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {booking.bookingType === 'advance' ? 'Advance' : 'Full Order'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="px-6 py-4">
                      {booking.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 py-3">
                          <div className="relative w-16 h-18 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]">
                            <BookingItemImage src={item.product?.image} alt={item.product?.name || 'Product'} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}{item.size ? ` | Size: ${item.size}` : ''} | ₹{item.price.toLocaleString()} each</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Payment Summary */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                      {booking.bookingType === 'advance' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-white rounded-xl">
                            <p className="text-[10px] tracking-wider uppercase text-gray-400 mb-1">Total Amount</p>
                            <p className="text-lg font-bold text-gray-900">₹{booking.totalAmount.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-3 bg-[#98635D]/5 rounded-xl">
                            <p className="text-[10px] tracking-wider uppercase text-[#98635D] mb-1">Paid ({booking.advancePercentage}%)</p>
                            <p className="text-lg font-bold text-[#98635D]">₹{booking.advanceAmount?.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-3 bg-amber-50 rounded-xl">
                            <p className="text-[10px] tracking-wider uppercase text-amber-600 mb-1">Pay at Shop</p>
                            <p className="text-lg font-bold text-amber-700">₹{booking.remainingAmount?.toLocaleString()}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-white rounded-xl">
                            <p className="text-[10px] tracking-wider uppercase text-gray-400 mb-1">Total Amount</p>
                            <p className="text-lg font-bold text-gray-900">₹{booking.totalAmount.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-3 bg-[#98635D]/5 rounded-xl">
                            <p className="text-[10px] tracking-wider uppercase text-[#98635D] mb-1">Shipping</p>
                            <p className="text-lg font-bold text-[#98635D]">
                              {booking.totalAmount >= 999 ? 'FREE' : '₹99'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Note */}
                    {booking.status !== 'completed' && booking.status !== 'cancelled' && (
                      <div className="px-6 py-3 border-t border-gray-100">
                        {booking.bookingType === 'advance' ? (
                          <p className="text-xs text-gray-500 text-center">
                            Visit our shop with booking code <span className="font-bold text-gray-900">{booking.bookingCode}</span> and pay ₹{booking.remainingAmount?.toLocaleString()} to collect your product.
                          </p>
                        ) : (
                          <p className="text-xs text-gray-500 text-center">
                            Your order is being processed. You&apos;ll receive updates on the status.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
