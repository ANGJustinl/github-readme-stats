'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-14 h-14 bg-muted border-4 border-foreground brutalist-shadow-sm" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-14 h-14 bg-card border-4 border-foreground brutalist-shadow-hover flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      <Sun className="w-6 h-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-6 h-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
