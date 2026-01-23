'use client'

import { useEffect, useState } from 'react'
import TrajectorCanvas from './TrajectorCanvas'
import ActiveSectionTracker from './ActiveSectionTracker'
import * as THREE from 'three'

export default function TrajectorController() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = scrollTop / (documentHeight - windowHeight)
      setScrollProgress(Math.min(Math.max(progress, 0), 1))

      // Determine active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'experience', 'showcase', 'contact']
      const sectionElements = sections.map(id => document.getElementById(id))
      const scrollPosition = window.scrollY + windowHeight / 2

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition(new THREE.Vector2(x, y))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <ActiveSectionTracker activeSection={activeSection} />
      <TrajectorCanvas
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        mousePosition={mousePosition}
      />
    </>
  )
}

