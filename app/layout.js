import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import LayoutWrapper from './LayoutWrapper'
import { AuthProvider } from '@/context/AuthContext'
import { ToastProvider } from '@/context/ToastContext'
import { CartProvider } from '@/context/CartContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Anil Vastralaya',
  description: 'One of the best clothing store',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.className}
          ${playfair.className}
          antialiased
          min-h-screen
          flex
          flex-col
          bg-white
        `}
      >
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
