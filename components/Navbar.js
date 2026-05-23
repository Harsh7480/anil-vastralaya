// components/layout/Header.jsx

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaSearch, 
  FaHeart, 
  FaShoppingCart, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-[#FFF8E7] shadow-sm sticky top-0 z-50">
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Anil Vastralaya.png"
              alt="Anil Vastralaya"
              width={220}
              height={80}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-black font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-black font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/shop" 
              className="text-gray-700 hover:text-black font-medium transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/Gallery" 
              className="text-gray-700 hover:text-black font-medium transition-colors"
            >
              Gallery
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-black font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Icons – Desktop & Mobile */}
          <div className="flex items-center gap-5 md:gap-7">
            <button 
              aria-label="Search"
              className="text-gray-700 hover:text-black transition-colors"
            >
              <FaSearch size={20} />
            </button>
            
            <Link 
              href="/wishlist" 
              className="text-gray-700 hover:text-black transition-colors"
              aria-label="Wishlist"
            >
              <FaHeart size={20} />
            </Link>
            
            <Link 
              href="/cart" 
              className="text-gray-700 hover:text-black transition-colors relative"
              aria-label="Cart"
            >
              <FaShoppingCart size={22} />
              {/* Example badge – later connect to real cart count */}
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Hamburger button – only on mobile */}
            <button 
              className="md:hidden text-gray-700 hover:text-black"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Sidebar / Full overlay) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={toggleMenu}>
          <div 
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close button */}
            <button 
              className="self-end mb-8 text-gray-700"
              onClick={toggleMenu}
            >
              <FaTimes size={28} />
            </button>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link href="/shop" onClick={toggleMenu}>Shop</Link>
              <Link href="/new-arrivals" onClick={toggleMenu}>New Arrivals</Link>
              <Link href="/about" onClick={toggleMenu}>About</Link>
              <Link href="/contact" onClick={toggleMenu}>Contact</Link>
            </nav>

            {/* Extra mobile actions */}
            <div className="mt-auto flex flex-col gap-6 pt-10 border-t">
              <Link href="/search" className="flex items-center gap-3" onClick={toggleMenu}>
                <FaSearch /> Search
              </Link>
              <Link href="/wishlist" className="flex items-center gap-3" onClick={toggleMenu}>
                <FaHeart /> Wishlist
              </Link>
              <Link href="/cart" className="flex items-center gap-3" onClick={toggleMenu}>
                <FaShoppingCart /> Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}