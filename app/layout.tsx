import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Saish Dabholkar | Full Stack Developer & AI Engineer',
  description: 'Full Stack Developer with 3+ years of experience building scalable web and mobile applications. Specialized in backend systems, performance optimization, and AI-powered products.',
  keywords: ['Saish Dabholkar', 'Full Stack Developer', 'AI Engineer', 'React Native', 'Next.js', 'Go', 'Node.js', 'Goa', 'India'],
  authors: [{ name: 'Saish Dabholkar' }],
  openGraph: {
    title: 'Saish Dabholkar | Full Stack Developer & AI Engineer',
    description: 'Full Stack Developer with 3+ years of experience building scalable web and mobile applications',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

