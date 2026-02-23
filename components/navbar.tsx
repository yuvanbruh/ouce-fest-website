"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface Registration {
  _id: string
  eventName: string
  subEvent?: string
  txnId: string
  verified: boolean
  createdAt: string
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [passOpen, setPassOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [data, setData] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  // Prevent background scroll when modal open
  useEffect(() => {
    if (passOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [passOpen])

  const handleSearch = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid 10-digit phone number")
      return
    }

    setLoading(true)
    setSearched(true)

    const res = await fetch("/api/pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })

    const result = await res.json()
    setData(result)
    setLoading(false)
  }

  return (
    <>
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
                priority
              />
              <span className="text-white font-semibold tracking-[0.15em] md:tracking-[0.25em] text-sm md:text-lg uppercase">
                MECHARENA 2026
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">

              <Link href="/" className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors">
                Home
              </Link>

              <Link href="#events" className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors">
                Events
              </Link>

              <Link href="#contact" className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors">
                Contact
              </Link>

              <a
                href="/images/brochure.jpeg"
                download
                target="_blank"
                className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
              >
                Brochure
              </a>

              <button
                onClick={() => setPassOpen(true)}
                className="border border-cyan-400 px-6 py-2 text-sm tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
              >
                🎟 MY PASS
              </button>
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

        {/* ✅ RESTORED MOBILE MENU */}
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

                <Link href="#contact" onClick={() => setOpen(false)} className="text-white text-base hover:text-cyan-400 transition">
                  Contact
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

                <button
                  onClick={() => {
                    setOpen(false)
                    setPassOpen(true)
                  }}
                  className="border border-cyan-400 px-8 py-3 text-sm tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                >
                  🎟 MY PASS
                </button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* PASS MODAL */}
      <AnimatePresence>
        {passOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center px-4"
            onClick={() => setPassOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-white/10 w-full max-w-2xl rounded-2xl p-8 max-h-[85vh] overflow-y-auto scrollbar-hide"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                🎟 My Pass
              </h2>

              <div className="flex gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Enter registered phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-black border border-white/30 px-4 py-3 rounded focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleSearch}
                  className="bg-cyan-500 px-6 py-3 text-black font-semibold rounded hover:bg-cyan-400 transition"
                >
                  {loading ? "Checking..." : "View"}
                </button>
              </div>

              {searched && !loading && data.length === 0 && (
                <p className="text-center text-gray-400">
                  No registrations found.
                </p>
              )}

              <div className="space-y-6">
                {data.map((reg) => (
                  <div
                    key={reg._id}
                    className="bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-semibold">
                      {reg.eventName}
                    </h3>

                    {reg.subEvent && (
                      <p className="text-cyan-400 text-sm mt-1">
                        {reg.subEvent}
                      </p>
                    )}

                    <p className="text-sm mt-4 text-gray-400">
                      Transaction ID
                    </p>

                    <p className="font-mono text-sm">
                      {reg.txnId}
                    </p>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </span>

                      {reg.verified ? (
                        <span className="text-green-400 font-semibold">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="text-yellow-400 font-semibold">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}