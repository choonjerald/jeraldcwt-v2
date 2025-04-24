"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeSelector, { type ThemeType } from "@/components/theme-selector"
import { useMediaQuery } from "@/hooks/use-media-query"

interface NavbarProps {
  currentTheme: ThemeType
  onThemeChange: (theme: ThemeType) => void
}

export default function Navbar({ currentTheme, onThemeChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getTextColor = () => {
    if (currentTheme === "night") return "text-white"
    return "text-gray-800"
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/10 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#home" className={`text-xl font-bold ${getTextColor()}`}>
              Dev.Portfolio
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`${getTextColor()} hover:text-opacity-70 transition-colors duration-200`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className={getTextColor()} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <div className="overflow-hidden">
            <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ul className="py-2 space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`block px-4 py-2 ${getTextColor()} hover:bg-white/10 rounded-md`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          </div>
        )}
      </div>
    </header>
  )
}
