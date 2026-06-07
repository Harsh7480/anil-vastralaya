'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Header />}

      <main className={!isAdminRoute ? 'flex-1' : ''}>{children}</main>

      {!isAdminRoute && <Footer />}
    </>
  )
}
