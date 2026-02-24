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
      "A time-bound mechanical innovation challenge where ideas turn into reality.",
    price: "Will be updated soon",
  },
  {
    id: 2,
    name: "Business Events",
    image: "images/stem-list-EVgsAbL51Rk-unsplash.jpg",
    description:
      "Strategic and startup-focused events.",
    price: "Will be updated soon",
  },
  {
    id: 6,
    name: "Technical Events",
    image: "images/sponsors/kumpan-electric-SYo5eazBrls-unsplash.jpg",
    description: "Technical competitions and challenges.",
    subEvents: [
      { name: "Technical Paper Presentation", price: "₹300" },
      { name: "Structure Building", price: "₹400" },
      { name: "Solidworks", price: "₹350" },
      { name: "Ansys", price: "₹350" },
    ],
  },
  {
    id: 7,
    name: "Robotic Events",
    image: "images/sponsors/leiada-krozjhen-99F9-FV3cbE-unsplash.jpg",
    description: "Combined Line Follower Bot and RC Racing challenge.",
    subEvents: [
      { name: "Line Follower Bot+RC Racing", price: "₹800" },
      { name: "Line Follower", price: "₹400" },
      { name: "RC Racing", price: "₹500" },
    ],
  },
  {
    id: 8,
    name: "Workshops",
    image: "images/sponsors/kirill-prikhodko-kRp5woiVDaY-unsplash.jpg",
    description: "Hands-on workshops.",
    subEvents: [
      { name: "Solidworks workshop", price: "₹600" },
      { name: "Ansys workshop", price: "₹600" },
      { name: "Refrigiration and Airconditioning workshop", price: "₹600" },
      { name: "Welding workshop", price: "₹700" },
      { name: "EV workshop", price: "₹800" },
      { name: "IC Engines", price: "₹600" },
    ],
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
    subEvent: "",
  })

  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "auto"
  }, [activeEvent])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const selectedSubEvent =
    activeEvent?.subEvents?.find(
      (sub: any) => sub.name === formData.subEvent
    ) || null

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          eventName: activeEvent.name,
          price: selectedSubEvent?.price || activeEvent.price,
        }),
      })

      alert("Registration submitted successfully!")
      setShowForm(false)
      setFormData({
        name: "",
        college: "",
        phone: "",
        txnId: "",
        subEvent: "",
      })
    } catch {
      alert("Server error. Try again.")
    }
    setLoading(false)
  }

  return (
    <section id="events" className="py-16 bg-background">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          EVENTS
        </h2>

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

                <p className="text-muted-foreground mb-6">
                  {activeEvent.description}
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

                    {/* Sub Event Dropdown + Price */}
                    {activeEvent.subEvents && (
                      <div className="flex items-center gap-4">
                        <select
                          name="subEvent"
                          value={formData.subEvent}
                          onChange={handleChange}
                          className="flex-1 border p-3 rounded bg-background"
                        >
                          <option value="" disabled>
                            Select Category
                          </option>

                          {activeEvent.subEvents.map((sub: any) => (
                            <option key={sub.name} value={sub.name}>
                              {sub.name}
                            </option>
                          ))}
                        </select>

                        {selectedSubEvent && (
                          <div className="min-w-[90px] text-right font-semibold text-cyan-600">
                            {selectedSubEvent.price}
                          </div>
                        )}
                      </div>
                    )}

                    <input
                      name="txnId"
                      placeholder="UPI Transaction ID"
                      value={formData.txnId}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-cyan-600 text-white py-3 rounded font-semibold disabled:opacity-50"
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