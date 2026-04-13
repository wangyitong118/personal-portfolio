'use client'
import { Briefcase, Calendar, MapPin, Award, GraduationCap } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
interface ExperienceProps {
  experiencesData: any[]
  educationData: any[]
  certificationsData: any[]
}

function TimelineItem({
  item,
  index,
  type,
}: {
  item: any
  index: number
  type: 'work' | 'edu'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isWork = type === 'work'

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-pink-200 to-transparent" />
      <motion.div
        className={`absolute -left-[5px] top-1 w-[10px] h-[10px] rounded-full bg-gradient-to-r ${isWork ? item.color : 'from-teal-400 to-emerald-400'}`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.15, type: 'spring' }}
      />

      <div className="bg-white border border-pink-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h4 className="text-xl font-bold text-gray-900">
            {item.position || item.degree}
          </h4>
        </div>
        <p className={`text-lg font-medium bg-gradient-to-r ${isWork ? item.color : 'from-teal-400 to-emerald-400'} bg-clip-text text-transparent mb-3`}>
          {item.company || item.school}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {item.period}
          </div>
          {item.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {item.location}
            </div>
          )}
        </div>

        <p className="text-gray-500 mb-4">{item.description}</p>

        <ul className="space-y-2">
          {item.achievements.map((achievement: string, idx: number) => (
            <motion.li
              key={idx}
              className="flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
            >
              <Award className="h-5 w-5 text-pink-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-500">{achievement}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience({ experiencesData, educationData, certificationsData }: ExperienceProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-pink-50/30" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={sectionRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block text-sm font-medium text-pink-500 tracking-widest uppercase mb-4">
            Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            工作经历与教育背景
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            我的职业发展路径和学习经历，展示了我的成长和专业能力的积累。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div
              className="flex items-center mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 mr-4 shadow-md">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">工作经历</h3>
            </motion.div>

            <div>
              {experiencesData.map((exp, index) => (
                <TimelineItem key={index} item={exp} index={index} type="work" />
              ))}
            </div>
          </div>

          <div>
            <motion.div
              className="flex items-center mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 mr-4 shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">教育背景</h3>
            </motion.div>

            <div>
              {educationData.map((edu, index) => (
                <TimelineItem key={index} item={edu} index={index} type="edu" />
              ))}
            </div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 mr-4 shadow-md">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">技能证书</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificationsData.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    className="bg-white border border-pink-100 rounded-xl p-4 hover:shadow-md hover:shadow-pink-100/30 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <h4 className="font-bold text-gray-900 mb-1">{cert.name}</h4>
                    <p className="text-sm text-gray-500">{cert.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
