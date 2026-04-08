'use client'
import { ExternalLink, Globe } from 'lucide-react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { projectsData } from '@/data/site-data'

function ProjectItem({
  project,
  index,
}: {
  project: (typeof projectsData)[0]
  index: number
}) {
  return (
    <motion.div
      className="group border-b border-pink-100 last:border-0"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-scroll
      data-scroll-speed={0.05}
    >
      <div className="flex items-center justify-between py-8 px-4 cursor-pointer group-hover:px-8 transition-all duration-500">
        <div className="flex items-center gap-8">
          <span className="text-5xl md:text-7xl font-bold text-pink-100 group-hover:text-pink-200 transition-colors duration-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-pink-500 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-500 mt-2 max-w-md">{project.description}</p>
            <div className="flex gap-2 mt-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-pink-50 text-gray-500 border border-pink-100"
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
            className="p-3 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
          >
            <Globe className="h-5 w-5 text-gray-600" />
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
          >
            <ExternalLink className="h-5 w-5 text-gray-600" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-pink-50/30 relative"
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={sectionRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block text-sm font-medium text-pink-500 tracking-widest uppercase mb-4">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            项目展示
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            以下是我最近完成的一些项目，展示了我的技术能力和解决问题的能力。
          </p>
        </motion.div>

        <div>
          {projectsData.map((project, index) => (
            <ProjectItem
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-40 flex items-center justify-center"
                style={{ backgroundColor: projectsData[selectedProject].color }}
              >
                <div className="text-center text-white">
                  <div className="text-5xl font-bold mb-2">{projectsData[selectedProject].title.charAt(0)}</div>
                  <div className="text-lg">{projectsData[selectedProject].title}</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{projectsData[selectedProject].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projectsData[selectedProject].technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-pink-100 text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={projectsData[selectedProject].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-xl bg-pink-100 text-pink-700 text-center text-sm font-medium hover:bg-pink-200 transition-colors"
                  >
                    查看代码
                  </a>
                  <a
                    href={projectsData[selectedProject].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center text-sm font-medium hover:shadow-lg transition-all"
                  >
                    在线预览
                  </a>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
