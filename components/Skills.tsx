'use client'
import { Database, Brain, Code, Users } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
interface SkillsProps {
  skillsData: any[]
}

const skillIcons = [Database, Brain, Code, Users]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

interface Skill {
  name: string
  description: string
  level: number
  gradient: string
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = skillIcons[index % skillIcons.length]

  return (
    <motion.div
      ref={ref}
      className="group relative bg-white backdrop-blur-sm border border-pink-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-500 overflow-hidden"
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-5">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${skill.gradient} shadow-md`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            {skill.name}
          </h3>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          {skill.description}
        </p>
        
        <div className="mt-3">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
            <span>熟练度</span>
            <span className="text-gray-700 font-medium">{skill.level}%</span>
          </div>
          <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 + index * 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills({ skillsData }: SkillsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-block text-xs font-medium text-pink-500 tracking-widest uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What I Do
          </motion.span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            核心技能
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            专注于数据科学与人工智能领域，具备从数据处理到模型部署的完整能力链。
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-sm text-gray-500">
            持续深耕数据科学与AI领域，保持对前沿技术的敏感度。
          </p>
          <p className="text-sm mt-2">
            目前正在探索：
            <span className="font-medium bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {' '}大语言模型 • 多模态AI • MLOps
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
