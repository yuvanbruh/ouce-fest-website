"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const events = [
  {
    id: 1,
    name: "ARMAGEDDON",
    image: "/images/event-armageddon.jpg",
    description:
      "Combat robotics championship with custom bots. Inspired by Transformers, craft machines to defeat opponents. ARMAGEDDON showcases battles for glory. Build your champion. Categories: 8kg, 15kg, 30kg.",
    prize: "6,00,000",
  },
  {
    id: 2,
    name: "NANO NAVIGATOR",
    image: "/images/event-nano.jpg",
    description:
      "Navigate micro-robots through intricate mazes. Test your precision engineering and control systems in this challenging competition.",
    prize: "2,00,000",
  },
  {
    id: 3,
    name: "LIGHTFURY",
    image: "/images/event-lightfury.jpg",
    description:
      "High-speed autonomous drone racing through obstacle courses. Push the limits of flight technology and AI navigation.",
    prize: "3,00,000",
  },
  {
    id: 4,
    name: "SKY MANEUVER",
    image: "/images/event-maneuver.jpg",
    description:
      "Aerial combat and precision flying competition. Showcase your piloting skills and custom drone engineering.",
    prize: "2,50,000",
  },
]

export function Events() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeEvent = events[activeIndex]

  const nextEvent = () => {
    setActiveIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setActiveIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center tracking-[0.15em] mb-16 font-sans">
          EVENTS
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event Details */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-wide font-sans">
              {activeEvent.name}
            </h3>
            <div className="w-28 h-1 bg-gradient-to-r from-primary to-cyan-400" />
            <p className="text-muted-foreground leading-relaxed">{activeEvent.description}</p>

            <div className="inline-block bg-foreground text-background px-6 py-2 font-bold tracking-wider text-sm font-sans">
              PRIZES WORTH : {activeEvent.prize}
            </div>

            <div>
              <Link
                href={`#event-${activeEvent.id}`}
                className="inline-block px-8 py-3 border-2 border-primary text-primary font-semibold tracking-wider text-sm hover:bg-primary hover:text-background transition-all duration-300"
              >
                KNOW MORE
              </Link>
            </div>
          </div>

          {/* Event Cards Carousel */}
          <div className="relative">
            <div className="flex gap-4 overflow-hidden">
              {events.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex-shrink-0 w-48 h-72 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === activeIndex
                      ? "ring-2 ring-primary scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-foreground font-bold text-sm tracking-wider font-sans">
                      {event.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={prevEvent}
                className="p-2 border border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Previous event"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextEvent}
                className="p-2 border border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                aria-label="Next event"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
