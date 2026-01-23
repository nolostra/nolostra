'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface PrincipleProps {
  children: React.ReactNode
  delay?: number
}

export default function Principle({ children, delay = 0 }: PrincipleProps) {
  return (
    <ScrollReveal delay={delay}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
        className="text-xs sm:text-sm lg:text-base text-text-secondary italic mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-center"
      >
        {children}
      </motion.p>
    </ScrollReveal>
  )
}

