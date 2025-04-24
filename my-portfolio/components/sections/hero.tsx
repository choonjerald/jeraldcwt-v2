"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ThemeType } from "@/components/theme-selector"

interface HeroProps {
  theme: ThemeType
}

export default function Hero({ theme }: HeroProps) {
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

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-16 pb-8">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${getTextColor()}`}>
            Hi, I'm <span className={getHighlightColor()}>Jerald Choon</span>
          </h1>
          <h2 className={`text-xl md:text-2xl mb-6 ${getTextColor()} opacity-90`}>Software Developer</h2>
          <p className={`text-lg max-w-2xl mx-auto mb-8 ${getTextColor()} opacity-80`}>
          With a strong focus on public sector digitalization, I specialize in developing and enhancing software solutions for government agencies and licensing management systems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              size="lg"
              className={`${theme === "night" ? "bg-white text-gray-900" : "bg-gray-900 text-white"} hover:opacity-90`}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`${
                theme === "night" ? "border-white text-white" : "border-gray-900 text-gray-900"
              } hover:opacity-90`}
            >
              Download Resume
            </Button>
          </div>

          <div className="flex justify-center space-x-6 mb-16">
            <a
              href="https://github.com/choonjerald"
              target="_blank"
              rel="noopener noreferrer"
              className={`${getTextColor()} hover:opacity-70 transition-opacity`}
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/jeraldcwt/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${getTextColor()} hover:opacity-70 transition-opacity`}
            >
              <Linkedin size={24} />
            </a>
            {/* <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${getTextColor()} hover:opacity-70 transition-opacity`}
            >
              <Twitter size={24} />
            </a> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex justify-center"
        >
          <a
            href="#about"
            className={`animate-bounce ${getTextColor()} hover:opacity-70 transition-opacity`}
            aria-label="Scroll down to about section"
          >
            <ArrowDown size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
