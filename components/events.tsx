"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const events = [
  {
    id: 1,
    name: "Mechathon",
    image: "/images/event-mechathon.jpg",
    description:
      "A time-bound mechanical innovation challenge where ideas turn into reality. Participants design, build, and compete with custom robotic systems. Categories: 8kg, 15kg, 30kg combat robots.",
    prize: "Will be updated soon",
  },
  {
    id: 2,
    name: "Business Events",
    image: "/images/event-business.jpg",
    description:
      "These events are crafted to nurture leadership, strategic thinking and startup culture. Participants will pitch ideas, present business models, and take on real-world corporate challenges.",
    prize: "Will be updated soon",
  },
  {
    id: 3,
    name: "Open Loop Events",
    image: "/images/event-openloop.jpg",
    description:
      "A blend of entertainment and team activities that refresh your mind while testing your creativity, coordination, and presence of mind.",
    prize: "Will be updated soon",
  },
  {
    id: 4,
    name: "Navadhara Praudyogika",
    image: "/images/event-navadhara.jpg",
    description:
      "A project presentation event where students showcase innovative models and working prototypes, compete before expert judges, and win exciting cash prizes.",
    prize: "Will be updated soon",
  },
  {
    id: 5,
    name: "3D Printing Hackathon",
    image: "/images/event-3dprinting.jpg",
    description:
      "A fast-paced innovation challenge where ideas are transformed into real, functional prototypes using creative engineering and 3D printing.",
    prize: "Will be updated soon",
  },
  {
    id: 6,
    name: "Technical Events",
    image: "/images/event-technical.jpg",
    description:
      "Includes technical paper presentation, software building, CAD design challenge, analysis challenge, and more specialized technical competitions.",
    prize: "Will be updated soon",
  },
  {
    id: 7,
    name: "Robotic Events",
    image: "/images/event-robotic.jpg",
    description:
      "Line follower bot, RC racing, and autonomous drone challenge. Navigate robots through obstacles and showcase precision engineering and control systems.",
    prize: "Will be updated soon",
  },
  {
    id: 8,
    name: "Workshops",
    image: "/images/event-workshops.jpg",
    description:
      "Hands-on, industry-oriented workshops including SolidWorks, ANSYS, 3D Printing, Sheet Metal Design, Material Selection, Electric Vehicles, IC Engine, and more.",
    prize: "Will be updated soon",
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
