"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { ThemeType } from "@/components/theme-selector"

interface SkillsProps {
  theme: ThemeType
}

export default function Skills({ theme }: SkillsProps) {
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

  const getProgressColor = () => {
    switch (theme) {
      case "day":
        return "bg-blue-600"
      case "night":
        return "bg-blue-400"
      case "sunrise":
        return "bg-amber-600"
      case "sunset":
        return "bg-rose-600"
      default:
        return "bg-blue-600"
    }
  }

  const getCardBg = () => {
    if (theme === "night") return "bg-gray-900/30"
    return "bg-white/30"
  }

  const frontendSkills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 60 },
    { name: "React", level: 70 },
    { name: "TypeScript", level: 70 },
    { name: "Next.js", level: 65 },
  ]

  const backendSkills = [
    { name: "MySQL", level: 90 },
    { name: "Node.js", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "Mendix", level: 70 },
  ]

  const otherSkills = [
    { name: "Git/GitHub", level: 90 },
    { name: "Docker", level: 60 },
    { name: "Mendix", level: 70 },
    { name: "Agile/Scrum", level: 80 },
  ]

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className={`${getTextColor()}`}>{name}</span>
        <span className={`${getTextColor()}`}>{level}%</span>
      </div>
      <div className="w-full bg-gray-300/30 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className={`h-2.5 rounded-full ${getProgressColor()}`}
        ></motion.div>
      </div>
    </div>
  )

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColor()}`}>
            My <span className={getHighlightColor()}>Skills</span>
          </h2>
          <div className={`h-1 w-20 mx-auto ${getHighlightColor().replace("text", "bg")}`}></div>
          <p className={`mt-4 max-w-2xl mx-auto ${getTextColor()} opacity-90`}>
            I&apos;ve worked with a variety of technologies in the web development world. Here&apos;s an overview of my technical
            skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className={`backdrop-blur-md border-none shadow-lg ${getCardBg()}`}>
              <CardContent className="p-6">
                <h3 className={`text-xl font-semibold mb-6 ${getTextColor()}`}>Frontend</h3>
                {frontendSkills.map((skill, index) => (
                  <SkillBar key={index} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className={`backdrop-blur-md border-none shadow-lg ${getCardBg()}`}>
              <CardContent className="p-6">
                <h3 className={`text-xl font-semibold mb-6 ${getTextColor()}`}>Backend</h3>
                {backendSkills.map((skill, index) => (
                  <SkillBar key={index} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className={`backdrop-blur-md border-none shadow-lg ${getCardBg()}`}>
              <CardContent className="p-6">
                <h3 className={`text-xl font-semibold mb-6 ${getTextColor()}`}>Other Skills</h3>
                {otherSkills.map((skill, index) => (
                  <SkillBar key={index} name={skill.name} level={skill.level} />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
