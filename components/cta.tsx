import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/mecharena_2026/", label: "Instagram" },

  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/mecharena-2026/", label: "LinkedIn" },
]

export function CTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        {/* Robot Mascot */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto mb-6 sm:mb-8">
          <Image
            src="/images/robot-mascot.jpg"
            alt="Mecharena Robot Mascot"
            fill
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-1 sm:mb-2 font-sans">
          <span className="text-foreground">BOOK YOUR</span>
        </h2>
        <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-8 sm:mb-12 font-sans">
          <span className="text-foreground">SLOTS </span>
          <span className="text-primary">NOW</span>
        </h2>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
              aria-label={social.label}
            >
              <social.icon size={24} className="sm:w-8 sm:h-8" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
