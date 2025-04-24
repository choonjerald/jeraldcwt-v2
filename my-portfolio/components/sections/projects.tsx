"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ThemeType } from "@/components/theme-selector"

interface ProjectsProps {
  theme: ThemeType
}

export default function Projects({ theme }: ProjectsProps) {
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

  const getBadgeVariant = () => {
    if (theme === "night") return "secondary"
    return "default"
  }

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
      image: "/e-commerce-project-cover.png",
      technologies: ["Java", "Javascript", "HTML", "CSS", "Stripe"],
      liveUrl: "",
      githubUrl: "https://github.com/choonjerald/e-commerce",
    },
    {
      title: "goBusiness Licensing",
      description:
        "GoBusiness Licensing is a business licensing portal that aims to deliver a more user-friendly and efficient licensing experience for businesses.",
      image: "/gb-logo.svg?height=300&width=500",
      technologies: ["SpringBoot", "Java", "MySQL"],
      liveUrl: "https://licence1.business.gov.sg/licence1/authentication/mainLogin.action",
    },
    ,
    {
      title: "Comic-maker",
      description:
        "PureEdgeSim: A simulation toolkit for performance evaluation of Edge and Mist computing environments",
      image: "/comic-maker.png",
      technologies: ["Java", "CSS"],
      githubUrl: "https://github.com/jsn-t/comic-maker",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColor()}`}>
            My <span className={getHighlightColor()}>Projects</span>
          </h2>
          <div className={`h-1 w-20 mx-auto ${getHighlightColor().replace("text", "bg")}`}></div>
          <p className={`mt-4 max-w-2xl mx-auto ${getTextColor()} opacity-90`}>
            Here are some of my recent projects that I have worked on. Each one was built to solve a specific problem or explore new
            technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card
                className={`overflow-hidden backdrop-blur-md border-none shadow-lg ${getCardBg()} h-full flex flex-col`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className={`text-xl font-semibold mb-2 ${getTextColor()}`}>{project.title}</h3>
                  <p className={`${getTextColor()} opacity-90 mb-4 flex-grow`}>{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant={getBadgeVariant()}>
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between mt-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 ${getHighlightColor()} hover:opacity-80 transition-opacity`}
                      >
                        <ExternalLink size={16} />
                        <span>Website</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 ${getHighlightColor()} hover:opacity-80 transition-opacity`}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
