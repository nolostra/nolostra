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
        className="text-base text-text-secondary italic mb-8 leading-relaxed"
      >
        {children}
      </motion.p>
    </ScrollReveal>
  )
}

