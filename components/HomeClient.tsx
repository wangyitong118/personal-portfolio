'use client'

import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './Preloader'
import Hero from './Hero'
import Skills from './Skills'
import Projects from './Projects'
import Experience from './Experience'
import CallToAction from './CallToAction'

interface HomeClientProps {
  siteConfig: any
  heroData: any
  skillsData: any[]
  projectsData: any[]
  experiencesData: any[]
  educationData: any[]
  certificationsData: any[]
  ctaData: any
  navigationData: any[]
}

export default function HomeClient({
  siteConfig,
  heroData,
  skillsData,
  projectsData,
  experiencesData,
  educationData,
  certificationsData,
  ctaData,
  navigationData,
}: HomeClientProps) {
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        if (!mounted) return
        const scroll = new LocomotiveScroll()
        scrollRef.current = scroll
        ;(window as any).__locoScroll = scroll
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
      ;(window as any).__locoScroll = null
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && (
        <div data-scroll-container>
          <Hero siteConfig={siteConfig} heroData={heroData} />
          <Skills skillsData={skillsData} />
          <Projects projectsData={projectsData} />
          <Experience 
            experiencesData={experiencesData}
            educationData={educationData}
            certificationsData={certificationsData}
          />
          <CallToAction ctaData={ctaData} />
        </div>
      )}
    </>
  )
}
