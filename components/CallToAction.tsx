'use client'
import { Mail, FileText, Phone, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { siteConfig, ctaData } from '@/data/site-data'

const contactMethods = [
  {
    icon: Mail,
    title: '发送邮件',
    description: siteConfig.email,
    action: '发送邮件',
    href: `mailto:${siteConfig.email}`,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Phone,
    title: '电话联系',
    description: siteConfig.phone,
    action: '拨打电话',
    href: `tel:${siteConfig.phone}`,
    gradient: 'from-purple-500 to-fuchsia-500',
  },
  {
    icon: FileText,
    title: '查看简历',
    description: '下载我的详细简历，了解更多信息',
    action: '查看简历',
    href: '/resume',
    gradient: 'from-teal-500 to-emerald-500',
  },
]

export default function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-pink-50/50 relative overflow-hidden" data-scroll-section>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block text-sm font-medium text-pink-500 tracking-widest uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {ctaData.heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {ctaData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.title}
                className="group relative bg-white backdrop-blur-sm border border-pink-100 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${method.gradient} inline-flex mb-6 shadow-md`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {method.description}
                  </p>
                  <Link
                    href={method.href}
                    className="group/btn inline-flex items-center justify-center px-6 py-3 bg-pink-50 border border-pink-200 rounded-full text-gray-700 font-medium hover:bg-pink-100 hover:border-pink-300 transition-all duration-300"
                  >
                    {method.action}
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="pt-12 border-t border-pink-100"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 mb-12">
            {ctaData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-lg">
              目前状态：
              <span className="font-bold text-pink-500">{ctaData.status}</span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              期望职位：{ctaData.expectedPosition}
            </p>
            <p className="text-sm text-gray-400">
              工作地点：{siteConfig.location}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
