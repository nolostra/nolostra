'use client'

import { motion } from 'framer-motion'

export default function StatusIndicator() {
  // Show only essential messages for cleaner look
  const messages = [
    'Open to work',
    'Available for new projects',
  ]
  
  const scrollingText = messages.join(' • ') + ' • '
  
  return (
    <div className="relative overflow-hidden w-full max-w-[240px] sm:max-w-md mx-auto">
      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
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
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-500 flex-shrink-0"
        />
        
        <div className="overflow-hidden flex-1 min-w-0" style={{ maxWidth: 'calc(100% - 16px)' }}>
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
            style={{ width: '200%', willChange: 'transform' }}
          >
            <span className="text-xs sm:text-xs lg:text-sm text-text-secondary inline-block pr-6 sm:pr-8">
              {scrollingText}
            </span>
            <span className="text-xs sm:text-xs lg:text-sm text-text-secondary inline-block pr-6 sm:pr-8">
              {scrollingText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
