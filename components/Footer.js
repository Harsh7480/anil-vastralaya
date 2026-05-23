import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope 
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#FFF8E7] text-gray-700">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Column 1 - Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {/* Logo – no text beside it */}
              <img 
                src="/images/Anil Vastralaya.png" 
                alt="Anil Vastralaya Logo" 
                className="h-30 w-auto object-contain"
              />
            </div>
            
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Premium ethnic wear & modern fashion for every occasion. 
              Quality you trust, style you love.
            </p>

            {/* Social Icons */}
            <div className="flex gap-5">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Sarees</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Lehengas</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Kurtas & Sets</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Men's Collection</a></li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-xl text-gray-600 mt-1" />
                <span>Main Market, Chandni Chowk<br />Delhi - 110006</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-lg text-gray-600" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-lg text-gray-600" />
                <span>contact@anilvastralaya.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Anil Vastralaya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}