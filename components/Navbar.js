'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const userMenuRef = useRef(null)
  const searchInputRef = useRef(null)
  const pathname = usePathname()
  const router = useRouter()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isSearchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    window.location.href = '/'
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/Gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href) => pathname === href

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#98635D] via-[#B8826D] to-[#98635D] text-white text-center py-2 px-4">
        <p className="text-[11px] tracking-[0.2em] uppercase font-medium">
          Free Shipping on Orders Above ₹999 | Use Code <span className="font-bold">ANIL10</span> for 10% Off
        </p>
      </div>

      {/* Main Navbar */}
      <header
        className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'shadow-lg shadow-black/5' : 'shadow-sm'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-16 md:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/Anil Vastralaya.png"
                alt="Anil Vastralaya"
                width={220}
                height={80}
                className="h-14 md:h-16 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] tracking-[0.1em] uppercase font-medium transition-colors duration-300 rounded-full ${
                    isActive(link.href)
                      ? 'text-[#98635D]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[#98635D] rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#98635D] hover:bg-[#FAF7F2] rounded-full transition-all duration-300"
              >
                <FaSearch size={16} />
              </button>

              {/* Auth: Login/Register or User Profile */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 w-10 h-10 sm:w-auto sm:h-10 sm:px-3 sm:gap-2 items-center justify-center text-gray-600 hover:text-[#98635D] hover:bg-[#FAF7F2] rounded-full transition-all duration-300"
                  >
                    <FaUserCircle size={18} />
                    <span className="hidden sm:block text-xs font-medium truncate max-w-[80px]">{user.name}</span>
                  </button>

                  {/* Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/cart"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FAF7F2] hover:text-[#98635D] transition-colors"
                      >
                        <FaShoppingCart size={14} />
                        My Cart
                      </Link>
                      <Link
                        href="/my-bookings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FAF7F2] hover:text-[#98635D] transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Orders
                      </Link>
                      <Link
                        href="/wishlist"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#FAF7F2] hover:text-[#98635D] transition-colors"
                      >
                        <FaHeart size={14} />
                        Wishlist
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt size={14} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 h-10 px-4 bg-[#98635D] text-white text-xs font-semibold rounded-full hover:bg-[#7A4E49] transition-all duration-300 tracking-wider uppercase"
                >
                  <FaUser size={12} />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative w-10 h-10 hidden sm:flex items-center justify-center text-gray-600 hover:text-[#98635D] hover:bg-[#FAF7F2] rounded-full transition-all duration-300"
                aria-label="Wishlist"
              >
                <FaHeart size={16} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#98635D] hover:bg-[#FAF7F2] rounded-full transition-all duration-300"
                aria-label="Cart"
              >
                <FaShoppingCart size={17} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#98635D] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center leading-none px-1">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#98635D] hover:bg-[#FAF7F2] rounded-full transition-all duration-300"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-start justify-center pt-[12vh] transition-all duration-300 ${
          isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        />

        {/* Search Modal */}
        <div
          className={`relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
            isSearchOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex items-center border-b border-gray-100">
            <div className="pl-6">
              <FaSearch size={18} className="text-[#98635D]" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-5 text-lg text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
            <div className="pr-4 flex items-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </form>

          {/* Quick Suggestions */}
          <div className="px-6 py-4">
            <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-medium mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Sarees', 'Lehengas', 'Kurtas', 'Suits', 'Cotton'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term)
                    router.push(`/shop?search=${encodeURIComponent(term)}`)
                    setIsSearchOpen(false)
                  }}
                  className="px-4 py-2 text-sm text-gray-600 bg-[#FAF7F2] hover:bg-[#98635D] hover:text-white rounded-full transition-all duration-200"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              {user ? (
                <>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#98635D] font-medium">Welcome</p>
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                </>
              ) : (
                <>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#98635D] font-medium">Hello</p>
                  <p className="text-sm font-semibold text-gray-900">Guest User</p>
                </>
              )}
            </div>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-300"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Auth Section */}
          {!user && (
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex gap-3">
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="flex-1 bg-[#98635D] text-white text-xs font-semibold py-2.5 rounded-full text-center tracking-wider uppercase hover:bg-[#7A4E49] transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={toggleMenu}
                  className="flex-1 border border-[#98635D] text-[#98635D] text-xs font-semibold py-2.5 rounded-full text-center tracking-wider uppercase hover:bg-[#98635D] hover:text-white transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <nav className="flex-1 px-6 py-6 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className={`flex items-center gap-4 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 border-b border-gray-50 ${
                  isActive(link.href)
                    ? 'text-[#98635D]'
                    : 'text-gray-700 hover:text-[#98635D]'
                }`}
              >
                <span className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  isActive(link.href) ? 'bg-[#98635D]' : 'bg-gray-300'
                }`} />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="px-6 py-5 border-t border-gray-100 bg-[#FAF7F2]/50">
            <div className="flex items-center gap-4">
              <Link
                href="/wishlist"
                onClick={toggleMenu}
                className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-[#98635D] transition-colors"
              >
                <FaHeart size={14} />
                Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={toggleMenu}
                className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-[#98635D] transition-colors"
              >
                <FaShoppingCart size={14} />
                Cart
                {totalItems > 0 && (
                  <span className="bg-[#98635D] text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {totalItems}
                  </span>
                )}
              </Link>
              {user && (
                <Link
                  href="/my-bookings"
                  onClick={toggleMenu}
                  className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-[#98635D] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Orders
                </Link>
              )}
              {user && (
                <button
                  onClick={() => { handleLogout(); toggleMenu() }}
                  className="flex items-center gap-2.5 text-xs text-red-500 hover:text-red-600 transition-colors ml-auto"
                >
                  <FaSignOutAlt size={14} />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
