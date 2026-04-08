'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig, navigationData } from '@/data/site-data'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-shadow duration-300">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Portfolio
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigationData.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <Link
              href="/contact"
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            >
              联系我
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button
              type="button"
              className="p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">打开菜单</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navigationData.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 px-4 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  联系我
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}