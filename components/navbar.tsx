"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-8 py-5">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="logo"
              className="w-9 h-9"
            />
            <span className="text-white font-semibold tracking-[0.25em] text-lg uppercase">
              MECHARENA 2026
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {["Home", "Events", "Workshops", "Previous", "Gallery"].map(
              (item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href="#"
                    className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}
          </div>

          {/* Login Button */}
          <Link
            href="#login"
            className="border border-white px-6 py-2 text-sm tracking-widest text-white hover:bg-white hover:text-black transition-all"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
