"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const partners = [
  { id: 1, name: "Intel" },
  { id: 2, name: "Microsoft" },
  { id: 3, name: "Google" },
  { id: 4, name: "AWS" },
  { id: 5, name: "Avalanche" },
  { id: 6, name: "ISRO-ISTRAC" },
]

export function Workshops() {
  const [currentPage, setCurrentPage] = useState(0)
  const partnersPerPage = 6
  const totalPages = Math.ceil(partners.length / partnersPerPage)

  const displayedPartners = partners.slice(
    currentPage * partnersPerPage,
    (currentPage + 1) * partnersPerPage
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section id="workshops" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center tracking-[0.15em] mb-16 font-sans">
          PREVIOUS WORKSHOP PARTNERS
        </h2>

        {/* Partners Grid with Navigation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={prevPage}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Previous partners"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {displayedPartners.map((partner) => (
              <div
                key={partner.id}
                className="relative group"
              >
                {/* Hexagonal-ish card shape */}
                <div 
                  className="bg-secondary/80 hover:bg-secondary transition-colors px-8 py-6 text-center clip-hexagon"
                  style={{
                    clipPath: "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)"
                  }}
                >
                  <span className="text-foreground font-medium tracking-wide">
                    {partner.name}
                  </span>
                </div>
                {/* Accent border effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    clipPath: "polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)",
                    border: "2px solid var(--primary)",
                    background: "transparent"
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={nextPage}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Next partners"
          >
            <ChevronRight size={32} />
          </button>
        </div>

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
