'use client'

import { useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: '首页', href: '#hero' },
  { name: '关于', href: '#skills' },
  { name: '项目', href: '#projects' },
  { name: '博客', href: '#projects' },
  { name: '简历', href: '#experience' },
  { name: '联系', href: '#contact' },
]

function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const element = document.getElementById(id)
  
  const locoScroll = (window as any).__locoScroll
  if (locoScroll && element) {
    locoScroll.scrollTo(element)
  } else if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-pink-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero') }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-pink-300/50 transition-shadow duration-300">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Portfolio
            </span>
          </a>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href) }}
                className="text-sm font-medium text-gray-600 hover:text-pink-500 transition-colors relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-pink-50 border border-pink-100 text-gray-500 hover:bg-pink-100 hover:text-pink-500 transition-all duration-300"
              aria-label="切换主题"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact') }}
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-300 cursor-pointer"
            >
              联系我
            </a>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-pink-50 border border-pink-100 text-gray-500"
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
              className="p-2 text-gray-500 hover:text-pink-500 transition-colors"
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
            className="md:hidden border-t border-pink-100 bg-white/95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); setMobileMenuOpen(false) }}
                  className="block py-3 text-base font-medium text-gray-600 hover:text-pink-500 hover:bg-pink-50 px-4 rounded-xl transition-all cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); setMobileMenuOpen(false) }}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium cursor-pointer"
                >
                  联系我
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
