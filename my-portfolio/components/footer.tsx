"use client"

import { Heart } from "lucide-react"
import type { ThemeType } from "@/components/theme-selector"

interface FooterProps {
  theme: ThemeType
}

export default function Footer({ theme }: FooterProps) {
  const getTextColor = () => {
    if (theme === "night") return "text-white"
    return "text-gray-800"
  }

  const getHighlightColor = () => {
    switch (theme) {
      case "day":
        return "text-blue-600"
      case "night":
        return "text-blue-400"
      case "sunrise":
        return "text-amber-600"
      case "sunset":
        return "text-rose-600"
      default:
        return "text-blue-600"
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className={`text-center ${getTextColor()} opacity-90 flex items-center gap-1`}>
            Made with <Heart className={`${getHighlightColor()}`} size={16} /> by Jerald Choon
          </p>
          <p className={`text-center mt-2 ${getTextColor()} opacity-70`}>&copy; {currentYear} All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
