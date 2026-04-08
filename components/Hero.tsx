'use client'
import Link from 'next/link'
import { ArrowRight, Brain, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { siteConfig, heroData } from '@/data/site-data'
import ParticleBackground from './ParticleBackground'

export default function Hero() {
  const firstText = useRef(null)
  const secondText = useRef(null)
  const slider = useRef(null)
  const rafId = useRef<number>(0)

  const animate = useCallback(() => {
    let xPercent = 0
    let direction = -1

    const tick = () => {
      if (xPercent < -100) {
        xPercent = 0
      } else if (xPercent > 0) {
        xPercent = -100
      }
      if (firstText.current) gsap.set(firstText.current, { xPercent })
      if (secondText.current) gsap.set(secondText.current, { xPercent })
      xPercent += 0.05 * direction
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    animate()
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = 0
      }
    }
  }, [animate])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const
      }
    }
  }

  const descParts = heroData.description.split(/\*\*(.*?)\*\*/g)

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <ParticleBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            variants={itemVariants}
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">
              {heroData.badge}
            </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8"
            variants={itemVariants}
          >
            <span className="block">{heroData.greeting}</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {descParts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-white">{part}</strong>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            variants={itemVariants}
          >
            <Link
              href="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold text-lg inline-flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              <span className="relative z-10">查看我的项目</span>
              <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/contact"
              className="group px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold text-lg inline-flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
            >
              <span>联系我</span>
            </Link>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {heroData.stats.map((item, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="mb-4 flex justify-center">
                  <Brain className="h-10 w-10 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="text-sm text-gray-300">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute bottom-10 left-0 right-0 overflow-hidden pointer-events-none">
        <div ref={slider} className="flex whitespace-nowrap">
          <p ref={firstText} className="text-6xl font-bold text-white/10 px-8">
            {heroData.scrollText}
          </p>
          <p ref={secondText} className="text-6xl font-bold text-white/10 px-8">
            {heroData.scrollText}
          </p>
        </div>
      </div>
    </section>
  )
}