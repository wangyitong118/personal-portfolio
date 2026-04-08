'use client'

import { motion } from 'framer-motion'

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' as const }}
    >
      <div className="text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
        >
          Portfolio
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-500"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.2 }}
        >
          Loading creative experience...
        </motion.p>
        <motion.div
          className="mt-8 h-1.5 w-48 md:w-64 bg-pink-100 mx-auto rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' as const }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
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
