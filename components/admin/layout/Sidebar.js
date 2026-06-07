'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  FiHome,
  FiUpload,
  FiStar,
  FiShoppingBag,
  FiFolder,
  FiImage,
  FiPhone,
  FiSettings,
  FiUser,
} from 'react-icons/fi'
import { MdDashboard } from 'react-icons/md'

export default function Sidebar({ sidebarOpen }) {
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: MdDashboard,
    },
    // {
    //   name: 'Upload Data',
    //   href: '/admin/upload',
    //   icon: FiUpload,
    // },
    {
      name: 'Testimonials',
      href: '/admin/testimonials',
      icon: FiStar,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: FiShoppingBag,
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: FiFolder,
    },
    {
      name: 'Gallery',
      href: '/admin/gallery',
      icon: FiImage,
    },
    {
      name: 'Contact Details',
      href: '/admin/contact',
      icon: FiPhone,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: FiSettings,
    },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } hidden md:block`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Area - Updated with your logo */}
          <div className="h-20 flex items-center justify-center border-b border-gray-200 px-4">
            {sidebarOpen ? (
              <Link
                href="/"
                className="flex items-center justify-center w-full"
              >
                <Image
                  src="/images/Anil Vastralaya.png"
                  alt="Anil Vastralaya"
                  width={220}
                  height={80}
                  className="h-18 w-auto object-contain"
                  priority
                />
              </Link>
            ) : (
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src="/images/Anil Vastralaya.png"
                  alt="Anil Vastralaya"
                  width={50}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </Link>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-6 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 mx-2 mb-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#98635D] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="text-xl" />
                  {sidebarOpen && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200">
            {sidebarOpen ? (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FiUser className="text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">
                    admin@anilvastralaya.com
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FiUser className="text-gray-600" />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar (overlay) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => {}}
          ></div>
          <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50">
            <div className="h-full flex flex-col">
              {/* Logo Area for Mobile */}
              <div className="h-20 flex items-center justify-center px-4 border-b">
                <Link
                  href="/"
                  className="flex items-center justify-center w-full"
                >
                  <Image
                    src="/images/Anil Vastralaya.png"
                    alt="Anil Vastralaya"
                    width={200}
                    height={70}
                    className="h-12 w-auto object-contain"
                    priority
                  />
                </Link>
                <button
                  onClick={() => {}}
                  className="absolute right-4 text-gray-500 text-xl"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 mt-6 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-4 py-3 mx-2 mb-2 rounded-lg hover:bg-gray-100"
                      onClick={() => {}} // Close mobile sidebar on click
                    >
                      <Icon className="text-xl" />
                      <span className="ml-3 font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FiUser className="text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-gray-500">
                      admin@anilvastralaya.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
