'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Save,
  Store,
  DollarSign,
  Truck,
  Shield,
  Mail,
  Globe,
  Bell,
  Palette,
  Lock,
  Share2,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Tag,
  RefreshCw,
  Settings,
  CreditCard,
  Package,
  Eye,
  ChevronRight
} from 'lucide-react'
import { fetchAPI } from '@/utils/api'
import { useToast } from '@/context/ToastContext'

const Toggle = React.memo(({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
  </label>
))

const InputField = React.memo(({ label, children, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
))

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-gray-900 bg-white"

export default function SettingsPage() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'Anil Vastralaya',
    storeTagline: 'One of the best clothing store',
    storeEmail: 'contact@anilvastralaya.com',
    storePhone: '+91 98765 43210',
    storePhone2: '+91 11 2345 6789',
    storeAddress: 'Main Market, Chandni Chowk, Delhi - 110006, India',
    storeDescription: 'Anil Vastralaya offers premium quality ethnic and contemporary fashion for the whole family.',
    businessHours: {
      monday_friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 8:00 PM'
    },
    currency: 'INR',
    currencySymbol: '₹',
    taxPercentage: '18',
    taxName: 'GST',
    enableTax: true,
    shippingCharges: '50',
    freeShippingAbove: '999',
    deliveryTimeMin: '3',
    deliveryTimeMax: '7',
    returnPolicy: '30 days return policy with original condition and tags intact.',
    exchangePolicy: 'Free exchange within 15 days of delivery for size or defect issues.',
    socialMedia: {
      facebook: 'https://facebook.com/anilvastralaya',
      instagram: 'https://instagram.com/anilvastralaya',
      twitter: 'https://twitter.com/anilvastralaya',
      youtube: 'https://youtube.com/anilvastralaya',
      whatsapp: '+919876543210'
    },
    emailSettings: {
      adminEmail: 'admin@anilvastralaya.com',
      orderEmail: 'orders@anilvastralaya.com',
      supportEmail: 'support@anilvastralaya.com',
      newsletterEmail: 'newsletter@anilvastralaya.com'
    },
    appearance: {
      primaryColor: '#000000',
      secondaryColor: '#FFF8E7',
      accentColor: '#98635D',
      bannerText: 'Summer Sale - Up to 50% Off on Ethnic Wear!',
      bannerEnabled: true,
      showNewsletter: true,
      showSocialIcons: true
    },
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      lowStockAlert: true,
      lowStockThreshold: '10',
      newUserAlert: true,
      inquiryAlert: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '60',
      maxLoginAttempts: '5',
      requireStrongPassword: true
    },
    seo: {
      metaTitle: 'Anil Vastralaya - Premium Ethnic Wear Store',
      metaDescription: 'Shop the finest collection of sarees, lehengas, kurtas and more.',
      metaKeywords: 'ethnic wear, sarees, lehengas, kurtas, indian fashion',
      enableSitemap: true,
      enableRobots: true
    },
    discounts: {
      enableCoupons: true,
      firstOrderDiscount: '10',
      referralDiscount: '15',
      minimumOrderForCoupon: '999'
    }
  })

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchAPI('/settings')
        setSettings(prev => ({ ...prev, ...data }))
      } catch (err) {
        console.error('Failed to load settings:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleNestedChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }))
  }

  const handleSocialMediaChange = (platform, value) => {
    setSettings(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }))
  }

  const handleEmailChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      emailSettings: { ...prev.emailSettings, [type]: value }
    }))
  }

  const handleAppearanceChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, [field]: value }
    }))
  }

  const handleBusinessHoursChange = (day, value) => {
    setSettings(prev => ({
      ...prev,
      businessHours: { ...prev.businessHours, [day]: value }
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await fetchAPI('/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      })
      toast.success('All settings saved successfully!')
    } catch (err) {
      toast.error('Failed to save settings: ' + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const resetToDefault = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      window.location.reload()
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Store, color: 'bg-blue-500' },
    { id: 'business', name: 'Business Hours', icon: Clock, color: 'bg-amber-500' },
    { id: 'payment', name: 'Payment & Tax', icon: DollarSign, color: 'bg-emerald-500' },
    { id: 'shipping', name: 'Shipping', icon: Truck, color: 'bg-purple-500' },
    { id: 'social', name: 'Social Media', icon: Share2, color: 'bg-pink-500' },
    { id: 'email', name: 'Email', icon: Mail, color: 'bg-cyan-500' },
    { id: 'appearance', name: 'Appearance', icon: Palette, color: 'bg-rose-500' },
    { id: 'notifications', name: 'Notifications', icon: Bell, color: 'bg-orange-500' },
    { id: 'security', name: 'Security', icon: Shield, color: 'bg-red-500' },
    { id: 'seo', name: 'SEO', icon: Globe, color: 'bg-teal-500' },
    { id: 'discounts', name: 'Discounts', icon: Tag, color: 'bg-indigo-500' }
  ]

  if (isLoading) {
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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">Manage your website configuration</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={resetToDefault}
              className="flex items-center space-x-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-700 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition text-sm font-medium disabled:bg-gray-400"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 bg-white border-r border-gray-200 lg:min-h-[calc(100vh-73px)]">
          <nav className="p-3 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-lg shadow-black/10'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20' : tab.color}`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white'}`} />
                  </div>
                  <span>{tab.name}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl">

            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">General Settings</h2>
                  <p className="text-sm text-gray-500">Basic information about your store</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Store Name" required>
                      <input type="text" name="storeName" value={settings.storeName} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label="Store Tagline">
                      <input type="text" name="storeTagline" value={settings.storeTagline} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label="Store Email" required>
                      <input type="email" name="storeEmail" value={settings.storeEmail} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label="Store Phone 1" required>
                      <input type="tel" name="storePhone" value={settings.storePhone} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label="Store Phone 2">
                      <input type="tel" name="storePhone2" value={settings.storePhone2} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <div className="md:col-span-2">
                      <InputField label="Store Address" required>
                        <textarea name="storeAddress" value={settings.storeAddress} onChange={handleInputChange} rows="2" className={inputClass + " resize-none"} />
                      </InputField>
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="Store Description">
                        <textarea name="storeDescription" value={settings.storeDescription} onChange={handleInputChange} rows="3" className={inputClass + " resize-none"} />
                      </InputField>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Hours */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Business Hours</h2>
                  <p className="text-sm text-gray-500">Set your store operating hours</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <InputField label="Monday - Friday">
                      <input type="text" value={settings.businessHours.monday_friday} onChange={(e) => handleBusinessHoursChange('monday_friday', e.target.value)} className={inputClass + " placeholder-gray-500"} placeholder="10:00 AM - 9:00 PM" />
                    </InputField>
                    <InputField label="Saturday">
                      <input type="text" value={settings.businessHours.saturday} onChange={(e) => handleBusinessHoursChange('saturday', e.target.value)} className={inputClass + " placeholder-gray-500"} placeholder="10:00 AM - 9:00 PM" />
                    </InputField>
                    <InputField label="Sunday">
                      <input type="text" value={settings.businessHours.sunday} onChange={(e) => handleBusinessHoursChange('sunday', e.target.value)} className={inputClass + " placeholder-gray-500"} placeholder="11:00 AM - 8:00 PM" />
                    </InputField>
                  </div>
                </div>
              </div>
            )}

            {/* Payment & Tax */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Payment & Tax Settings</h2>
                  <p className="text-sm text-gray-500">Configure payment and tax options</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Currency">
                      <select name="currency" value={settings.currency} onChange={handleInputChange} className={inputClass + " bg-gray-50"}>
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </InputField>
                    <InputField label="Tax Name">
                      <input type="text" name="taxName" value={settings.taxName} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label="Tax Percentage (%)">
                      <input type="number" name="taxPercentage" value={settings.taxPercentage} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <div className="flex items-center pt-6">
                      <div className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">Enable Tax on Products</span>
                        <Toggle checked={settings.enableTax} onChange={handleInputChange} name="enableTax" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Shipping Settings</h2>
                  <p className="text-sm text-gray-500">Configure shipping and delivery options</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label={`Standard Shipping (${settings.currencySymbol})`}>
                      <input type="number" name="shippingCharges" value={settings.shippingCharges} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label={`Free Shipping Above (${settings.currencySymbol})`}>
                      <input type="number" name="freeShippingAbove" value={settings.freeShippingAbove} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label="Min Delivery Time (Days)">
                      <input type="number" name="deliveryTimeMin" value={settings.deliveryTimeMin} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <InputField label="Max Delivery Time (Days)">
                      <input type="number" name="deliveryTimeMax" value={settings.deliveryTimeMax} onChange={handleInputChange} className={inputClass} />
                    </InputField>
                    <div className="md:col-span-2">
                      <InputField label="Return Policy">
                        <textarea name="returnPolicy" value={settings.returnPolicy} onChange={handleInputChange} rows="3" className={inputClass + " resize-none"} />
                      </InputField>
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="Exchange Policy">
                        <textarea name="exchangePolicy" value={settings.exchangePolicy} onChange={handleInputChange} rows="2" className={inputClass + " resize-none"} />
                      </InputField>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social Media */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Social Media Links</h2>
                  <p className="text-sm text-gray-500">Connect your social media accounts</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="space-y-4">
                    {[
                      { key: 'facebook', label: 'Facebook URL', icon: Facebook, color: 'bg-blue-600' },
                      { key: 'instagram', label: 'Instagram URL', icon: Instagram, color: 'bg-gradient-to-br from-purple-600 to-pink-500' },
                      { key: 'twitter', label: 'Twitter URL', icon: Twitter, color: 'bg-sky-500' },
                      { key: 'youtube', label: 'YouTube URL', icon: Youtube, color: 'bg-red-600' },
                      { key: 'whatsapp', label: 'WhatsApp Number', icon: MessageCircle, color: 'bg-green-500' }
                    ].map(({ key, label, icon: Icon, color }) => (
                      <div key={key} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                          <input
                            type={key === 'whatsapp' ? 'tel' : 'url'}
                            value={settings.socialMedia[key]}
                            onChange={(e) => handleSocialMediaChange(key, e.target.value)}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Email Configuration</h2>
                  <p className="text-sm text-gray-500">Manage email addresses for notifications</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField label="Admin Email">
                      <input type="email" value={settings.emailSettings.adminEmail} onChange={(e) => handleEmailChange('adminEmail', e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField label="Order Notifications Email">
                      <input type="email" value={settings.emailSettings.orderEmail} onChange={(e) => handleEmailChange('orderEmail', e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField label="Customer Support Email">
                      <input type="email" value={settings.emailSettings.supportEmail} onChange={(e) => handleEmailChange('supportEmail', e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField label="Newsletter Email">
                      <input type="email" value={settings.emailSettings.newsletterEmail} onChange={(e) => handleEmailChange('newsletterEmail', e.target.value)} className={inputClass} />
                    </InputField>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Appearance Settings</h2>
                  <p className="text-sm text-gray-500">Customize your store's look and feel</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Brand Colors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { key: 'primaryColor', label: 'Primary Color' },
                        { key: 'secondaryColor', label: 'Secondary Color' },
                        { key: 'accentColor', label: 'Accent Color' }
                      ].map(({ key, label }) => (
                        <div key={key} className="p-4 bg-gray-50 rounded-xl space-y-3">
                          <label className="text-sm font-medium text-gray-700">{label}</label>
                          <div className="flex items-center space-x-3">
                            <input type="color" value={settings.appearance[key]} onChange={(e) => handleAppearanceChange(key, e.target.value)} className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer" />
                            <input type="text" value={settings.appearance[key]} onChange={(e) => handleAppearanceChange(key, e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-black outline-none bg-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Announcement Banner</h3>
                    <div className="space-y-4">
                      <InputField label="Banner Text">
                        <input type="text" value={settings.appearance.bannerText} onChange={(e) => handleAppearanceChange('bannerText', e.target.value)} className={inputClass} />
                      </InputField>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-medium text-gray-800">Enable Announcement Banner</p>
                          <p className="text-sm text-gray-500">Show banner on top of website</p>
                        </div>
                        <Toggle checked={settings.appearance.bannerEnabled} onChange={(e) => handleAppearanceChange('bannerEnabled', e.target.checked)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Notification Preferences</h2>
                  <p className="text-sm text-gray-500">Choose what notifications you receive</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="space-y-3">
                    {[
                      { key: 'emailNotifications', title: 'Email Notifications', desc: 'Receive email updates about your store' },
                      { key: 'orderNotifications', title: 'Order Notifications', desc: 'Get notified when new orders are placed' },
                      { key: 'newUserAlert', title: 'New User Alert', desc: 'Get notified when new users register' },
                      { key: 'inquiryAlert', title: 'Inquiry Alert', desc: 'Get notified for new customer inquiries' }
                    ].map(({ key, title, desc }) => (
                      <div key={key} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition">
                        <div>
                          <p className="font-medium text-gray-800">{title}</p>
                          <p className="text-sm text-gray-500">{desc}</p>
                        </div>
                        <Toggle checked={settings.notifications[key]} onChange={(e) => handleNestedChange('notifications', key, e.target.checked)} />
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition">
                      <div>
                        <p className="font-medium text-gray-800">Low Stock Alert</p>
                        <p className="text-sm text-gray-500">Get alert when product stock is low</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Toggle checked={settings.notifications.lowStockAlert} onChange={(e) => handleNestedChange('notifications', 'lowStockAlert', e.target.checked)} />
                        {settings.notifications.lowStockAlert && (
                          <input type="number" value={settings.notifications.lowStockThreshold} onChange={(e) => handleNestedChange('notifications', 'lowStockThreshold', e.target.value)} className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-center text-gray-900 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none" placeholder="Qty" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Security Settings</h2>
                  <p className="text-sm text-gray-500">Protect your account and data</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition">
                      <div>
                        <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                      <Toggle checked={settings.security.twoFactorAuth} onChange={(e) => handleNestedChange('security', 'twoFactorAuth', e.target.checked)} />
                    </div>
                    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition">
                      <div>
                        <p className="font-medium text-gray-800">Require Strong Password</p>
                        <p className="text-sm text-gray-500">Enforce strong password policy</p>
                      </div>
                      <Toggle checked={settings.security.requireStrongPassword} onChange={(e) => handleNestedChange('security', 'requireStrongPassword', e.target.checked)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                    <InputField label="Session Timeout (Minutes)">
                      <input type="number" value={settings.security.sessionTimeout} onChange={(e) => handleNestedChange('security', 'sessionTimeout', e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField label="Max Login Attempts">
                      <input type="number" value={settings.security.maxLoginAttempts} onChange={(e) => handleNestedChange('security', 'maxLoginAttempts', e.target.value)} className={inputClass} />
                    </InputField>
                  </div>
                </div>
              </div>
            )}

            {/* SEO */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">SEO Settings</h2>
                  <p className="text-sm text-gray-500">Optimize your site for search engines</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <InputField label="Meta Title">
                    <input type="text" value={settings.seo.metaTitle} onChange={(e) => handleNestedChange('seo', 'metaTitle', e.target.value)} className={inputClass} />
                  </InputField>
                  <InputField label="Meta Description">
                    <textarea value={settings.seo.metaDescription} onChange={(e) => handleNestedChange('seo', 'metaDescription', e.target.value)} rows="3" className={inputClass + " resize-none"} />
                  </InputField>
                  <InputField label="Meta Keywords">
                    <input type="text" value={settings.seo.metaKeywords} onChange={(e) => handleNestedChange('seo', 'metaKeywords', e.target.value)} className={inputClass + " placeholder-gray-500"} placeholder="keyword1, keyword2, keyword3" />
                  </InputField>
                </div>
              </div>
            )}

            {/* Discounts */}
            {activeTab === 'discounts' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Discount & Coupon Settings</h2>
                  <p className="text-sm text-gray-500">Configure discounts and promotional offers</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">Enable Coupons & Discounts</p>
                      <p className="text-sm text-gray-500">Allow customers to use coupon codes</p>
                    </div>
                    <Toggle checked={settings.discounts.enableCoupons} onChange={(e) => handleNestedChange('discounts', 'enableCoupons', e.target.checked)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                    <InputField label="First Order Discount (%)">
                      <input type="number" value={settings.discounts.firstOrderDiscount} onChange={(e) => handleNestedChange('discounts', 'firstOrderDiscount', e.target.value)} className={inputClass} />
                    </InputField>
                    <InputField label="Referral Discount (%)">
                      <input type="number" value={settings.discounts.referralDiscount} onChange={(e) => handleNestedChange('discounts', 'referralDiscount', e.target.value)} className={inputClass} />
                    </InputField>
                    <div className="md:col-span-2">
                      <InputField label={`Minimum Order for Coupon (${settings.currencySymbol})`}>
                        <input type="number" value={settings.discounts.minimumOrderForCoupon} onChange={(e) => handleNestedChange('discounts', 'minimumOrderForCoupon', e.target.value)} className={inputClass} />
                      </InputField>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
