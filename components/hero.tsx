// "use client"

// import Link from "next/link"
// import { motion } from "framer-motion"
// import { SpaceScene } from "./SpaceScene"

// export function Hero() {
//   return (
//     <section className="relative min-h-screen bg-black overflow-hidden">

//       {/* Space Background */}
//       <SpaceScene />

//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black/60" />

//       {/* TRUE CENTERED CONTENT */}
//       <div className="relative z-10 w-full min-h-screen flex items-center justify-center">

//         <div className="max-w-[1400px] w-full px-10 flex flex-col items-center text-center">

//           <motion.p
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="text-white/70 text-base md:text-lg mb-4 tracking-wider"
//           >
//             Automation 4.0 Presents
//           </motion.p>

//           <motion.h1
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-white text-[5rem] md:text-[7rem] font-bold tracking-wide leading-tight"
//           >
//             MECHARENA

//           </motion.h1>

//           <motion.h2
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="text-cyan-400 text-[3rem] md:text-[4rem] font-semibold tracking-[0.25em] mb-6"
//           >
//             NATIONAL TECH EXPO
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-white/70 max-w-4xl mb-6 text-lg md:text-xl leading-relaxed"
//           >
//             Step into a world where engineering meets imagination.  
//             MechArena brings together the brightest minds, cutting-edge robotics, automation,  
//             aerospace innovation, and next-generation technology under one platform.
//           </motion.p>

//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8 }}
//             className="text-white/50 max-w-4xl mb-12 text-base md:text-lg"
//           >
//             Competitions • Workshops • Tech Talks • Live Demonstrations • Innovation Showcase  
//             March 2026 – A three day celebration of engineering excellence.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1 }}
//             className="flex items-center gap-8 justify-center"
//           >
//             <Link
//               href="#"
//               className="bg-cyan-600 px-10 py-4 text-white tracking-widest text-lg hover:bg-cyan-500 transition-all"
//             >
//               REGISTER NOW
//             </Link>

//             <Link
//               href="#"
//               className="border border-cyan-400 px-10 py-4 text-white tracking-widest text-lg hover:bg-cyan-400/10 transition-all"
//             >
//               VIEW EVENTS
//             </Link>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   )
// }
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
            className="text-white/70 text-sm md:text-lg mt-2 mb-6 md:mb-8 tracking-wider"
          >
            Automation 4.0 Presents
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6.5rem] font-bold tracking-wide leading-tight"
          >
            MECHARENA
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-cyan-400 text-[1rem] sm:text-[1.6rem] md:text-[2.2rem] lg:text-[3.6rem] font-semibold tracking-[0.15em] sm:tracking-[0.18em] md:tracking-[0.22em] mb-3 sm:mb-4 md:mb-6"
          >
            NATIONAL TECH EXPO
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 max-w-3xl mb-3 md:mb-6 text-xs sm:text-sm md:text-base leading-relaxed px-2"
          >
            Step into a world where engineering meets imagination.  
            MechArena brings together the brightest minds, robotics, automation,  
            aerospace innovation and next-generation technology.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/50 max-w-3xl mb-6 md:mb-12 text-[11px] sm:text-xs md:text-sm px-2"
          >
            Competitions • Workshops • Tech Talks • Live Demonstrations  
            March 2026 – A three day celebration of engineering excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 justify-center"
          >
            <Link
              href="#"
              className="bg-cyan-600 px-6 md:px-10 py-3 md:py-4 text-white tracking-widest text-sm md:text-lg hover:bg-cyan-500 transition-all w-full sm:w-auto text-center"
            >
              REGISTER NOW
            </Link>

            <Link
              href="#"
              className="border border-cyan-400 px-6 md:px-10 py-3 md:py-4 text-white tracking-widest text-sm md:text-lg hover:bg-cyan-400/10 transition-all w-full sm:w-auto text-center"
            >
              VIEW EVENTS
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
