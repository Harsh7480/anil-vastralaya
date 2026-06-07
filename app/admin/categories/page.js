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
  Folder,
  Tag,
  AlertCircle,
} from 'lucide-react'

export default function CategoriesPage() {
  const [isClient, setIsClient] = useState(false)
  const [categories, setCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    status: 'active',
  })
  const [imagePreview, setImagePreview] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Load categories from localStorage on client side only
  useEffect(() => {
    setIsClient(true)
    const savedCategories = localStorage.getItem('categories')
    if (savedCategories) {
      const parsed = JSON.parse(savedCategories)
      setCategories(parsed)
    } else {
      // Default categories
      const defaultCategories = [
        {
          id: 'women',
          name: 'Women',
          description: 'Elegant sarees, lehengas & more',
          image: '/images/women.png',
          status: 'active',
          productCount: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'ethnic',
          name: 'Ethnic Wear',
          description: 'Traditional & festive collections',
          image: '/images/ethnic.png',
          status: 'active',
          productCount: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'kids',
          name: 'Kids',
          description: 'Adorable outfits for little ones',
          image: '/images/kids.png',
          status: 'active',
          productCount: 0,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'men',
          name: "Men's Collection",
          description: 'Shirts, kurtas, and suits for men',
          image: '/images/men.png',
          status: 'active',
          productCount: 0,
          createdAt: new Date().toISOString(),
        },
      ]
      setCategories(defaultCategories)
      localStorage.setItem('categories', JSON.stringify(defaultCategories))
    }
  }, [])

  // Save categories to localStorage
  useEffect(() => {
    if (categories.length > 0 && isClient) {
      localStorage.setItem('categories', JSON.stringify(categories))
    }
  }, [categories, isClient])

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
    setEditingCategory(null)
    setFormData({
      name: '',
      description: '',
      image: '',
      status: 'active',
    })
    setImagePreview('')
    setIsModalOpen(true)
  }

  const openEditModal = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      status: category.status,
    })
    setImagePreview(category.image)
    setIsModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.description) {
      alert('Please fill all required fields!')
      return
    }

    const categoryId = formData.name.toLowerCase().replace(/\s+/g, '-')

    if (editingCategory) {
      // Update existing category
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              name: formData.name,
              description: formData.description,
              image: formData.image,
              status: formData.status,
              updatedAt: new Date().toISOString(),
            }
          : cat,
      )
      setCategories(updatedCategories)
      alert('Category updated successfully!')
    } else {
      // Add new category
      const newCategory = {
        id: categoryId,
        name: formData.name,
        description: formData.description,
        image: formData.image || '/images/placeholder.png',
        status: formData.status,
        productCount: 0,
        createdAt: new Date().toISOString(),
      }
      setCategories([...categories, newCategory])
      alert('Category added successfully!')
    }

    setIsModalOpen(false)
    setFormData({
      name: '',
      description: '',
      image: '',
      status: 'active',
    })
    setImagePreview('')
  }

  const deleteCategory = (id) => {
    const category = categories.find((cat) => cat.id === id)
    if (category.productCount > 0) {
      alert(
        `Cannot delete "${category.name}" because it has ${category.productCount} products. Please reassign or delete products first.`,
      )
      return
    }

    if (
      confirm(`Are you sure you want to delete "${category.name}" category?`)
    ) {
      const updatedCategories = categories.filter((cat) => cat.id !== id)
      setCategories(updatedCategories)
      alert('Category deleted successfully!')
    }
  }

  const toggleCategoryStatus = (id) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === id
        ? { ...cat, status: cat.status === 'active' ? 'inactive' : 'active' }
        : cat,
    )
    setCategories(updatedCategories)
  }

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === 'all' || category.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.status === 'active').length,
    inactive: categories.filter((c) => c.status === 'inactive').length,
    totalProducts: categories.reduce((sum, cat) => sum + cat.productCount, 0),
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
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600 mt-2">Manage your product categories</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Categories</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Folder className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Categories</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.active}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Inactive Categories</p>
              <p className="text-3xl font-bold text-red-600">
                {stats.inactive}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.totalProducts}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Tag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === 'all'
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus('inactive')}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === 'inactive'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 bg-[#EDE5DB]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-contain p-4"
              />
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  category.status === 'active'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {category.status === 'active' ? 'Active' : 'Inactive'}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {category.id}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openEditModal(category)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{category.productCount}</span>{' '}
                  Products
                </div>
                <button
                  onClick={() => toggleCategoryStatus(category.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                    category.status === 'active'
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {category.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Categories Found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? 'No categories match your search criteria.'
              : 'Get started by adding your first category.'}
          </p>
          {!searchTerm && (
            <button
              onClick={openAddModal}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Category</span>
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
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
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
                  placeholder="e.g., Women, Men, Kids"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400"
                  placeholder="Brief description of the category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
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
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                          >
                            <span>Upload an image</span>
                            <input
                              id="image-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 2MB
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>
                    {editingCategory ? 'Update Category' : 'Add Category'}
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
