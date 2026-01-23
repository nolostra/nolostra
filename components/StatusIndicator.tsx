'use client'

import { motion } from 'framer-motion'

export default function StatusIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-text-secondary">
      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-2 h-2 rounded-full bg-accent"
      />
      <span>Available at Trajector</span>
    </div>
  )
}

