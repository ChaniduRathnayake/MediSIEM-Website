import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function readInitialTheme(): Theme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
  document.documentElement.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f8fafc' : '#07111f')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage may be unavailable (private browsing, disabled cookies); theme just won't persist.
  }
}

/** Light/dark theme, persisted to localStorage. See index.html's blocking script for the no-flash initial read. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
