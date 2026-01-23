'use client'

import { motion } from 'framer-motion'

export default function StatusIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <motion.div
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-2.5 h-2.5 rounded-full bg-green-500"
      />
      <span className="text-text-secondary">
        <span className="text-accent font-medium">Available</span> for new projects
      </span>
    </div>
  )
}

