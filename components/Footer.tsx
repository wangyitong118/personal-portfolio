'use client'
import { Globe, Mail, Send, Link as LinkIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/data/site-data'

const socialLinks = [
  { name: 'GitHub', href: siteConfig.github, icon: Globe },
  { name: 'LinkedIn', href: siteConfig.linkedin, icon: LinkIcon },
  { name: 'Twitter', href: siteConfig.twitter, icon: Send },
  { name: 'Email', href: `mailto:${siteConfig.email}`, icon: Mail },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center">
          <motion.div
            className="flex items-center space-x-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Portfolio
            </span>
          </motion.div>

          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-pink-50 border border-pink-100 text-gray-400 hover:text-pink-500 hover:bg-pink-100 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              )
            })}
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {siteConfig.name}. 保留所有权利.
            </p>
            <p className="text-gray-300 text-xs mt-2">
              使用 Next.js + Framer Motion + GSAP 构建
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
