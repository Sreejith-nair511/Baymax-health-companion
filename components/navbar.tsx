"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/theme-context"
import { Moon, Sun } from "lucide-react"
import { usePremium } from "@/contexts/premium-context"
import { useRouter } from "next/navigation"
import ThemeSelector from "@/components/theme-selector"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme: moodTheme, setTheme: setMoodTheme } = useTheme()
  const { user, logout } = usePremium()
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Update the navLinks array to remove the Theme Test page
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Chatbot", href: "/chatbot" },
    { name: "Health Check", href: "/health-check" },
    { name: "TTS/STT", href: "/tts-stt" },
    { name: "Premium", href: "/premium" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="tadashi-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-tadashi-darkBlue dark:text-tadashi-blue">Tadashi AI</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-tadashi-darkBlue dark:hover:text-tadashi-blue transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center ml-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:inline">
                    Hi, {user.name}
                  </span>
                  {user.isPremium && (
                    <span className="bg-tadashi-blue text-white text-xs px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:bg-tadashi-lightBlue dark:hover:bg-gray-700"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-tadashi-lightBlue dark:hover:bg-gray-700">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="tadashi-button text-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <ThemeSelector />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="ml-2"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ThemeSelector />

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="ml-2"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label={isOpen ? "Close menu" : "Open menu"}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white dark:bg-gray-800 shadow-lg rounded-b-2xl`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-tadashi-darkBlue dark:hover:text-tadashi-blue hover:bg-tadashi-lightBlue dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 text-gray-700 dark:text-gray-300">
                  Hi, {user.name}
                  {user.isPremium && (
                    <span className="ml-2 bg-tadashi-blue text-white text-xs px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-tadashi-darkBlue dark:hover:text-tadashi-blue hover:bg-tadashi-lightBlue dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-tadashi-darkBlue dark:hover:text-tadashi-blue hover:bg-tadashi-lightBlue dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-tadashi-darkBlue dark:hover:text-tadashi-blue hover:bg-tadashi-lightBlue dark:hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar