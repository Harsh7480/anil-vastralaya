'use client'

import React, { useState, useEffect } from 'react'
import {
  Save,
  Store,
  DollarSign,
  Truck,
  Shield,
  Mail,
  CreditCard,
  Globe,
  Bell,
  Palette,
  Lock,
  Users,
  Share2,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Tag,
  Percent,
  Package,
  Award,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react'

export default function SettingsPage() {
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'Anil Vastralaya',
    storeTagline: 'One of the best clothing store',
    storeEmail: 'contact@anilvastralaya.com',
    storePhone: '+91 98765 43210',
    storePhone2: '+91 11 2345 6789',
    storeAddress: 'Main Market, Chandni Chowk, Delhi - 110006, India',
    storeDescription: 'Anil Vastralaya offers premium quality ethnic and contemporary fashion for the whole family.',
    
    // Business Hours
    businessHours: {
      monday_friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 8:00 PM'
    },
    
    // Payment & Tax Settings
    currency: 'INR',
    currencySymbol: '₹',
    taxPercentage: '18',
    taxName: 'GST',
    enableTax: true,
    
    // Shipping Settings
    shippingCharges: '50',
    freeShippingAbove: '999',
    deliveryTimeMin: '3',
    deliveryTimeMax: '7',
    returnPolicy: '30 days return policy with original condition and tags intact. Customers can return items within 30 days of delivery.',
    exchangePolicy: 'Free exchange within 15 days of delivery for size or defect issues.',
    
    // Social Media Links
    socialMedia: {
      facebook: 'https://facebook.com/anilvastralaya',
      instagram: 'https://instagram.com/anilvastralaya',
      twitter: 'https://twitter.com/anilvastralaya',
      youtube: 'https://youtube.com/anilvastralaya',
      whatsapp: '+919876543210'
    },
    
    // Email Settings
    emailSettings: {
      adminEmail: 'admin@anilvastralaya.com',
      orderEmail: 'orders@anilvastralaya.com',
      supportEmail: 'support@anilvastralaya.com',
      newsletterEmail: 'newsletter@anilvastralaya.com'
    },
    
    // Appearance Settings
    appearance: {
      primaryColor: '#000000',
      secondaryColor: '#FFF8E7',
      accentColor: '#98635D',
      headerStyle: 'default',
      footerStyle: 'default',
      bannerText: 'Summer Sale - Up to 50% Off on Ethnic Wear!',
      bannerEnabled: true,
      showNewsletter: true,
      showSocialIcons: true
    },
    
    // Notification Settings
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      lowStockAlert: true,
      lowStockThreshold: '10',
      newUserAlert: true,
      inquiryAlert: true
    },
    
    // Security Settings
    security: {
      twoFactorAuth: false,
      sessionTimeout: '60',
      maxLoginAttempts: '5',
      requireStrongPassword: true
    },
    
    // SEO Settings
    seo: {
      metaTitle: 'Anil Vastralaya - Premium Ethnic Wear Store',
      metaDescription: 'Shop the finest collection of sarees, lehengas, kurtas and more. Free shipping & easy returns.',
      metaKeywords: 'ethnic wear, sarees, lehengas, kurtas, indian fashion',
      enableSitemap: true,
      enableRobots: true
    },
    
    // Discount & Coupon Settings
    discounts: {
      enableCoupons: true,
      firstOrderDiscount: '10',
      referralDiscount: '15',
      minimumOrderForCoupon: '999'
    }
  })

  // Load settings from localStorage
  useEffect(() => {
    setIsClient(true)
    const savedSettings = localStorage.getItem('websiteSettings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)
    }
  }, [])

  // Save settings to localStorage
  useEffect(() => {
    if (isClient && settings) {
      localStorage.setItem('websiteSettings', JSON.stringify(settings))
    }
  }, [settings, isClient])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleNestedChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    })
  }

  const handleSocialMediaChange = (platform, value) => {
    setSettings({
      ...settings,
      socialMedia: {
        ...settings.socialMedia,
        [platform]: value
      }
    })
  }

  const handleEmailChange = (type, value) => {
    setSettings({
      ...settings,
      emailSettings: {
        ...settings.emailSettings,
        [type]: value
      }
    })
  }

  const handleAppearanceChange = (field, value) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [field]: value
      }
    })
  }

  const handleBusinessHoursChange = (day, value) => {
    setSettings({
      ...settings,
      businessHours: {
        ...settings.businessHours,
        [day]: value
      }
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    localStorage.setItem('websiteSettings', JSON.stringify(settings))
    alert('All settings saved successfully!')
    setIsSaving(false)
  }

  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      window.location.reload()
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Store },
    { id: 'business', name: 'Business Hours', icon: Clock },
    { id: 'payment', name: 'Payment & Tax', icon: DollarSign },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'social', name: 'Social Media', icon: Share2 },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'seo', name: 'SEO', icon: Globe },
    { id: 'discounts', name: 'Discounts', icon: Tag }
  ]

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
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your website configuration</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetToDefault}
            className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Reset to Default</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition flex items-center space-x-2 disabled:bg-gray-400"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Container */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name *
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Tagline
                  </label>
                  <input
                    type="text"
                    name="storeTagline"
                    value={settings.storeTagline}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Email *
                  </label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={settings.storeEmail}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Phone 1 *
                  </label>
                  <input
                    type="tel"
                    name="storePhone"
                    value={settings.storePhone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Phone 2
                  </label>
                  <input
                    type="tel"
                    name="storePhone2"
                    value={settings.storePhone2}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Address *
                  </label>
                  <textarea
                    name="storeAddress"
                    value={settings.storeAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Description
                  </label>
                  <textarea
                    name="storeDescription"
                    value={settings.storeDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Hours */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Business Hours</h2>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monday - Friday
                  </label>
                  <input
                    type="text"
                    value={settings.businessHours.monday_friday}
                    onChange={(e) => handleBusinessHoursChange('monday_friday', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    placeholder="10:00 AM - 9:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Saturday
                  </label>
                  <input
                    type="text"
                    value={settings.businessHours.saturday}
                    onChange={(e) => handleBusinessHoursChange('saturday', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    placeholder="10:00 AM - 9:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sunday
                  </label>
                  <input
                    type="text"
                    value={settings.businessHours.sunday}
                    onChange={(e) => handleBusinessHoursChange('sunday', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    placeholder="11:00 AM - 8:00 PM"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment & Tax Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Payment & Tax Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Name
                  </label>
                  <input
                    type="text"
                    name="taxName"
                    value={settings.taxName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Percentage (%)
                  </label>
                  <input
                    type="number"
                    name="taxPercentage"
                    value={settings.taxPercentage}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableTax"
                      checked={settings.enableTax}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-black focus:ring-black rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable Tax on Products</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Settings */}
          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Shipping Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard Shipping Charges ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    name="shippingCharges"
                    value={settings.shippingCharges}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Free Shipping Above ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    name="freeShippingAbove"
                    value={settings.freeShippingAbove}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Delivery Time (Days)
                  </label>
                  <input
                    type="number"
                    name="deliveryTimeMin"
                    value={settings.deliveryTimeMin}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Delivery Time (Days)
                  </label>
                  <input
                    type="number"
                    name="deliveryTimeMax"
                    value={settings.deliveryTimeMax}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Policy
                  </label>
                  <textarea
                    name="returnPolicy"
                    value={settings.returnPolicy}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exchange Policy
                  </label>
                  <textarea
                    name="exchangePolicy"
                    value={settings.exchangePolicy}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media Settings */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Social Media Links</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Facebook className="w-4 h-4 inline mr-2" /> Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.facebook}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Instagram className="w-4 h-4 inline mr-2" /> Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.instagram}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Twitter className="w-4 h-4 inline mr-2" /> Twitter URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.twitter}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Youtube className="w-4 h-4 inline mr-2" /> YouTube URL
                  </label>
                  <input
                    type="url"
                    value={settings.socialMedia.youtube}
                    onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" /> WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={settings.socialMedia.whatsapp}
                    onChange={(e) => handleSocialMediaChange('whatsapp', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Email Configuration</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={settings.emailSettings.adminEmail}
                    onChange={(e) => handleEmailChange('adminEmail', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Notifications Email
                  </label>
                  <input
                    type="email"
                    value={settings.emailSettings.orderEmail}
                    onChange={(e) => handleEmailChange('orderEmail', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.emailSettings.supportEmail}
                    onChange={(e) => handleEmailChange('supportEmail', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Newsletter Email
                  </label>
                  <input
                    type="email"
                    value={settings.emailSettings.newsletterEmail}
                    onChange={(e) => handleEmailChange('newsletterEmail', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Appearance Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
                      className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => handleAppearanceChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => handleAppearanceChange('secondaryColor', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.appearance.accentColor}
                      onChange={(e) => handleAppearanceChange('accentColor', e.target.value)}
                      className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.appearance.accentColor}
                      onChange={(e) => handleAppearanceChange('accentColor', e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Announcement Banner Text
                  </label>
                  <input
                    type="text"
                    value={settings.appearance.bannerText}
                    onChange={(e) => handleAppearanceChange('bannerText', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Enable Announcement Banner</p>
                    <p className="text-sm text-gray-500">Show banner on top of website</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.appearance.bannerEnabled}
                      onChange={(e) => handleAppearanceChange('bannerEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive email updates about your store</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleNestedChange('notifications', 'emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Order Notifications</p>
                    <p className="text-sm text-gray-500">Get notified when new orders are placed</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.orderNotifications}
                      onChange={(e) => handleNestedChange('notifications', 'orderNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Low Stock Alert</p>
                    <p className="text-sm text-gray-500">Get alert when product stock is low</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.lowStockAlert}
                        onChange={(e) => handleNestedChange('notifications', 'lowStockAlert', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                    {settings.notifications.lowStockAlert && (
                      <input
                        type="number"
                        value={settings.notifications.lowStockThreshold}
                        onChange={(e) => handleNestedChange('notifications', 'lowStockThreshold', e.target.value)}
                        className="w-20 border border-gray-300 rounded-lg p-2 text-center"
                        placeholder="Qty"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleNestedChange('security', 'twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (Minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleNestedChange('security', 'sessionTimeout', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => handleNestedChange('security', 'maxLoginAttempts', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Require Strong Password</p>
                    <p className="text-sm text-gray-500">Enforce strong password policy</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.requireStrongPassword}
                      onChange={(e) => handleNestedChange('security', 'requireStrongPassword', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">SEO Settings</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seo.metaTitle}
                    onChange={(e) => handleNestedChange('seo', 'metaTitle', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.seo.metaDescription}
                    onChange={(e) => handleNestedChange('seo', 'metaDescription', e.target.value)}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={settings.seo.metaKeywords}
                    onChange={(e) => handleNestedChange('seo', 'metaKeywords', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Discount & Coupon Settings */}
          {activeTab === 'discounts' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Discount & Coupon Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                    <div>
                      <p className="font-medium text-gray-800">Enable Coupons & Discounts</p>
                      <p className="text-sm text-gray-500">Allow customers to use coupon codes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.discounts.enableCoupons}
                        onChange={(e) => handleNestedChange('discounts', 'enableCoupons', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Order Discount (%)
                  </label>
                  <input
                    type="number"
                    value={settings.discounts.firstOrderDiscount}
                    onChange={(e) => handleNestedChange('discounts', 'firstOrderDiscount', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Referral Discount (%)
                  </label>
                  <input
                    type="number"
                    value={settings.discounts.referralDiscount}
                    onChange={(e) => handleNestedChange('discounts', 'referralDiscount', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Order Amount for Coupon ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    value={settings.discounts.minimumOrderForCoupon}
                    onChange={(e) => handleNestedChange('discounts', 'minimumOrderForCoupon', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none text-gray-900"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}