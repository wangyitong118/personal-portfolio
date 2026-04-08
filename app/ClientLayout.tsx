'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}