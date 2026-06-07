'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  FolderOpen,
  AlertCircle,
  Grid,
  Upload,
  Eye,
  EyeOff,
} from 'lucide-react'

export default function GalleryPage() {
  const [isClient, setIsClient] = useState(false)
  const [galleryItems, setGalleryItems] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    status: 'active',
  })
  const [imagePreview, setImagePreview] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const galleryCategories = ['New Arrivals', 'Bridal', 'Festive', 'Casual']

  // Load gallery items from localStorage on client side only
  useEffect(() => {
    setIsClient(true)
    const savedGallery = localStorage.getItem('gallery')
    if (savedGallery) {
      const parsed = JSON.parse(savedGallery)
      setGalleryItems(parsed)
    } else {
      // Default gallery items
      const defaultGallery = [
        {
          id: 1,
          image: '/images/product1.png',
          category: 'New Arrivals',
          title: 'Silk Saree Collection',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          image: '/images/product2.png',
          category: 'Bridal',
          title: 'Bridal Lehenga',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          image: '/images/product3.png',
          category: 'Festive',
          title: 'Festive Kurtas',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 4,
          image: '/images/product4.jpg',
          category: 'Casual',
          title: 'Casual Elegance',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 5,
          image: '/images/Gemini_Generated_Image_h3152bh3152bh315.png',
          category: 'Bridal',
          title: 'Royal Bridal Set',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 6,
          image: '/images/Gemini_Generated_Image_mfee8qmfee8qmfee.png',
          category: 'New Arrivals',
          title: 'Designer Sets',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 7,
          image: '/images/Gemini_Generated_Image_pbi32opbi32opbi3.png',
          category: 'Festive',
          title: 'Banarasi Collection',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 8,
          image: '/images/Gemini_Generated_Image_r8znntr8znntr8zn.png',
          category: 'Casual',
          title: 'Party Wear',
          status: 'active',
          createdAt: new Date().toISOString(),
        },
        {
          id: 9,
          image: '/images/Gemini_Generated_Image_shew83shew83shew.png',
          category: 'New Arrivals',
          title: "Men's Collection",
          status: 'active',
          createdAt: new Date().toISOString(),
        },
      ]
      setGalleryItems(defaultGallery)
      localStorage.setItem('gallery', JSON.stringify(defaultGallery))
    }
  }, [])

  // Save gallery items to localStorage
  useEffect(() => {
    if (galleryItems.length > 0 && isClient) {
      localStorage.setItem('gallery', JSON.stringify(galleryItems))
    }
  }, [galleryItems, isClient])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData({
          ...formData,
          image: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const openAddModal = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      category: '',
      image: '',
      status: 'active',
    })
    setImagePreview('')
    setIsModalOpen(true)
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      category: item.category,
      image: item.image,
      status: item.status,
    })
    setImagePreview(item.image)
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.category) {
      alert('Please fill all required fields!')
      return
    }

    if (editingItem) {
      // Update existing gallery item
      const updatedGallery = galleryItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title: formData.title,
              category: formData.category,
              image: formData.image,
              status: formData.status,
              updatedAt: new Date().toISOString(),
            }
          : item,
      )
      setGalleryItems(updatedGallery)
      alert('Gallery item updated successfully!')
    } else {
      // Add new gallery item
      const newItem = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        image: formData.image || '/images/placeholder.png',
        status: formData.status,
        createdAt: new Date().toISOString(),
      }
      setGalleryItems([...galleryItems, newItem])
      alert('Gallery item added successfully!')
    }

    setIsModalOpen(false)
    setFormData({
      title: '',
      category: '',
      image: '',
      status: 'active',
    })
    setImagePreview('')
  }

  const deleteItem = (id) => {
    const item = galleryItems.find((item) => item.id === id)
    if (
      confirm(`Are you sure you want to delete "${item.title}" from gallery?`)
    ) {
      const updatedGallery = galleryItems.filter((item) => item.id !== id)
      setGalleryItems(updatedGallery)
      alert('Gallery item deleted successfully!')
    }
  }

  const toggleItemStatus = (id) => {
    const updatedGallery = galleryItems.map((item) =>
      item.id === id
        ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
        : item,
    )
    setGalleryItems(updatedGallery)
  }

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      filterCategory === 'all' || item.category === filterCategory
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const stats = {
    total: galleryItems.length,
    active: galleryItems.filter((i) => i.status === 'active').length,
    inactive: galleryItems.filter((i) => i.status === 'inactive').length,
    categories: [...new Set(galleryItems.map((i) => i.category))].length,
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
          <h1 className="text-3xl font-bold text-gray-800">Gallery</h1>
          <p className="text-gray-600 mt-2">Manage your gallery images</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Image</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Images</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Grid className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Images</p>
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
              <p className="text-gray-500 text-sm">Inactive Images</p>
              <p className="text-3xl font-bold text-red-600">
                {stats.inactive}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <EyeOff className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Categories</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.categories}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FolderOpen className="w-6 h-6 text-purple-600" />
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
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Categories</option>
              {galleryCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
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

      {/* Gallery Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                  Category
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
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="relative w-16 h-16 bg-[#EDE5DB] rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500">ID: {item.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleItemStatus(item.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                        item.status === 'active'
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {item.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Item"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Item"
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

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Gallery Items Found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterCategory !== 'all'
                ? 'No items match your filters.'
                : 'Get started by adding your first gallery image.'}
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <button
                onClick={openAddModal}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Image</span>
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
                {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
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
                  Image Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
                  placeholder="e.g., Silk Saree Collection"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
                >
                  <option value="">Select Category</option>
                  {galleryCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="mb-4">
                        <div className="relative w-32 h-32 mx-auto">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview('')
                            setFormData({ ...formData, image: '' })
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="gallery-image"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                          >
                            <span>Upload an image</span>
                            <input
                              id="gallery-image"
                              type="file"
                              className="sr-only"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
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
                  <span>{editingItem ? 'Update Item' : 'Add Item'}</span>
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
