'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { fetchAPI } from '@/utils/api'
import { useToast } from '@/context/ToastContext'
import ConfirmModal from '@/components/admin/ConfirmModal'

function OrderItemImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)
  if (!src || hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] rounded-lg">
        <svg className="w-6 h-6 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }
  return <Image src={src} alt={alt} fill className="object-contain rounded-lg" onError={() => setHasError(true)} />
}

const statusConfig = {
  pending_verification: { label: 'Pending Verification', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  booked: { label: 'Booked', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  ready_for_pickup: { label: 'Ready for Pickup', color: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-800', dot: 'bg-indigo-500' },
  delivered: { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
}

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'pending_verification', label: 'Pending Verification' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'ready_for_pickup', label: 'Ready for Pickup' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
]

export default function AdminOrdersPage() {
  const toast = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showScreenshotModal, setShowScreenshotModal] = useState(false)
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', onConfirm: null, type: 'danger' })
  const [actionLoading, setActionLoading] = useState(false)

  const loadOrders = async () => {
    try {
      const data = await fetchAPI('/orders')
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load orders:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const bookingOrders = orders.filter(o => o.bookingType === 'advance')
  const filteredOrders = bookingOrders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter
    const matchesSearch = searchTerm === '' ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.bookingCode?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleVerifyPayment = async (orderId) => {
    setConfirmModal({
      open: true,
      title: 'Verify Payment',
      message: 'Are you sure you want to verify this payment? The booking will be confirmed.',
      type: 'info',
      onConfirm: async () => {
        setActionLoading(true)
        try {
          await fetchAPI(`/orders/${orderId}/verify-payment`, {
            method: 'PUT',
            body: JSON.stringify({ adminNote: 'Payment verified by admin' }),
          })
          toast.success('Payment verified and booking confirmed!')
          loadOrders()
          setShowDetailModal(false)
        } catch (err) {
          toast.error('Failed to verify payment')
        } finally {
          setActionLoading(false)
        }
      }
    })
  }

  const handleUpdateStatus = async (orderId, newStatus) => {
    setActionLoading(true)
    try {
      await fetchAPI(`/orders/${orderId}/booking-status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      })
      toast.success(`Status updated to ${statusConfig[newStatus]?.label || newStatus}`)
      loadOrders()
      setShowDetailModal(false)
    } catch (err) {
      toast.error('Failed to update status')
    } finally {
      setActionLoading(false)
    }
  }

  const handleCancelBooking = async (orderId) => {
    setConfirmModal({
      open: true,
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel this booking? This action cannot be undone.',
      type: 'danger',
      onConfirm: async () => {
        setActionLoading(true)
        try {
          await fetchAPI(`/orders/${orderId}/booking-status`, {
            method: 'PUT',
            body: JSON.stringify({ status: 'cancelled', adminNote: 'Booking cancelled by admin' }),
          })
          toast.success('Booking cancelled')
          loadOrders()
          setShowDetailModal(false)
        } catch (err) {
          toast.error('Failed to cancel booking')
        } finally {
          setActionLoading(false)
        }
      }
    })
  }

  const openScreenshot = (url) => {
    setScreenshotUrl(url)
    setShowScreenshotModal(true)
  }

  const stats = {
    total: bookingOrders.length,
    pendingVerification: bookingOrders.filter(o => o.status === 'pending_verification').length,
    confirmed: bookingOrders.filter(o => o.status === 'confirmed').length,
    readyForPickup: bookingOrders.filter(o => o.status === 'ready_for_pickup').length,
    totalAdvance: bookingOrders.reduce((sum, o) => sum + (o.advanceAmount || 0), 0),
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders & Bookings</h1>
            <p className="text-sm text-gray-500">Manage customer bookings and advance payments</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by name, phone, email, booking code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#98635D] focus:border-transparent outline-none w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Bookings', value: stats.total, color: 'bg-blue-500' },
            { label: 'Pending Verification', value: stats.pendingVerification, color: 'bg-amber-500' },
            { label: 'Confirmed', value: stats.confirmed, color: 'bg-emerald-500' },
            { label: 'Ready for Pickup', value: stats.readyForPickup, color: 'bg-purple-500' },
            { label: 'Total Advance', value: `₹${stats.totalAdvance.toLocaleString()}`, color: 'bg-[#98635D]' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#98635D] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status] || statusConfig.pending
                    return (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-bold text-gray-900">{order.bookingCode || order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="text-xs text-gray-400">₹{order.totalAmount.toLocaleString()}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                            <p className="text-xs text-gray-500">{order.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {order.items?.slice(0, 2).map((item) => (
                              <div key={item.id} className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]">
                                <OrderItemImage src={item.product?.image} alt={item.product?.name} />
                              </div>
                            ))}
                            {order.items?.length > 2 && (
                              <span className="text-xs text-gray-500">+{order.items.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">₹{order.advanceAmount?.toLocaleString()} <span className="text-gray-400">({order.advancePercentage}%)</span></p>
                            <div className="flex items-center gap-1 mt-1">
                              {order.paymentVerified ? (
                                <span className="text-xs text-emerald-600 font-medium">Verified</span>
                              ) : (
                                <span className="text-xs text-amber-600 font-medium">Unverified</span>
                              )}
                              {order.paymentScreenshot && (
                                <button onClick={() => openScreenshot(order.paymentScreenshot)} className="text-xs text-blue-600 hover:underline ml-1">
                                  View Screenshot
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setSelectedOrder(order); setShowDetailModal(true) }}
                              className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                            >
                              View
                            </button>
                            {order.status === 'pending_verification' && (
                              <button
                                onClick={() => handleVerifyPayment(order.id)}
                                className="text-xs px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
                              >
                                Verify
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Booking Details</p>
                  <h3 className="text-lg font-bold text-gray-900">{selectedOrder.bookingCode}</h3>
                </div>
                <button onClick={() => setShowDetailModal(false)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Customer</p>
                  <p className="text-sm font-medium text-gray-900">{selectedOrder.customerName}</p>
                  <p className="text-xs text-gray-500">{selectedOrder.phone}</p>
                  <p className="text-xs text-gray-500">{selectedOrder.email}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{selectedOrder.paymentMethod === 'upi_qr' ? 'UPI QR Code' : 'Pay at Shop'}</p>
                  <p className="text-xs text-gray-500 mt-1">Status: {selectedOrder.paymentVerified ? 'Verified' : 'Unverified'}</p>
                </div>
              </div>

              {/* Items */}
              <div>
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]">
                        <OrderItemImage src={item.product?.image} alt={item.product?.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}{item.size ? ` | Size: ${item.size}` : ''}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="p-4 bg-[#FAF7F2] rounded-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Total</p>
                    <p className="text-lg font-bold text-gray-900">₹{selectedOrder.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#98635D] mb-1">Advance ({selectedOrder.advancePercentage}%)</p>
                    <p className="text-lg font-bold text-[#98635D]">₹{selectedOrder.advanceAmount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-amber-600 mb-1">Remaining</p>
                    <p className="text-lg font-bold text-amber-700">₹{selectedOrder.remainingAmount?.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Payment Screenshot */}
              {selectedOrder.paymentScreenshot && (
                <div>
                  <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Payment Screenshot</p>
                  <div className="relative w-full max-w-xs aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden cursor-pointer" onClick={() => openScreenshot(selectedOrder.paymentScreenshot)}>
                    <Image src={selectedOrder.paymentScreenshot} alt="Payment Screenshot" fill className="object-contain p-2" />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition flex items-center justify-center">
                      <span className="text-white text-xs bg-black/50 px-2 py-1 rounded opacity-0 hover:opacity-100">Click to enlarge</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Note */}
              {selectedOrder.adminNote && (
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-blue-400 mb-1">Admin Note</p>
                  <p className="text-sm text-blue-700">{selectedOrder.adminNote}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                {selectedOrder.status === 'pending_verification' && (
                  <button
                    onClick={() => handleVerifyPayment(selectedOrder.id)}
                    disabled={actionLoading}
                    className="px-4 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition disabled:opacity-50"
                  >
                    Verify Payment & Confirm
                  </button>
                )}
                {selectedOrder.status === 'confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'ready_for_pickup')}
                    disabled={actionLoading}
                    className="px-4 py-2.5 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600 transition disabled:opacity-50"
                  >
                    Mark Ready for Pickup
                  </button>
                )}
                {selectedOrder.status === 'ready_for_pickup' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                    disabled={actionLoading}
                    className="px-4 py-2.5 bg-[#98635D] text-white text-sm font-semibold rounded-lg hover:bg-[#7A4E49] transition disabled:opacity-50"
                  >
                    Mark as Completed
                  </button>
                )}
                {!['completed', 'cancelled'].includes(selectedOrder.status) && (
                  <button
                    onClick={() => handleCancelBooking(selectedOrder.id)}
                    disabled={actionLoading}
                    className="px-4 py-2.5 border border-red-300 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Modal */}
      {showScreenshotModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4" onClick={() => setShowScreenshotModal(false)}>
          <div className="relative max-w-2xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowScreenshotModal(false)} className="absolute -top-10 right-0 text-white hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={screenshotUrl} alt="Payment Screenshot" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null, type: 'danger' })}
        onConfirm={() => { confirmModal.onConfirm?.(); setConfirmModal({ open: false, title: '', message: '', onConfirm: null, type: 'danger' }); }}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText={confirmModal.type === 'danger' ? 'Delete' : 'Confirm'}
      />
    </div>
  )
}
