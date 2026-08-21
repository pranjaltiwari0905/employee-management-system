import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'light') {
            document.documentElement.classList.add('light')
            setIsLight(true)
        }
    }, [])

    const toggleTheme = () => {
        const newIsLight = !isLight
        setIsLight(newIsLight)
        if (newIsLight) {
            document.documentElement.classList.add('light')
            localStorage.setItem('theme', 'light')
        } else {
            document.documentElement.classList.remove('light')
            localStorage.setItem('theme', 'dark')
        }
    }

    return (
        <button onClick={toggleTheme} className='text-xs py-1.5 px-3 rounded border border-gray-400 hover:bg-gray-700'>
            {isLight ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    )
}

export default ThemeToggle