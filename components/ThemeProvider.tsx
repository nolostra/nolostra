'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only mount after client-side hydration
    // This prevents storage access errors during SSR and GitHub Pages
    if (typeof window !== 'undefined') {
      // Use requestAnimationFrame to ensure we're fully in browser context
      requestAnimationFrame(() => {
        try {
          // Test if storage is accessible (GitHub Pages might have restrictions)
          const testKey = '__theme_test__'
          localStorage.setItem(testKey, 'test')
          localStorage.removeItem(testKey)
          setMounted(true)
        } catch (e) {
          // Storage not available (e.g., private browsing, GitHub Pages restrictions)
          // Silently handle - theme will still work, just won't persist
          setMounted(true)
        }
      })
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

