import React, { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    setIsDark(storedTheme === 'dark')
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.body.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
      {isDark ? <span>🌞</span> : <span>🌙</span>}
    </button>
  )
}
