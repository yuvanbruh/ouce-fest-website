import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-6 sm:py-8 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 justify-center sm:justify-start">
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary sm:w-6 sm:h-6"
            >
              <path
                d="M16 2L20 8L28 8L22 14L24 22L16 18L8 22L10 14L4 8L12 8L16 2Z"
                fill="currentColor"
              />
              <circle cx="16" cy="16" r="4" fill="currentColor" opacity="0.5" />
            </svg>
            <span className="font-sans font-semibold text-xs sm:text-sm tracking-wider text-foreground">
              MECHARENA 2026
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-muted-foreground text-xs sm:text-sm">
            © 2026 MECHARENA, UCEOU. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 sm:gap-6">
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
      </div>
    </footer>
  )
}
