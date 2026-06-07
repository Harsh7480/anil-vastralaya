'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Star,
  MessageCircle,
  Users,
  TrendingUp,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react'

export default function TestimonialsPage() {
  const [isClient, setIsClient] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: '',
    status: 'active',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRating, setFilterRating] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  // Load testimonials from localStorage on client side only
  useEffect(() => {
    setIsClient(true)
    const savedTestimonials = localStorage.getItem('testimonials')
    if (savedTestimonials) {
      const parsed = JSON.parse(savedTestimonials)
      setTestimonials(parsed)
    } else {
      // Default testimonials
      const defaultTestimonials = [
        {
          id: 1,
          name: 'Aarav Sharma',
          review:
            'Amazing quality clothes! The fabric feels premium and the fit is perfect.',
          rating: 5,
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Priya Verma',
          review:
            'Loved the collection! Stylish designs and great pricing. Highly recommended.',
          rating: 4,
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Rohit Singh',
          review:
            'Fast delivery and the outfit looks exactly like the pictures. Great experience!',
          rating: 5,
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ]
      setTestimonials(defaultTestimonials)
      localStorage.setItem('testimonials', JSON.stringify(defaultTestimonials))
    }
  }, [])

  // Save testimonials to localStorage
  useEffect(() => {
    if (testimonials.length > 0 && isClient) {
      localStorage.setItem('testimonials', JSON.stringify(testimonials))
    }
  }, [testimonials, isClient])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const openAddModal = () => {
    setEditingTestimonial(null)
    setFormData({
      name: '',
      review: '',
      rating: '',
      status: 'active',
    })
    setIsModalOpen(true)
  }

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      review: testimonial.review,
      rating: testimonial.rating.toString(),
      status: testimonial.status,
    })
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.review || !formData.rating) {
      alert('Please fill all required fields!')
      return
    }

    const ratingNum = parseInt(formData.rating)
    if (ratingNum < 1 || ratingNum > 5) {
      alert('Rating must be between 1 and 5!')
      return
    }

    if (editingTestimonial) {
      // Update existing testimonial
      const updatedTestimonials = testimonials.map((item) =>
        item.id === editingTestimonial.id
          ? {
              ...item,
              name: formData.name,
              review: formData.review,
              rating: ratingNum,
              status: formData.status,
              updatedAt: new Date().toISOString(),
            }
          : item,
      )
      setTestimonials(updatedTestimonials)
      alert('Testimonial updated successfully!')
    } else {
      // Add new testimonial
      const newTestimonial = {
        id: Date.now(),
        name: formData.name,
        review: formData.review,
        rating: ratingNum,
        status: formData.status,
        createdAt: new Date().toISOString(),
      }
      setTestimonials([newTestimonial, ...testimonials])
      alert('Testimonial added successfully!')
    }

    setIsModalOpen(false)
    setFormData({
      name: '',
      review: '',
      rating: '',
      status: 'active',
    })
  }

  const deleteTestimonial = (id) => {
    const testimonial = testimonials.find((item) => item.id === id)
    if (
      confirm(
        `Are you sure you want to delete "${testimonial.name}"'s testimonial?`,
      )
    ) {
      const updatedTestimonials = testimonials.filter((item) => item.id !== id)
      setTestimonials(updatedTestimonials)
      alert('Testimonial deleted successfully!')
    }
  }

  const toggleTestimonialStatus = (id) => {
    const updatedTestimonials = testimonials.map((item) =>
      item.id === id
        ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
        : item,
    )
    setTestimonials(updatedTestimonials)
  }

  const filteredTestimonials = testimonials.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.review.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating =
      filterRating === 'all' || item.rating === parseInt(filterRating)
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesRating && matchesStatus
  })

  const stats = {
    total: testimonials.length,
    active: testimonials.filter((i) => i.status === 'active').length,
    inactive: testimonials.filter((i) => i.status === 'inactive').length,
    avgRating:
      testimonials.length > 0
        ? (
            testimonials.reduce((sum, i) => sum + i.rating, 0) /
            testimonials.length
          ).toFixed(1)
        : 0,
    fiveStar: testimonials.filter((i) => i.rating === 5).length,
  }

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-gray-600 mt-2">Manage customer testimonials</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Testimonials</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.active}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Inactive</p>
              <p className="text-3xl font-bold text-red-600">
                {stats.inactive}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <EyeOff className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg Rating</p>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.avgRating}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">5 Star Reviews</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.fiveStar}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by name or review..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Ratings</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Review
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTestimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ID: {testimonial.id}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600 text-sm max-w-md line-clamp-2">
                      {testimonial.review}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
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
                      <span className="text-xs text-gray-500 ml-2">
                        ({testimonial.rating}/5)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleTestimonialStatus(testimonial.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                        testimonial.status === 'active'
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {testimonial.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(testimonial)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Testimonial"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Testimonials Found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterRating !== 'all'
                ? 'No testimonials match your filters.'
                : 'Get started by adding your first testimonial.'}
            </p>
            {!searchTerm && filterRating === 'all' && (
              <button
                onClick={openAddModal}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Testimonial</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingTestimonial
                  ? 'Edit Testimonial'
                  : 'Add New Testimonial'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
                  placeholder="e.g., Aarav Sharma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review *
                </label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Write customer review..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (1-5) *
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="5"
                    step="1"
                    className="w-24 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    placeholder="5"
                  />
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star.toString() })
                        }
                        className={`text-2xl transition ${
                          star <= parseInt(formData.rating)
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
                >
                  <option value="active">Active (Show on Website)</option>
                  <option value="inactive">Inactive (Hidden)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>
                    {editingTestimonial
                      ? 'Update Testimonial'
                      : 'Add Testimonial'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
