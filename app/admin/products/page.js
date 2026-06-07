"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon,
  Package,
  DollarSign,
  Tag,
  AlertCircle,
  Search,
  Star,
  Eye
} from 'lucide-react';

export default function ProductsPage() {
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    tag: '',
    stock: '',
    status: 'active',
    featured: false,
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = [
    { id: 'women', name: 'Women' },
    { id: 'ethnic', name: 'Ethnic Wear' },
    { id: 'men', name: "Men's Collection" },
    { id: 'kids', name: 'Kids' },
  ];

  const subcategories = {
    women: ['sarees', 'kurtas', 'suits', 'lehengas'],
    ethnic: ['lehengas', 'kurtas', 'sarees'],
    men: ['kurtas', 'shirts', 'suits'],
    kids: ['lehengas', 'kurtas', 'dresses'],
  };

  const tags = ['Bestseller', 'New', 'Sale', 'Trending', 'Limited Edition'];

  // Load products from localStorage on client side only
  useEffect(() => {
    setIsClient(true);
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      setProducts(parsed);
    } else {
      // Default products
      const defaultProducts = [
        {
          id: 1,
          name: 'Silk Banarasi Saree',
          price: 2999,
          originalPrice: 4999,
          image: '/images/product1.png',
          tag: 'Bestseller',
          category: 'women',
          subcategory: 'sarees',
          stock: 25,
          status: 'active',
          featured: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Bridal Red Lehenga',
          price: 12999,
          originalPrice: 18999,
          image: '/images/product2.png',
          tag: 'New',
          category: 'ethnic',
          subcategory: 'lehengas',
          stock: 10,
          status: 'active',
          featured: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Cotton Anarkali Set',
          price: 1899,
          originalPrice: 2999,
          image: '/images/product3.png',
          tag: 'Sale',
          category: 'women',
          subcategory: 'kurtas',
          stock: 50,
          status: 'active',
          featured: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 4,
          name: 'Designer Sharara Set',
          price: 4599,
          originalPrice: 6999,
          image: '/images/product4.jpg',
          tag: 'Trending',
          category: 'ethnic',
          subcategory: 'kurtas',
          stock: 15,
          status: 'active',
          featured: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 5,
          name: 'Embroidered Suit',
          price: 3299,
          originalPrice: 5499,
          image: '/images/product1.png',
          tag: 'Bestseller',
          category: 'women',
          subcategory: 'suits',
          stock: 30,
          status: 'active',
          featured: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 6,
          name: 'Georgette Party Saree',
          price: 2199,
          originalPrice: 3999,
          image: '/images/product2.png',
          tag: 'New',
          category: 'women',
          subcategory: 'sarees',
          stock: 20,
          status: 'active',
          featured: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 7,
          name: "Men's Silk Kurta",
          price: 1499,
          originalPrice: 2499,
          image: '/images/product3.png',
          tag: 'Bestseller',
          category: 'men',
          subcategory: 'kurtas',
          stock: 40,
          status: 'active',
          featured: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: 8,
          name: 'Kids Lehenga Set',
          price: 999,
          originalPrice: 1599,
          image: '/images/product4.jpg',
          tag: 'New',
          category: 'kids',
          subcategory: 'lehengas',
          stock: 35,
          status: 'active',
          featured: false,
          createdAt: new Date().toISOString(),
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  // Save products to localStorage
  useEffect(() => {
    if (products.length > 0 && isClient) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isClient]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    if (name === 'category') {
      setSelectedCategory(value);
      setFormData(prev => ({ ...prev, subcategory: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      subcategory: '',
      tag: '',
      stock: '',
      status: 'active',
      featured: false,
      image: '',
    });
    setImagePreview('');
    setSelectedCategory('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      category: product.category,
      subcategory: product.subcategory,
      tag: product.tag || '',
      stock: product.stock.toString(),
      status: product.status,
      featured: product.featured || false,
      image: product.image,
    });
    setImagePreview(product.image);
    setSelectedCategory(product.category);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.category || !formData.subcategory) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...product, 
              name: formData.name,
              price: parseFloat(formData.price),
              originalPrice: parseFloat(formData.originalPrice),
              category: formData.category,
              subcategory: formData.subcategory,
              tag: formData.tag,
              stock: parseInt(formData.stock),
              status: formData.status,
              featured: formData.featured,
              image: formData.image || product.image,
              updatedAt: new Date().toISOString()
            }
          : product
      );
      setProducts(updatedProducts);
      alert("Product updated successfully!");
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        image: formData.image || '/images/placeholder.png',
        tag: formData.tag,
        category: formData.category,
        subcategory: formData.subcategory,
        stock: parseInt(formData.stock),
        status: formData.status,
        featured: formData.featured,
        createdAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
      alert("Product added successfully!");
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      subcategory: '',
      tag: '',
      stock: '',
      status: 'active',
      featured: false,
      image: '',
    });
    setImagePreview('');
  };

  const deleteProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      alert("Product deleted successfully!");
    }
  };

  const toggleProductStatus = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, status: product.status === 'active' ? 'inactive' : 'active' }
        : product
    );
    setProducts(updatedProducts);
  };

  const toggleFeatured = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, featured: !product.featured }
        : product
    );
    setProducts(updatedProducts);
    const product = products.find(p => p.id === id);
    alert(product.featured ? "Product removed from featured!" : "Product added to featured!");
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesFeatured = filterFeatured === 'all' || 
      (filterFeatured === 'featured' && product.featured) ||
      (filterFeatured === 'non-featured' && !product.featured);
    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    inactive: products.filter(p => p.status === 'inactive').length,
    lowStock: products.filter(p => p.stock < 20).length,
    featured: products.filter(p => p.featured).length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0),
  };

  const getTagColor = (tag) => {
    const colors = {
      'Bestseller': 'bg-orange-100 text-orange-700',
      'New': 'bg-green-100 text-green-700',
      'Sale': 'bg-red-100 text-red-700',
      'Trending': 'bg-blue-100 text-blue-700',
      'Limited Edition': 'bg-purple-100 text-purple-700',
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product catalog</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <Tag className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Featured</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.featured}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Low Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.lowStock}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Inactive</p>
              <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
            </div>
            <Eye className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Total Value</p>
              <p className="text-2xl font-bold text-purple-600">₹{stats.totalValue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
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
          <div>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
            >
              <option value="all">All Products</option>
              <option value="featured">Featured Only</option>
              <option value="non-featured">Non-Featured Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Tag</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Featured</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 bg-[#EDE5DB] rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{product.subcategory}</p>
                      </div>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-gray-600">{product.category}</span>
                   </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">₹{product.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>
                    </div>
                   </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock < 20 ? 'text-red-600' : 'text-gray-600'}`}>
                      {product.stock} units
                    </span>
                   </td>
                  <td className="px-6 py-4">
                    {product.tag && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(product.tag)}`}>
                        {product.tag}
                      </span>
                    )}
                   </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition ${
                        product.featured
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                      <span>{product.featured ? 'Featured' : 'Add to Featured'}</span>
                    </button>
                   </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleProductStatus(product.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                        product.status === 'active'
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {product.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                   </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Product"
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterCategory !== 'all' ? "No products match your filters." : "Get started by adding your first product."}
            </p>
            {!searchTerm && filterCategory === 'all' && (
              <button
                onClick={openAddModal}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400 bg-white"
                  placeholder="e.g., Silk Banarasi Saree"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400 bg-white"
                    placeholder="2999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400 bg-white"
                    placeholder="4999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory *
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.category}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white disabled:bg-gray-100 disabled:text-gray-500"
                  >
                    <option value="">Select Subcategory</option>
                    {formData.category && subcategories[formData.category]?.map(sub => (
                      <option key={sub} value={sub}>{sub.charAt(0).toUpperCase() + sub.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag
                  </label>
                  <select
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 bg-white"
                  >
                    <option value="">Select Tag</option>
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900 placeholder-gray-400 bg-white"
                    placeholder="25"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="flex items-center space-x-3 mt-8 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-black focus:ring-black rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
                    <Star className="w-4 h-4 text-yellow-500" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
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
                            setImagePreview('');
                            setFormData({ ...formData, image: '' });
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
                            htmlFor="product-image"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                          >
                            <span>Upload an image</span>
                            <input
                              id="product-image"
                              type="file"
                              className="sr-only"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
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
  );
}