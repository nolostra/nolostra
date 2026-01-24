'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only mount after client-side hydration
    // This prevents storage access errors during SSR
    if (typeof window !== 'undefined') {
      try {
        // Test if storage is accessible
        localStorage.getItem('test')
        setMounted(true)
      } catch (e) {
        // Storage not available, but still mount (theme won't persist)
        console.warn('Storage not available, theme preferences will not persist')
        setMounted(true)
      }
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

