'use client'

import { motion } from 'framer-motion'

export default function StatusIndicator() {
  const messages = [
    'Available for new projects',
    'Open to work',
    'Building something new? Let\'s talk',
    'Open to opportunities',
  ]
  
  const scrollingText = messages.join(' • ') + ' • '
  
  return (
    <div className="relative overflow-hidden w-full max-w-md mx-auto">
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0"
        />
        
        <div className="overflow-hidden flex-1">
          <motion.div
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex whitespace-nowrap"
            style={{ width: '200%' }}
          >
            <span className="text-sm text-text-secondary inline-block">
              {scrollingText}
            </span>
            <span className="text-sm text-text-secondary inline-block">
              {scrollingText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
