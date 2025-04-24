"use client"

import { useEffect, useState } from "react"
import DaySky from "@/components/day-sky"
import NightSky from "@/components/night-sky"
import SunriseSky from "@/components/sunrise-sky"
import SunsetSky from "@/components/sunset-sky"
import type { ThemeType } from "@/components/theme-selector"
import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Contact from "@/components/sections/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [theme, setTheme] = useState<ThemeType>("day")
  const [transitioning, setTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Determine theme based on time of day
  useEffect(() => {
    setMounted(true)

    const getCurrentTheme = (): ThemeType => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 8) return "sunrise"
      if (hour >= 8 && hour < 17) return "day"
      if (hour >= 17 && hour < 20) return "sunset"
      return "night"
    }

    setTheme(getCurrentTheme())

    // Update theme every minute
    const interval = setInterval(() => {
      const newTheme = getCurrentTheme()
      if (newTheme !== theme) {
        changeTheme(newTheme)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const changeTheme = (newTheme: ThemeType) => {
    if (theme === newTheme) return

    setTransitioning(true)
    setTimeout(() => {
      setTheme(newTheme)
      setTimeout(() => {
        setTransitioning(false)
      }, 500)
    }, 300)
  }

  if (!mounted) return null

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Sky Backgrounds */}
      <div
        className={`fixed inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          theme === "day" ? "opacity-100" : "opacity-0"
        } ${transitioning ? "pointer-events-none" : ""}`}
      >
        <DaySky />
      </div>

      <div
        className={`fixed inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          theme === "night" ? "opacity-100" : "opacity-0"
        } ${transitioning ? "pointer-events-none" : ""}`}
      >
        <NightSky />
      </div>

      <div
        className={`fixed inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          theme === "sunrise" ? "opacity-100" : "opacity-0"
        } ${transitioning ? "pointer-events-none" : ""}`}
      >
        <SunriseSky />
      </div>

      <div
        className={`fixed inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          theme === "sunset" ? "opacity-100" : "opacity-0"
        } ${transitioning ? "pointer-events-none" : ""}`}
      >
        <SunsetSky />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar currentTheme={theme} onThemeChange={changeTheme} />

        <div className="container mx-auto px-4">
          <Hero theme={theme} />
          <About theme={theme} />
          <Projects theme={theme} />
          <Skills theme={theme} />
          <Contact theme={theme} />
          <Footer theme={theme} />
        </div>
      </div>
    </main>
  )
}
