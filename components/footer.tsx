"use client"
import { Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-10 bg-background border-t border-border/30">
      <div className="container mx-auto px-4 space-y-8">

        {/* Contact Section */}
        <div id="contact" className="text-center space-y-3">
          <h3 className="text-lg font-semibold text-primary">
            Contact
          </h3>

          <p className="text-sm text-muted-foreground">
            For registrations, sponsorships or general queries:
          </p>

          <p className="text-sm text-foreground font-medium">
            📧 mecharena.uce@gmail.com
          </p>

          <p className="text-sm text-muted-foreground">
            Department of Mechanical Engineering  
            UCE (Autonomous), Osmania University, Hyderabad
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 pt-6">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

            {/* Left */}
            <Link href="/" className="font-semibold text-sm tracking-wider text-foreground">
              MECHARENA 2026
            </Link>

            {/* Center */}
            <p className="text-muted-foreground text-xs sm:text-sm">
              © 2026 MECHARENA, UCEOU. All rights reserved.
            </p>

            {/* Right Links */}
            <div className="flex items-center gap-6">
              <Link
                href="#privacy"
                className="text-muted-foreground text-xs sm:text-sm hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#terms"
                className="text-muted-foreground text-xs sm:text-sm hover:text-primary transition-colors"
              >
                Terms
              </Link>
            </div>

          </div>

        {/* Subtle GitHub Credit */}
{/* Subtle GitHub Credit */}
<div className="text-center mt-6">
  <a
    href="https://github.com/yuvanbruh"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
  >
    <Github size={14} />
    Engineered by
  </a>
</div>

        </div>

      </div>
    </footer>
  )
}