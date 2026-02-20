// "use client"

// import Link from "next/link"
// import { motion } from "framer-motion"

// export function Navbar() {
//   return (
//     <motion.nav
//       initial={{ y: -80 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
//     >
//       <div className="max-w-[1400px] mx-auto px-8 py-5">
//         <div className="flex items-center justify-between">

//           {/* Logo Section */}
//           <Link href="/" className="flex items-center gap-3">
//             <img
//               src="/logo.png"
//               alt="logo"
//               className="w-9 h-9"
//             />
//             <span className="text-white font-semibold tracking-[0.25em] text-lg uppercase">
//               MECHARENA 2026
//             </span>
//           </Link>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center gap-10">
//             {["Home", "Events", "Workshops", "Previous", "Gallery"].map(
//               (item, i) => (
//                 <motion.div
//                   key={item}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                 >
//                   <Link
//                     href="#"
//                     className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
//                   >
//                     {item}
//                   </Link>
//                 </motion.div>
//               )
//             )}
//           </div>

//           {/* Login Button */}
//           <Link
//             href="#login"
//             className="border border-white px-6 py-2 text-sm tracking-widest text-white hover:bg-white hover:text-black transition-all"
//           >
//             LOGIN
//           </Link>
//         </div>
//       </div>
//     </motion.nav>
//   )
// }
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function Navbar() {
  const [open, setOpen] = useState(false)

  const links = ["Home", "Events", "Workshops", "Previous", "Gallery", "Brochure"]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4 md:py-5">
        <div className="flex items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/Mecharena-logo.jpeg"
                alt="Mecharena logo"
                width={36}
                height={36}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 object-contain"
                priority
              />
            <span className="text-white font-semibold tracking-[0.15em] md:tracking-[0.25em] text-sm md:text-lg uppercase">
              MECHARENA 2026
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white/90 text-sm tracking-wider hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </Link>
              </motion.div>
            ))}

            <Link
              href="#login"
              className="border border-white px-6 py-2 text-sm tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              LOGIN
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setOpen(!open)}
            className="md:hidden text-white border border-white/30 px-3 py-2 rounded"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
          >
            <div className="flex flex-col items-center gap-6 py-6">

              {links.map((item) => (
                <Link
                  key={item}
                  href="#"
                  onClick={() => setOpen(false)}
                  className="text-white text-base tracking-wider hover:text-cyan-400 transition-colors"
                >
                  {item}
                </Link>
              ))}

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
