'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface MarginNoteProps {
  children: React.ReactNode
  position?: 'left' | 'right'
  delay?: number
}

export default function MarginNote({ children, position = 'right', delay = 0 }: MarginNoteProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const variants = {
    hidden: {
      opacity: 0,
      x: position === 'right' ? 20 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`absolute top-0 ${position === 'right' ? 'right-0' : 'left-0'} w-48 hidden lg:block`}
      style={{ marginTop: '2rem' }}
    >
      <p className="text-xs text-text-secondary leading-relaxed italic">
        {children}
      </p>
    </motion.div>
  )
}

