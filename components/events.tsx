"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const events = [
  {
    id: 1,
    name: "Mechathon",
    image: "images/sponsors/mika-baumeister-wZ49T2Tc7xw-unsplash.jpg",
    description:
      "A time-bound mechanical innovation challenge where ideas turn into reality. Participants design, build, and compete with custom robotic systems.",
    prize: "Will be updated soon",
  },
  {
    id: 2,
    name: "Business Events",
    image: "images/stem-list-EVgsAbL51Rk-unsplash.jpg",
    description:
      "Strategic and startup-focused events where participants pitch ideas and take on real-world corporate challenges.",
    prize: "Will be updated soon",
  },
  {
    id: 3,
    name: "Open Loop Events",
    image: "/images/event-maneuver.jpg",
    description:
      "Creative and engaging team-based challenges testing coordination and presence of mind.",
    prize: "Will be updated soon",
  },
  {
    id: 4,
    name: "Navadhara Praudyogika",
    image: "images/sponsors/absolutvision-82TpEld0_e4-unsplash.jpg",
    description:
      "Project presentation event showcasing innovative models and prototypes.",
    prize: "Will be updated soon",
  },
  {
    id: 5,
    name: "3D Printing Hackathon",
    image: "images/sponsors/kadir-celep-HsefvbLbNWc-unsplash.jpg",
    description:
      "Rapid innovation challenge transforming ideas into functional 3D printed prototypes.",
    prize: "Will be updated soon",
  },
  {
    id: 6,
    name: "Technical Events",
    image: "images/sponsors/kumpan-electric-SYo5eazBrls-unsplash.jpg",
    description:
      "Technical paper presentations, CAD challenges, analysis competitions and more.",
    prize: "Will be updated soon",
  },
  {
    id: 7,
    name: "Robotic Events",
    image: "images/sponsors/alan-quirvan-U902HYyXYtw-unsplash.jpg",
    description:
      "Line follower bot, RC racing and autonomous drone challenges.",
    prize: "Will be updated soon",
  },
  {
    id: 8,
    name: "Workshops",
    image: "images/sponsors/kirill-prikhodko-kRp5woiVDaY-unsplash.jpg",
    description:
      "Hands-on workshops in SolidWorks, ANSYS, EVs, IC Engines, 3D Printing and more.",
    prize: "Will be updated soon",
  },
]

export function Events() {
  const [activeEvent, setActiveEvent] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    phone: "",
    txnId: "",
  })

  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "auto"
  }, [activeEvent])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const { name, college, phone, txnId } = formData

    if (!name.trim() || name.length < 3) {
      alert("Enter valid full name (min 3 characters)")
      return false
    }

    if (!college.trim() || college.length < 2) {
      alert("Enter valid college name")
      return false
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid 10-digit phone number")
      return false
    }

    if (!/^[A-Za-z0-9]{10,}$/.test(txnId)) {
      alert("Enter valid UPI Transaction ID (min 10 characters)")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm() || !activeEvent) return

    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventName: activeEvent.name,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      alert("Registration submitted successfully!")

      setShowForm(false)
      setFormData({
        name: "",
        college: "",
        phone: "",
        txnId: "",
      })
    } catch (error) {
      alert("Server error. Please try again.")
    }

    setLoading(false)
  }

  return (
    <section id="events" className="py-16 bg-background">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          EVENTS
        </h2>

        {/* Event Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => {
                setActiveEvent(event)
                setShowForm(false)
              }}
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

        {/* Modal */}
        <AnimatePresence>
          {activeEvent && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEvent(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-background max-w-2xl w-full rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto hide-scrollbar"
              >
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
                    className="bg-cyan-600 text-white px-6 py-3 rounded font-semibold w-full"
                  >
                    REGISTER NOW
                  </button>
                )}

                {showForm && (
                  <div className="space-y-4 mt-6">

                    <input
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />

                    <input
                      name="college"
                      placeholder="College Name"
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />

                    <input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />

                    <input
                      name="txnId"
                      placeholder="UPI Transaction ID"
                      value={formData.txnId}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />

                    <div className="text-sm text-muted-foreground text-center pt-2">
                      Registration will be confirmed only after successful payment.
                    </div>

                    <div className="text-center pt-4">
                      <p className="font-semibold mb-2">
                        Scan & Pay via UPI
                      </p>
                      <Image
                        src="/images/2.jpeg"
                        alt="UPI QR Code"
                        width={200}
                        height={200}
                        className="mx-auto rounded-lg"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-cyan-600 text-white py-3 rounded font-semibold mt-4 disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Registration"}
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