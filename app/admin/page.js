'use client'

import { useState, useEffect } from 'react'
import { fetchAPI } from '@/utils/api'
import { useToast } from '@/context/ToastContext'
import {
  Star,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  Plus,
  Trash2,
  Download,
  RefreshCw,
  Upload,
  Edit,
  User,
  Calendar,
} from 'lucide-react'

export default function AdminDashboard() {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    review: '',
    rating: '',
  })

  const [testimonials, setTestimonials] = useState([])
  const [stats, setStats] = useState({
    totalTestimonials: 0,
    avgRating: 0,
    totalReviews: 0,
    activeItems: 0,
  })

  const loadTestimonials = async () => {
    try {
      setLoading(true)
      const data = await fetchAPI('/testimonials')
      setTestimonials(data)
      updateStats(data)
    } catch (err) {
      console.error('Failed to load testimonials:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const updateStats = (data) => {
    const total = data.length
    const avg = data.reduce((sum, t) => sum + t.rating, 0) / total || 0
    setStats({
      totalTestimonials: total,
      avgRating: avg.toFixed(1),
      totalReviews: total,
      activeItems: total,
    })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const newTestimonial = await fetchAPI('/testimonials', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          review: form.review,
          rating: parseInt(form.rating),
          status: 'active',
        }),
      })

      const updatedTestimonials = [newTestimonial, ...testimonials]
      setTestimonials(updatedTestimonials)
      updateStats(updatedTestimonials)

      setForm({
        name: '',
        review: '',
        rating: '',
      })

      toast.success('Testimonial added successfully!')
    } catch (err) {
      toast.error('Failed to add testimonial: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const deleteTestimonial = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await fetchAPI(`/testimonials/${id}`, { method: 'DELETE' })
        const updated = testimonials.filter((t) => t.id !== id)
        setTestimonials(updated)
        updateStats(updated)
        toast.success('Testimonial deleted successfully!')
      } catch (err) {
        toast.error('Failed to delete testimonial: ' + err.message)
      }
    }
  }

  const deleteAllTestimonials = async () => {
    if (confirm('Delete all testimonials?')) {
      try {
        for (const t of testimonials) {
          await fetchAPI(`/testimonials/${t.id}`, { method: 'DELETE' })
        }
        setTestimonials([])
        updateStats([])
        toast.success('All testimonials deleted!')
      } catch (err) {
        toast.error('Failed to delete all testimonials: ' + err.message)
      }
    }
  }

  const handleRefresh = async () => {
    try {
      await loadTestimonials()
      toast.success('Stats refreshed!')
    } catch (err) {
      toast.error('Failed to refresh: ' + err.message)
    }
  }

  const handleClearAll = async () => {
    if (confirm('Clear all data?')) {
      try {
        for (const t of testimonials) {
          await fetchAPI(`/testimonials/${t.id}`, { method: 'DELETE' })
        }
        setTestimonials([])
        updateStats([])
        toast.success('All data cleared!')
      } catch (err) {
        toast.error('Failed to clear data: ' + err.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#98635D]">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Manage your testimonials and content
        </p>
      </div>

      {/* Stats Cards - Redesigned */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Testimonials
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalTestimonials}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Average Rating
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.avgRating} / 5.0
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Star className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Reviews</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalReviews}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Items</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.activeItems}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Testimonial Form - Redesigned */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#98635D] px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Add New Testimonial
              </h2>
              <Plus className="w-5 h-5 text-white" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter customer name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MessageCircle className="w-4 h-4 inline mr-1" />
                Review
              </label>
              <textarea
                name="review"
                placeholder="Write customer review..."
                value={form.review}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition text-gray-900 placeholder-gray-500"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Star className="w-4 h-4 inline mr-1" />
                Rating (1-5)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating"
                  value={form.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="1"
                  className="w-24 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-500"
                  required
                />
                <div className="flex text-2xl space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, rating: star.toString() })
                      }
                      className={`transition ${
                        star <= form.rating
                          ? 'text-yellow-400 scale-110'
                          : 'text-gray-300'
                      } hover:scale-125`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              <span>{submitting ? 'Adding...' : 'Add Testimonial'}</span>
            </button>
          </form>
        </div>

        {/* Recent Testimonials List - Redesigned */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#98635D] px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Recent Testimonials
              </h2>
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="p-6">
            {testimonials.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-500">No testimonials yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Add your first testimonial using the form
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="bg-gray-100 p-1 rounded-full">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800">
                              {testimonial.name}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>{testimonial.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">
                            ({testimonial.rating}/5)
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {testimonial.review}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="text-red-500 hover:text-red-700 transition ml-4 p-1 hover:bg-red-50 rounded-lg"
                        title="Delete testimonial"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {testimonials.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={deleteAllTestimonials}
                  className="text-red-600 text-sm hover:text-red-700 transition flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete All</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Section - Redesigned */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-black px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => (window.location.href = '/admin/upload')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg transition flex items-center justify-center space-x-2 group"
            >
              <Upload className="w-5 h-5 group-hover:scale-110 transition" />
              <span>Upload Data</span>
            </button>

            <button
              onClick={() => {
                const exportData = JSON.stringify(testimonials, null, 2)
                const blob = new Blob([exportData], {
                  type: 'application/json',
                })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'testimonials.json'
                a.click()
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg transition flex items-center justify-center space-x-2 group"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition" />
              <span>Export Data</span>
            </button>

            <button
              onClick={handleRefresh}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg transition flex items-center justify-center space-x-2 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition duration-500" />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleClearAll}
              className="bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-lg transition flex items-center justify-center space-x-2 group"
            >
              <Trash2 className="w-5 h-5 group-hover:scale-110 transition" />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
