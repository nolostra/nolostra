'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useEffect, useState, Component, ReactNode } from 'react'

// Check if storage is available
function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    const testKey = '__storage_test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

// Error boundary to catch any storage access errors
class ThemeErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // Silently handle storage errors
    if (error.message?.includes('storage')) {
      // Storage not available, continue without persistence
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback: render children without theme provider
      return <>{this.props.children}</>
    }
    return this.props.children
  }
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [storageAvailable, setStorageAvailable] = useState(false)

  useEffect(() => {
    // Only mount after client-side hydration
    // This prevents storage access errors during SSR and GitHub Pages
    if (typeof window !== 'undefined') {
      // Check storage availability
      const available = isStorageAvailable()
      setStorageAvailable(available)
      
      // Use setTimeout to ensure we're fully in browser context
      // This gives next-themes time to initialize properly
      const timer = setTimeout(() => {
        setMounted(true)
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  // Disable storage persistence if not available to prevent errors
  // By not setting storageKey, next-themes won't use localStorage
  const providerProps = storageAvailable 
    ? props 
    : { 
        ...props, 
        // Don't set storageKey - this disables localStorage usage
        enableSystem: true 
      }

  return (
    <ThemeErrorBoundary>
      <NextThemesProvider {...providerProps}>
        {children}
      </NextThemesProvider>
    </ThemeErrorBoundary>
  )
}

