"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { ThemeType } from "@/components/theme-selector"

interface AboutProps {
  theme: ThemeType
}

export default function About({ theme }: AboutProps) {
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

  const getCardBg = () => {
    if (theme === "night") return "bg-gray-900/30"
    return "bg-white/30"
  }

  return (
    <section id="about" className="py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColor()}`}>
            About <span className={getHighlightColor()}>Me</span>
          </h2>
          <div className={`h-1 w-20 mx-auto ${getHighlightColor().replace("text", "bg")}`}></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className={`backdrop-blur-md border-none shadow-lg ${getCardBg()}`}>
              <CardContent className="p-6">
                <h3 className={`text-xl font-semibold mb-4 ${getTextColor()}`}>My Story</h3>
                <p className={`${getTextColor()} opacity-90 mb-4`}>
                  I'm a passionate software developer with over 3 years of experience creating web applications and providing solutions. 
                  My journey began with a curiosity about how websites work, which led me to pursue a degree in Computer
                  Science.
                </p>
                <p className={`${getTextColor()} opacity-90`}>
                  I emphasize on compliance, efficiency, and user-centric designs to support public service operations and regulatory processes.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className={`backdrop-blur-md border-none shadow-lg ${getCardBg()}`}>
              <CardContent className="p-6">
                <h3 className={`text-xl font-semibold mb-4 ${getTextColor()}`}>Education & Experience</h3>

                <div className="mb-4">
                  <h4 className={`font-medium ${getHighlightColor()}`}>Software Developer</h4>
                  <p className={`${getTextColor()} opacity-90`}>CrimsonLogic Pte Ltd • 2023 - Present</p>
                </div>

                <div className="mb-4">
                  <h4 className={`font-medium ${getHighlightColor()}`}>Software Developer</h4>
                  <p className={`${getTextColor()} opacity-90`}>Volt • 2022 - 2023</p>
                </div>

                <div className="mb-4">
                  <h4 className={`font-medium ${getHighlightColor()}`}>BSc in Computer Science (First Class Honors)</h4>
                  <p className={`${getTextColor()} opacity-90`}>University College Dublin • 2017 - 2022</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
