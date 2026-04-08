'use client'
import { ExternalLink, Globe } from 'lucide-react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { projectsData } from '@/data/site-data'

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
}

function ProjectItem({
  project,
  index,
  manageModal,
}: {
  project: (typeof projectsData)[0]
  index: number
  manageModal: (active: boolean, index: number, x: number, y: number) => void
}) {
  return (
    <motion.div
      className="group border-b border-white/10 last:border-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
      onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
      data-scroll
      data-scroll-speed={0.05}
    >
      <div className="flex items-center justify-between py-8 px-4 cursor-pointer group-hover:px-8 transition-all duration-500">
        <div className="flex items-center gap-8">
          <span className="text-5xl md:text-7xl font-bold text-white/10 group-hover:text-white/30 transition-colors duration-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-500 mt-2 max-w-md">{project.description}</p>
            <div className="flex gap-2 mt-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            <Globe className="h-5 w-5 text-white" />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="h-5 w-5 text-white" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 })
  const modalContainer = useRef(null)
  const cursor = useRef(null)
  const cursorLabel = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  let xMoveContainer = useRef<((x: number) => void) | null>(null)
  let yMoveContainer = useRef<((y: number) => void) | null>(null)
  let xMoveCursor = useRef<((x: number) => void) | null>(null)
  let yMoveCursor = useRef<((y: number) => void) | null>(null)
  let xMoveCursorLabel = useRef<((x: number) => void) | null>(null)
  let yMoveCursorLabel = useRef<((y: number) => void) | null>(null)

  useEffect(() => {
    if (!modalContainer.current) return
    xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.8,
      ease: 'power3',
    })
    yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.8,
      ease: 'power3',
    })
    xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
      duration: 0.5,
      ease: 'power3',
    })
    yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
      duration: 0.5,
      ease: 'power3',
    })
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
      duration: 0.45,
      ease: 'power3',
    })
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
      duration: 0.45,
      ease: 'power3',
    })
  }, [])

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x)
    yMoveContainer.current?.(y)
    xMoveCursor.current?.(x)
    yMoveCursor.current?.(y)
    xMoveCursorLabel.current?.(x)
    yMoveCursorLabel.current?.(y)
  }

  const manageModal = (active: boolean, index: number, x: number, y: number) => {
    moveItems(x, y)
    setModal({ active, index })
  }

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950 relative"
      data-scroll-section
      onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={sectionRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block text-sm font-medium text-cyan-400 tracking-widest uppercase mb-4">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            项目展示
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            以下是我最近完成的一些项目，展示了我的技术能力和解决问题的能力。
          </p>
        </motion.div>

        <div>
          {projectsData.map((project, index) => (
            <ProjectItem
              key={project.title}
              project={project}
              index={index}
              manageModal={manageModal}
            />
          ))}
        </div>
      </div>

      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? 'enter' : 'closed'}
        className="fixed top-1/2 left-1/2 w-[240px] h-[170px] md:w-[320px] md:h-[220px] pointer-events-none z-40 overflow-hidden rounded-xl"
      >
        <div
          className="absolute w-full h-full transition-transform duration-500 ease-in-out"
          style={{ top: `${modal.index * -100}%` }}
        >
          {projectsData.map((project, index) => (
            <div
              key={`modal_${index}`}
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-3">{project.title.charAt(0)}</div>
                <div className="text-sm font-medium">{project.title}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className="fixed top-1/2 left-1/2 w-[80px] h-[80px] rounded-full border-2 border-white/30 pointer-events-none z-40 mix-blend-difference"
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? 'enter' : 'closed'}
      />
      <motion.div
        ref={cursorLabel}
        className="fixed top-1/2 left-1/2 text-white text-sm font-medium pointer-events-none z-40 mix-blend-difference"
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? 'enter' : 'closed'}
      >
        View
      </motion.div>
    </section>
  )
}