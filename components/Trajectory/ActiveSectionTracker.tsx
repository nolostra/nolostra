'use client'

import { useEffect } from 'react'

export default function ActiveSectionTracker({ activeSection }: { activeSection: string }) {
  useEffect(() => {
    // Remove active class from all sections
    const sections = ['hero', 'about', 'projects', 'experience', 'showcase', 'contact']
    sections.forEach(section => {
      const element = document.getElementById(section)
      if (element) {
        element.classList.remove('active-section')
      }
    })

    // Add active class to current section
    const activeElement = document.getElementById(activeSection)
    if (activeElement) {
      activeElement.classList.add('active-section')
    }
  }, [activeSection])

  return null
}

