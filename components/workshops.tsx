"use client"

import Link from "next/link"

export function Workshops() {
  return (
    <section id="workshops" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center tracking-[0.15em] mb-16 font-sans">
          WORKSHOPS
        </h2>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="#all-workshops"
            className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold tracking-wider text-sm hover:bg-primary hover:text-background transition-all duration-300"
          >
            VIEW WORKSHOPS
          </Link>
        </div>
      </div>
    </section>
  )
}
