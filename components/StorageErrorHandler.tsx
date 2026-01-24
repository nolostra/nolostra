'use client'

import { useEffect } from 'react'

export default function StorageErrorHandler() {
  useEffect(() => {
    // Suppress storage access errors on GitHub Pages
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        typeof event.reason === 'object' &&
        'message' in event.reason &&
        typeof event.reason.message === 'string' &&
        event.reason.message.includes('storage')
      ) {
        event.preventDefault()
        // Silently handle - theme will work without persistence
      }
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}

