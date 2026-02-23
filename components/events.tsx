"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const events = [
  {
    id: 1,
    name: "Mechathon",
    image: "/images/event-armageddon.jpg",
    description:
      "A time-bound mechanical innovation challenge where ideas turn into reality. Participants design, build, and compete with custom robotic systems. Categories: 8kg, 15kg, 30kg combat robots.",
    prize: "Will be updated soon",
  },
  {
    id: 2,
    name: "Business Events",
    image:"images/sponsors/business.jpeg",
    description:
      "These events are crafted to nurture leadership, strategic thinking and startup culture. Participants will pitch ideas, present business models, and take on real-world corporate challenges.",
    prize: "Will be updated soon",
  },
  {
    id: 3,
    name: "Open Loop Events",
    image: "/images/event-maneuver.jpg",
    description:
      "A blend of entertainment and team activities that refresh your mind while testing your creativity, coordination, and presence of mind.",
    prize: "Will be updated soon",
  },
  {
    id: 4,
    name: "Navadhara Praudyogika",
    image: "images/sponsors/download.jpeg",
    description:
      "A project presentation event where students showcase innovative models and working prototypes, compete before expert judges, and win exciting cash prizes.",
    prize: "Will be updated soon",
  },
  {
    id: 5,
    name: "3D Printing Hackathon",
    image: "images/sponsors/3d.jpeg",
    description:
      "A fast-paced innovation challenge where ideas are transformed into real, functional prototypes using creative engineering and 3D printing.",
    prize: "Will be updated soon",
  },
  {
    id: 6,
    name: "Technical Events",
    image: "images/sponsors/technical.jpeg",
    description:
      "Includes technical paper presentation, software building, CAD design challenge, analysis challenge, and more specialized technical competitions.",
    prize: "Will be updated soon",
  },
  {
    id: 7,
    name: "Robotic Events",
    image: "/images/event-nano.jpg",
    description:
      "Line follower bot, RC racing, and autonomous drone challenge. Navigate robots through obstacles and showcase precision engineering and control systems.",
    prize: "Will be updated soon",
  },
  {
    id: 8,
    name: "Workshops",
    image: "images/sponsors/workshop.jpeg",
    description:
      "Hands-on, industry-oriented workshops including SolidWorks, ANSYS, 3D Printing, Sheet Metal Design, Material Selection, Electric Vehicles, IC Engine, and more.",
    prize: "Will be updated soon",
  },
]

export function Events() {
  const [activeEvent, setActiveEvent] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (activeEvent) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [activeEvent])

  return (
    <section id="events" className="py-16 bg-background">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          EVENTS
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setActiveEvent(event)}
              className="relative h-64 rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-4 left-4 text-white font-bold">
                {event.name}
              </div>
            </button>
          ))}
        </div>

        {/* Animated Modal */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveEvent(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-background max-w-2xl w-full rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto hide-scrollbar"
              >
                {/* Close */}
                <button
                  onClick={() => setActiveEvent(null)}
                  className="absolute top-4 right-4 text-xl"
                >
                  ✕
                </button>

                <h3 className="text-3xl font-bold mb-4">
                  {activeEvent.name}
                </h3>

                <Image
                  src={activeEvent.image}
                  alt={activeEvent.name}
                  width={800}
                  height={400}
                  className="rounded-lg mb-6"
                />

                <p className="text-muted-foreground mb-4">
                  {activeEvent.description}
                </p>

                <p className="font-semibold mb-6">
                  Prize: {activeEvent.prize}
                </p>

                {!showForm && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-primary text-white px-6 py-3 rounded font-semibold w-full"
                  >
                    REGISTER NOW
                  </button>
                )}

                {showForm && (
                  <div className="space-y-4 mt-6">
                    <input
                      placeholder="Full Name"
                      className="w-full border p-3 rounded"
                    />
                    <input
                      placeholder="College Name"
                      className="w-full border p-3 rounded"
                    />
                    <input
                      placeholder="Phone Number"
                      className="w-full border p-3 rounded"
                    />
                    <input
                      placeholder="UPI Transaction ID"
                      className="w-full border p-3 rounded"
                    />

                    <button
                      className="w-full bg-primary text-white py-3 rounded font-semibold"
                    >
                      Submit Registration
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}