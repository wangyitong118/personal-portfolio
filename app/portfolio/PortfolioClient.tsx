'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, X, ArrowLeft, Filter } from 'lucide-react'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  color: string
  icon?: string
}

interface PortfolioClientProps {
  projectsData: Project[]
}

function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (project: Project) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-pink-100 dark:border-gray-700"
      onClick={() => onSelect(project)}
    >
      <div 
        className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)` }}
      >
        <div className="text-center">
          {project.icon && (
            <div className="text-6xl mb-3">{project.icon}</div>
          )}
          <div className="text-4xl font-bold text-white/90" style={{ color: project.color }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white font-medium">查看详情 →</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-pink-500 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-pink-50 dark:bg-gray-700 text-pink-600 dark:text-pink-300 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-pink-100 dark:border-gray-700">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-center text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
          >
            <GitBranch className="h-4 w-4" />
            源码
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            预览
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function PortfolioClient({ projectsData }: PortfolioClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filterTech, setFilterTech] = useState<string>('all')
  
  const allTechnologies = Array.from(new Set(projectsData.flatMap(p => p.technologies)))
  
  const filteredProjects = filterTech === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.technologies.includes(filterTech))

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>
            
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-sm font-medium text-pink-500 tracking-widest uppercase mb-4"
            >
              Complete Works
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              我的<span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">作品集</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              这里汇集了我所有的项目作品，每一个都倾注了热情与专注。
              从数据科学到AI应用，展示了我在不同领域的技术探索与实践。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="h-5 w-5 text-gray-500" />
            <button
              onClick={() => setFilterTech('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterTech === 'all' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-pink-200 dark:border-gray-700 hover:border-pink-400'
              }`}
            >
              全部 ({projectsData.length})
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilterTech(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterTech === tech 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-pink-200 dark:border-gray-700 hover:border-pink-400'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                暂无相关项目
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <motion.div
              className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="h-64 flex items-center justify-center relative"
                style={{ background: `linear-gradient(135deg, ${selectedProject.color}, ${selectedProject.color}80)` }}
              >
                {selectedProject.icon && (
                  <div className="text-8xl">{selectedProject.icon}</div>
                )}
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedProject.title}
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                    技术栈
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-pink-100 dark:bg-gray-700 text-pink-700 dark:text-pink-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-pink-100 dark:border-gray-700">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-center font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <GitBranch className="h-5 w-5" />
                    查看源代码
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    在线预览
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
