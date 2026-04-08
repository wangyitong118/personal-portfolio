'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './Preloader'
import Hero from './Hero'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import CallToAction from './CallToAction'

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        if (!mounted) return
        scrollRef.current = new LocomotiveScroll()
      } catch (e) {
        console.warn('LocomotiveScroll init failed, using native scroll:', e)
      }

      if (!mounted) return

      setTimeout(() => {
        if (mounted) {
          setIsLoading(false)
          document.body.style.cursor = 'default'
        }
      }, 2000)
    }

    init()

    return () => {
      mounted = false
      if (scrollRef.current) {
        scrollRef.current.destroy()
        scrollRef.current = null
      }
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && (
        <div data-scroll-container>
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <CallToAction />
        </div>
      )}
    </>
  )
}