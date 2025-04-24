"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import type { ThemeType } from "@/components/theme-selector"

interface ContactProps {
  theme: ThemeType
}

export default function Contact({ theme }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

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

  const getButtonBg = () => {
    switch (theme) {
      case "day":
        return "bg-blue-600 hover:bg-blue-700"
      case "night":
        return "bg-blue-500 hover:bg-blue-600"
      case "sunrise":
        return "bg-amber-600 hover:bg-amber-700"
      case "sunset":
        return "bg-rose-600 hover:bg-rose-700"
      default:
        return "bg-blue-600 hover:bg-blue-700"
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    alert("Message sent! (This is a demo)")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${getTextColor()}`}>
            Get In <span className={getHighlightColor()}>Touch</span>
          </h2>
          <div className={`h-1 w-20 mx-auto ${getHighlightColor().replace("text", "bg")}`}></div>
          <p className={`mt-4 max-w-2xl mx-auto ${getTextColor()} opacity-90`}>
            Have a project in mind or want to discuss a potential collaboration? Feel free to reach out to me using the
            form below.
          </p>
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
                <h3 className={`text-xl font-semibold mb-6 ${getTextColor()}`}>Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className={`${getHighlightColor()} mr-4 mt-1`} size={20} />
                    <div>
                      <h4 className={`font-medium ${getTextColor()}`}>Email</h4>
                      <p className={`${getTextColor()} opacity-90`}>choonjerald@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className={`${getHighlightColor()} mr-4 mt-1`} size={20} />
                    <div>
                      <h4 className={`font-medium ${getTextColor()}`}>Phone</h4>
                      <p className={`${getTextColor()} opacity-90`}>+(65) 8154-0948</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className={`${getHighlightColor()} mr-4 mt-1`} size={20} />
                    <div>
                      <h4 className={`font-medium ${getTextColor()}`}>Location</h4>
                      <p className={`${getTextColor()} opacity-90`}>Singapore, SG</p>
                    </div>
                  </div>
                </div>
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
                <h3 className={`text-xl font-semibold mb-6 ${getTextColor()}`}>Send Me a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`bg-white/20 border-gray-300 ${getTextColor()} placeholder:text-gray-500`}
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`bg-white/20 border-gray-300 ${getTextColor()} placeholder:text-gray-500`}
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`bg-white/20 border-gray-300 ${getTextColor()} placeholder:text-gray-500`}
                    />
                  </div>

                  <Button type="submit" className={`w-full ${getButtonBg()} text-white`}>
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
