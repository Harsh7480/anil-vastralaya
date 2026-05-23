import { Poppins } from "next/font/google"
import "./globals.css"

// ✅ Use supported font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

// ── Components ────────────────────────────
import Header from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Anil Vastralaya",
  description: "One of the best clothing store",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${poppins.className}
          antialiased
          min-h-screen
          flex
          flex-col
          bg-white
        `}
      >
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}