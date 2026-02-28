"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const events = [
  
  {
    id: 1,
    name: "Mechathon",
    image: "images/sponsors/pc-solar-panels-manufacturing-plant-used-study-solar-energy-systems_482257-118107.jpg (1).jpeg",
    description:
      "A time-bound mechanical innovation challenge where ideas turn into reality. Participants design, build, and compete with custom robotic systems.",
    price: "₹249",
      date: "11,12 Mar 2026",

  },
  {
    id: 2,
    name: "Business Events",
    image: "images/stem-list-EVgsAbL51Rk-unsplash.jpg",
    description:
    "Strategic and startup-focused events where participants pitch ideas and take on real-world corporate challenges.",
    price: "₹100",
      date: "13 Mar 2026",

  },
  {
    id: 3,
    name: "Open Loop Events",
    image: "images/sponsors/premium_vector-1731328754912-02598fef08bc.png",
    description:
      "Creative and engaging team-based challenges testing coordination and presence of mind.",
    price: "Will be updated soon",
      date: "12,13 Mar 2026",

  },
  {
    id: 4,
    name: "Navadhara Praudyogika",
    image: "images/sponsors/absolutvision-82TpEld0_e4-unsplash.jpg",
    description:
      "Project presentation event showcasing innovative models and prototypes. Prizes worth upto ₹10K",
    price: "₹499",
      date: "12 Mar 2026",

  },
  {
    id: 5,
    name: "3D Printing Hackathon",
    image: "images/sponsors/photo-1563520239648-a24e51d4b570.jpeg",
    description:
      "Rapid innovation challenge transforming ideas into functional 3D printed prototypes.",
    price: "₹799",
      date: "12,13 Mar 2026",

  },
  {
    id: 6,
    name: "Technical Events",
    image: "images/sponsors/kumpan-electric-SYo5eazBrls-unsplash.jpg",
    description: "Technical competitions and challenges.",
   subEvents: [
      { name: "Technical Paper Presentation", price: "₹150",date: "13 Mar 2026" },
      { name: "Truss It", price: "₹150" ,date: "12 Mar 2026"},
      { name: "Solid Works", price: "₹75",date: "13 Mar 2026" },
      { name: "Ansys", price: "₹75", date: "13 Mar 2026"},
    ],
  },
 {
  id: 7,
  name: "Robotic Events",
  image: "images/sponsors/leiada-krozjhen-99F9-FV3cbE-unsplash.jpg",
  description: "Combined Line Follower Bot and RC Racing challenge. Prizes worth upto ₹10K",
  subEvents: [
      { name: "Robo Maze + RC Racing", price: "₹499",date: "12,13 Mar 2026" },
      { name: "Line Follower", price: "₹299" ,date: "12,13 Mar 2026"},
      { name: "RC Racing", price: "₹299",date: "12,13 Mar 2026" },
       { name: "Robo maze", price: "₹299",date: "12,13 Mar 2026" },
          { name: "Robo Sumo", price: "₹299",date: "12,13 Mar 2026" },
           
    ],
},
{
  id: 9,
  name: "Autonomous Drone Challenge",
  image: "images/sponsors/alan-quirvan-U902HYyXYtw-unsplash.jpg",
  description: "Autonomous drone competition focusing on navigation and precision.",
  price: "₹499",
    date: "12,13 Mar 2026",

},
  {
    id: 8,
    name: "Workshops",
    image: "images/sponsors/kirill-prikhodko-kRp5woiVDaY-unsplash.jpg",
    description:
      "Hands-on workshops in SolidWorks, ANSYS, EVs, IC Engines, 3D Printing and more.",
    price: "Will be updated soon",
  subEvents: [
           { name: "Ansys workshop", price: "₹349",date: "2,3 Mar 2026" },
       { name: "3D Printing workshop", price: "₹299" ,date: "7 Mar 2026"},
         { name: "Solid works workshop", price: "₹349" ,date: "9,10,11 Mar 2026"},
      { name: "Refrigeration and Air Conditioning workshop", price: "199" ,date: "12 Mar 2026"},
          { name: "EV workshop", price: "₹199",date: "12 Mar 2026" },
  { name: "IC Engines workshop", price: "₹199",date: "13 Mar 2026" },
      { name: "Welding workshop", price: "₹199",date: "13 Mar 2026" },
       { name: "Robotics workshop", price: "₹199",date: "13 Mar 2026" },
     
    ],
  },
]

export function Events() {
  const [activeEvent, setActiveEvent] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

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
  const validateForm = () => {
    const { name, college, phone, txnId, subEvent } = formData

    if (!name.trim() || name.length < 3) {
      alert("Enter valid full name")
      return false
    }

    if (!college.trim()) {
      alert("Enter valid college name")
      return false
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid 10-digit phone number")
      return false
    }

    if (!/^[A-Za-z0-9]{10,}$/.test(txnId)) {
      alert("Enter valid Transaction ID")
      return false
    }

    if (activeEvent?.subEvents && !subEvent) {
      alert("Please select category")
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
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
setSuccessMessage(
  "Registration submitted successfully! You can check your passes in My Passes (Menu)."
)
setTimeout(() => {
  setActiveEvent(null)
  setSuccessMessage("")
}, 2500)

setShowForm(false)

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

        {/* Grid */}
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

{/* Description */}
<p className="text-muted-foreground mb-4">
  {activeEvent.description}
</p>
{activeEvent?.name === "Robotic Events" && (
  <p className="text-sm text-yellow-400 mb-4">
    📘 Detailed rule book will be updated soon.
  </p>
)}
{/* Show price only if NO subEvents */}
{!activeEvent.subEvents && activeEvent.price && (
  <p className="font-semibold mb-6">
    Price: {activeEvent.price}
  </p>
)}

{/* Multiple Events Notice */}
<p className="text-sm text-muted-foreground mb-6">
  You may participate in multiple events. 
  Please submit separate registrations and payments for each event.
</p>
{successMessage && (
  <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-center font-semibold">
    {successMessage}
  </div>
)}
{!showForm && (
  <button
    onClick={() => setShowForm(true)}
    className="bg-cyan-600 text-white px-6 py-3 rounded font-semibold w-full"
  >
    REGISTER NOW
  </button>
)}

              {showForm && (
  <div className="space-y-6 mt-6">

    {/* TABLE */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-border/30 rounded-lg">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3">Event</th>
            <th className="text-left p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {activeEvent.subEvents ? (
            activeEvent.subEvents.map((sub: any) => (
              <tr key={sub.name} className="border-t">
                <td className="p-3">{sub.name}</td>
                <td className="p-3">{sub.date}</td>
              </tr>
            ))
          ) : (
            <tr className="border-t">
              <td className="p-3">{activeEvent.name}</td>
              <td className="p-3">{activeEvent.date}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
{activeEvent?.name === "Robotic Events" &&
  formData.subEvent === "Robo Maze + RC Racing" && (
    <div className="text-xs text-yellow-400 mt-3">
      ⚠ You may use the organizer-provided bot for an additional 
      <span className="font-semibold text-cyan-400"> ₹100</span>.
    </div>
)}
    {/* FORM STARTS */}
    <div className="space-y-4">
                    <input
                      name="name"
placeholder={
  activeEvent?.name === "Robotic Events"
    ? "Team Name / Your Name"
    : "Full Name"
}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border p-3 rounded"
                    />
{activeEvent?.name === "Robotic Events" && (
  <p className="text-xs text-muted-foreground mt-1">
    Maximum team size: <span className="font-semibold text-cyan-600">3 members</span>.  
    Individual participants may also register.
  </p>
)}
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
                  {/* Sub Event Dropdown + Price */}
{activeEvent.subEvents && (
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">

    <select
      name="subEvent"
      value={formData.subEvent}
      onChange={handleChange}
      className="w-full sm:flex-1 border p-3 rounded bg-background"
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
      <div className="sm:min-w-[100px] text-left sm:text-right font-semibold text-cyan-600">
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
{/* Payment Notice */}
<div className="text-sm text-muted-foreground text-center pt-2">
  Registration will be confirmed only after successful payment.
</div>


{/* QR Code */}
<div className="text-center pt-4">
  <p className="font-semibold mb-2">
    Scan & Pay via UPI (PhonePe / GPay / Any UPI App)
  </p>
  <Image
    src="/images/sponsors/19.png"
    alt="UPI QR Code"
    width={200}
    height={200}
    className="mx-auto rounded-lg"
  />
</div>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full bg-cyan-600 text-white py-3 rounded font-semibold disabled:opacity-50"
                    >
                      {loading ? "Submitting..." : "Submit Registration"}
                    </button>

                  </div>
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
