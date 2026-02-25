"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { SpaceScene } from "./SpaceScene"

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">

      <SpaceScene />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">

        <div className="max-w-[1400px] w-full px-4 sm:px-6 md:px-10 flex flex-col items-center text-center pt-10 sm:pt-14 md:pt-28">

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white/70 text-base md:text-lg mt-2 mb-6 md:mb-8 tracking-wider"
          >
            UCE (Autonomous), Osmania University
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-[2.8rem] sm:text-[3.2rem] md:text-[4.5rem] lg:text-[6.5rem] font-light tracking-tight leading-tight"
          >
            MECHARENA 2026
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-cyan-400 text-[1.2rem] sm:text-[1.6rem] md:text-[2.2rem] lg:text-[3.6rem] font-medium tracking-[0.06em] mb-4 sm:mb-4 md:mb-6"
          >
            NATIONAL LEVEL TECHNICAL SYMPOSIUM
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 max-w-3xl mb-4 md:mb-6 text-sm md:text-lg lg:text-xl leading-relaxed px-2"
          >
            A premier student-led technical platform bringing together innovation,
            robotics, automation, design, and next-generation engineering talent
            from across the nation.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/50 max-w-3xl mb-8 md:mb-12 text-xs md:text-base lg:text-lg px-2"
          >
            Competitions • Workshops • Robotic Events • Industry Talks  
            March 2026 – Hyderabad
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 justify-center"
          >
        <Link
  href="#events"
  className="bg-cyan-600 px-6 md:px-10 py-3 md:py-4 text-white tracking-widest text-sm md:text-lg hover:bg-cyan-500 transition-all w-full sm:w-auto text-center"
>
  REGISTER NOW
</Link>

   <a
  href="/brochure.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-cyan-400 px-6 md:px-10 py-3 md:py-4 text-white tracking-widest text-sm md:text-lg hover:bg-cyan-400/10 transition-all w-full sm:w-auto text-center"
>
  VIEW BROCHURE
</a>


          </motion.div>

        </div>
      </div>
    </section>
  )
}