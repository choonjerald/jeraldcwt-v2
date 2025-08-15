"use client"

import React, { useEffect, useRef, useState } from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react"
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

  const [open, setOpen] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<Element | null>(null)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const container = modalRef.current;
        if (!container) return;
        const focusable = container.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    if (open) {
      previouslyFocusedRef.current = document.activeElement;
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 0);
    } else {
      body.style.overflow = "";
      html.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocusedRef.current instanceof HTMLElement) {
        previouslyFocusedRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = "";
      html.style.overflow = "";
    };
  }, [open]);

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

  const getModalBg = () => {
    if (theme === "night") return "bg-gray-900"
    return "bg-white"
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Robust URL-encoder (keeps parity with Netlify expectations)
  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = encode({ "form-name": "contact", ...formData })

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
      .then(() => {
        setFormData({ name: "", email: "", message: "" })
        setOpen(true);
      })
      .catch((error) => alert(error))
  }

  return (
    <section id="contact" className="py-20">
      {/* Hidden, static template so Netlify can detect the form at build time */}
      <form
        name="contact"
        data-netlify="true"
        netlify-honeypot="bot-field"
        acceptCharset="UTF-8"
        hidden
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message" />
      </form>

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
          <div
            className={`h-1 w-20 mx-auto ${getHighlightColor().replace("text", "bg")}`}
          ></div>
          <p className={`mt-4 max-w-2xl mx-auto ${getTextColor()} opacity-90`}>
            Have a project in mind or want to discuss a potential collaboration? Feel free to
            reach out to me using the form below.
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
                <h3 className={`text-xl font-semibold mb-6 ${getTextColor()}`}>
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className={`${getHighlightColor()} mr-4 mt-1`} size={20} />
                    <div>
                      <h4 className={`font-medium ${getTextColor()}`}>Email</h4>
                      <p className={`${getTextColor()} opacity-90`}>
                        choonjerald@gmail.com
                      </p>
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
                <h3 className={`text-xl font-semibold mb-6 ${getTextColor()}`}>
                  Send Me a Message
                </h3>

                <form
                  name="contact"
                  method="POST"
                  acceptCharset="UTF-8"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </p>

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
      {/* Success Popup */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          aria-describedby="success-desc"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 flex items-center justify-center min-h-full p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`w-full max-w-md rounded-2xl shadow-lg ${getModalBg()}`}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className={`${getHighlightColor()}`} />
                  <h2 id="success-title" className={`text-xl font-semibold ${getTextColor()}`}>
                    Message sent!
                  </h2>
                </div>
                <p id="success-desc" className={`${getTextColor()} opacity-90`}>
                  Thanks for reaching out. I’ll get back to you soon.
                </p>
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setOpen(false)} className={`${getButtonBg()} text-white`}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}


/*
If Netlify still doesn't detect the form, add this static HTML file so the build bot always
finds it at build-time (no JS, no React needed):

Create: public/netlify-form-detect.html
--------------------------------------
<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Netlify Form Detection</title></head>
  <body>
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" accept-charset="UTF-8">
      <input type="hidden" name="form-name" value="contact" />
      <p style="display:none;">
        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
      </p>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
      <button type="submit">Send</button>
    </form>
  </body>
</html>

After adding this file, redeploy on Netlify. You should then see the "contact" form detected
in the dashboard under Forms.
*/