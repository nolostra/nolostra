/**
 * Smooth scroll to an element by ID
 */
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Format date range
 */
export function formatDateRange(start: string, end: string | null) {
  if (!end) return `${start} - Present`
  return `${start} - ${end}`
}

