'use client'

import { motion } from 'framer-motion'

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' as const }}
    >
      <div className="text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
        >
          Portfolio
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.2 }}
        >
          Loading creative experience...
        </motion.p>
        <motion.div
          className="mt-8 h-1 w-48 md:w-64 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' as const }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut' as const,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}