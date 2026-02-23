"use client"

import Link from "next/link"
import { Instagram, Youtube, Linkedin } from "lucide-react"

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/mecharena_2026?igsh=d3dyYnlvZW84MDZz", // add your Instagram link later
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@mecharena2026?si=Ugfdw3MpWXS-SAQT",
    label: "YouTube",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/mecharena-2026/",
    label: "LinkedIn",
  },
]
export function CTA() {
  return (
    <section className="py-20 bg-background">

      <div className="container mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4">
          Secure Your Spot at
        </h2>

        <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-10 text-primary">
          MECHARENA 2026
        </h3>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">

          <Link
  href="#events"
  className="bg-cyan-600 px-6 md:px-10 py-3 md:py-4 text-white tracking-widest text-sm md:text-lg hover:bg-cyan-500 transition-all w-full sm:w-auto text-center"
>
  REGISTER NOW
</Link>

             <a
    href="/images/brochure.jpeg"
    target="_blank"
    rel="noopener noreferrer"
    className="border border-cyan-400 px-6 md:px-10 py-3 md:py-4 text-white tracking-widest text-sm md:text-lg hover:bg-cyan-400/10 transition-all w-full sm:w-auto text-center"
  >
    VIEW BROCHURE
  </a>

        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 opacity-70">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
              aria-label={social.label}
            >
              <social.icon size={26} />
            </Link>
          ))}
        </div>

      </div>

    </section>
  )
}