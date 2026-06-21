'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/utils/api'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

function ProductImage({ src, alt, className = '' }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg className="w-20 h-20 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-contain ${className}`}
      onError={() => setHasError(true)}
      priority
    />
  )
}

export default function ProductDetailPage({ params }) {
  const { slug } = params
  const router = useRouter()
  const toast = useToast()
  const { addItem } = useCart()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)

  // Booking states
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [advancePercent, setAdvancePercent] = useState(10)
  const [bookingPhone, setBookingPhone] = useState('')
  const [bookingSubmitting, setBookingSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingCode, setBookingCode] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchAPI(`/products/${slug}`)
        setProduct(data)
      } catch (err) {
        console.error('Failed to load product:', err)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [slug])

  const handleAddToCart = () => {
    if (!user) {
      router.push('/login')
      return
    }
    if (!product) return
    if (product.sizes && !selectedSize) {
      toast.warning('Please select a size before adding to cart')
      return
    }
    addItem(product, quantity, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBookNow = () => {
    if (!user) {
      router.push('/login')
      return
    }
    if (product.sizes && !selectedSize) {
      toast.warning('Please select a size before booking')
      return
    }
    setShowBookingModal(true)
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    if (!bookingPhone || !user) return

    setBookingSubmitting(true)
    try {
      const result = await fetchAPI('/orders/book', {
        method: 'POST',
        body: JSON.stringify({
          customerName: user.name,
          email: user.email,
          phone: bookingPhone,
          items: [{ productId: product.id, quantity, size: selectedSize || null }],
          advancePercentage: advancePercent,
        }),
      })
      setBookingCode(result.bookingCode)
      setBookingSuccess(true)
    } catch (err) {
      console.error('Booking failed:', err)
    } finally {
      setBookingSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#98635D]"></div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-serif text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#98635D] text-white text-sm tracking-wider uppercase rounded-full hover:bg-[#7A4E49] transition-colors duration-300"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const allImages = [product.image]
  if (product.images) {
    try {
      const parsed = JSON.parse(product.images)
      if (Array.isArray(parsed)) {
        allImages.push(...parsed)
      }
    } catch {}
  }

  const totalPrice = product.price * quantity
  const advanceAmount = Math.ceil((totalPrice * advancePercent) / 100)
  const remainingAmount = totalPrice - advanceAmount

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#FAF7F2] py-4">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-gray-500 tracking-wider">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gray-900 transition-colors">Shop</Link>
            <span>/</span>
            {product.category && (
              <>
                <Link href={`/shop?category=${product.category.slug}`} className="hover:text-gray-900 transition-colors">
                  {product.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Images */}
            <div>
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#EDE5DB] via-[#F5F0EA] to-[#D9CFC3] rounded-2xl overflow-hidden mb-4">
                <ProductImage src={allImages[selectedImage]} alt={product.name} />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-[#98635D] to-[#B8826D] text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-lg">
                    {product.tag}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    -{discount}% OFF
                  </span>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index
                          ? 'border-[#98635D] shadow-lg'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="relative w-full h-full bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3]">
                        <ProductImage src={img} alt={`${product.name} ${index + 1}`} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              {product.category && (
                <Link
                  href={`/shop?category=${product.category.slug}`}
                  className="text-xs text-[#98635D] font-medium tracking-[0.2em] uppercase mb-3 hover:text-[#7A4E49] transition-colors"
                >
                  {product.category.name}
                </Link>
              )}

              <h1 className="text-2xl lg:text-3xl font-serif text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-400">(5.0)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <div className="w-full h-[1px] bg-gray-100 mb-6" />

              {product.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 tracking-wider uppercase">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-4 mb-6">
                {product.subcategory && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-[#98635D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>{product.subcategory}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className={product.inStock ? 'text-emerald-600' : 'text-red-500'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 tracking-wider uppercase">Select Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.split(',').map((size) => {
                      const trimmed = size.trim()
                      return (
                        <button
                          key={trimmed}
                          type="button"
                          onClick={() => setSelectedSize(trimmed)}
                          className={`min-w-[48px] h-10 px-4 rounded-lg text-sm font-semibold border-2 transition-all duration-300 ${
                            selectedSize === trimmed
                              ? 'bg-[#98635D] text-white border-[#98635D] shadow-lg'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-[#98635D]'
                          }`}
                        >
                          {trimmed}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              {product.inStock && (
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 text-sm font-semibold py-3.5 px-8 rounded-full tracking-wider uppercase transition-all duration-500 shadow-lg hover:shadow-xl ${
                      added
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#98635D] text-white hover:bg-[#7A4E49]'
                    }`}
                  >
                    {added ? '✓ Added to Cart' : user ? 'Add to Cart' : 'Sign In to Add'}
                  </button>
                </div>
              )}

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="w-full mt-4 border-2 border-[#98635D] text-[#98635D] text-sm font-semibold py-3.5 px-8 rounded-full tracking-wider uppercase hover:bg-[#98635D] hover:text-white transition-all duration-500"
              >
                {user ? 'Book Now — Pay Advance' : 'Sign In to Book'}
              </button>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BOOKING MODAL ==================== */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-5 border-b border-gray-100 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#98635D] font-medium">Reserve Your Product</p>
                  <h3 className="text-lg font-serif text-gray-900">Book Now</h3>
                </div>
                <button
                  onClick={() => { setShowBookingModal(false); setBookingSuccess(false); setBookingCode('') }}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="px-6 py-12 text-center">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-serif text-gray-900 mb-2">Booking Confirmed!</h4>
                <p className="text-sm text-gray-500 mb-4">Your product has been reserved successfully.</p>

                <div className="bg-[#FAF7F2] rounded-xl p-4 mb-6">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#98635D] font-medium mb-1">Your Booking Code</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-wider">{bookingCode}</p>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <p>Show this code at the shop when you visit to collect your product.</p>
                  <p>Pay the remaining <span className="font-semibold text-[#98635D]">₹{remainingAmount.toLocaleString()}</span> at the shop.</p>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/my-bookings"
                    onClick={() => { setShowBookingModal(false); setBookingSuccess(false) }}
                    className="flex-1 bg-[#98635D] text-white text-xs font-semibold py-3 rounded-full tracking-wider uppercase text-center hover:bg-[#7A4E49] transition-all duration-300"
                  >
                    View My Bookings
                  </Link>
                  <button
                    onClick={() => { setShowBookingModal(false); setBookingSuccess(false); setBookingCode('') }}
                    className="flex-1 border border-[#98635D] text-[#98635D] text-xs font-semibold py-3 rounded-full tracking-wider uppercase hover:bg-[#98635D] hover:text-white transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="px-6 py-6">
                {/* Product Summary */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-[#FAF7F2] rounded-xl">
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#EDE5DB] to-[#D9CFC3] rounded-xl overflow-hidden shrink-0">
                    {product.image && (
                      <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {quantity}{selectedSize ? ` | Size: ${selectedSize}` : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                {/* Advance Percentage Selection */}
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-600 mb-3 tracking-wider uppercase">
                    Select Advance Payment %
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 20, 30, 50].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setAdvancePercent(pct)}
                        className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-2 ${
                          advancePercent === pct
                            ? 'bg-[#98635D] text-white border-[#98635D] shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#98635D]'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Amount</span>
                    <span className="font-medium text-gray-900">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pay Now ({advancePercent}%)</span>
                    <span className="font-bold text-[#98635D]">₹{advanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-[1px] bg-gray-200" />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pay at Shop (Remaining)</span>
                    <span className="font-bold text-gray-900">₹{remainingAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* How it works */}
                <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="text-xs font-semibold text-amber-800 mb-2 tracking-wider uppercase">How it works</p>
                  <ol className="text-xs text-amber-700 space-y-1.5 list-decimal list-inside">
                    <li>Pay the advance amount online to reserve your product</li>
                    <li>Receive a unique booking code after payment</li>
                    <li>Visit our shop with the booking code</li>
                    <li>Pay the remaining amount and collect your product</li>
                  </ol>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-600 mb-2 tracking-wider uppercase">Phone Number</label>
                  <input
                    type="tel"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#98635D] transition-colors"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={bookingSubmitting || !bookingPhone}
                  className="w-full bg-[#98635D] text-white text-sm font-semibold py-4 rounded-full tracking-wider uppercase hover:bg-[#7A4E49] transition-all duration-500 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {bookingSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ₹{advanceAmount.toLocaleString()} & Book Now
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-gray-400 mt-4">
                  By booking, you agree to collect the product from our shop and pay the remaining balance there.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
