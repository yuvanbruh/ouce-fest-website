"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/sponsors/Mecharena-logo-Photoroom.png"
              alt="Mecharena logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <span className="text-white font-semibold tracking-[0.15em] md:tracking-[0.25em] text-sm md:text-lg uppercase">
              MECHARENA 2026
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">

            <Link
              href="/"
              className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>

            <Link
              href="#events"
              className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
            >
              Events
            </Link>

            <Link
              href="#workshops"
              className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
            >
              Workshops
            </Link>

            <a
              href="/images/brochure.jpeg"
              download
              target="_blank"
              className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
            >
              Brochure
            </a>

            <Link
              href="#login"
              className="border border-white px-6 py-2 text-sm tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              LOGIN
            </Link>

          </div>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white border border-white/30 px-3 py-2 rounded"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
          >
            <div className="flex flex-col items-center gap-6 py-6">

              <Link href="/" onClick={() => setOpen(false)} className="text-white text-base hover:text-cyan-400 transition">
                Home
              </Link>

              <Link href="#events" onClick={() => setOpen(false)} className="text-white text-base hover:text-cyan-400 transition">
                Events
              </Link>

              <Link href="#workshops" onClick={() => setOpen(false)} className="text-white text-base hover:text-cyan-400 transition">
                Workshops
              </Link>

              <a
                href="/images/brochure.jpeg"
                download
                target="_blank"
                onClick={() => setOpen(false)}
                className="text-white text-base hover:text-cyan-400 transition"
              >
                Brochure
              </a>

              <Link
                href="#login"
                onClick={() => setOpen(false)}
                className="border border-white px-8 py-3 text-sm tracking-widest text-white hover:bg-white hover:text-black transition-all"
              >
                LOGIN
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  )
}