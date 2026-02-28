"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const events = [
  { id: 1, name: "Mechathon", price: "₹249" },
  { id: 2, name: "Business Events", price: "₹100" },
  { id: 3, name: "Open Loop Events", price: "Will be updated soon" },
  { id: 4, name: "Navadhara Praudyogika", price: "₹499" },
  { id: 5, name: "3D Printing Hackathon", price: "₹799" },
  { id: 6, name: "Technical Events", subEvents: [
    { name: "Technical Paper Presentation", price: "₹150" },
    { name: "Structure Building", price: "₹150" },
    { name: "Solidworks", price: "₹75" },
    { name: "Ansys", price: "₹75" },
  ]},
  { id: 7, name: "Robotic Events", subEvents: [
    { name: "Line Follower Bot+RC Racing", price: "₹499" },
    { name: "Line Follower", price: "₹299" },
    { name: "RC Racing", price: "₹299" },
  ]},
  { id: 9, name: "Autonomous Drone Challenge", price: "₹499" },
  { id: 8, name: "Workshops", subEvents: [
    { name: "Solidworks workshop", price: "₹349" },
    { name: "Ansys workshop", price: "₹349" },
    { name: "Refrigiration and Airconditioning workshop", price: "₹199" },
    { name: "Welding workshop", price: "₹199" },
    { name: "EV workshop", price: "₹199" },
    { name: "IC Engines", price: "₹199" },
    { name: "3D Printing", price: "₹299" },
  ]},
]

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    phone: "",
    eventId: searchParams.get("eventId") || "",
    subEvent: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedEvent = events.find((e) => e.id === parseInt(formData.eventId))
  const subEventsList = selectedEvent?.subEvents || []

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = "Enter valid full name (min 3 characters)"
    }

    if (!formData.college.trim()) {
      newErrors.college = "Enter valid college name"
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit phone number"
    }

    if (!formData.eventId) {
      newErrors.eventId = "Please select an event"
    }

    if (subEventsList.length > 0 && !formData.subEvent) {
      newErrors.subEvent = "Please select a category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleProceedToPayment = () => {
    if (!validateForm()) return

    const params = new URLSearchParams({
      name: formData.name,
      college: formData.college,
      phone: formData.phone,
      eventId: formData.eventId,
      subEvent: formData.subEvent,
    })

    router.push(`/payment?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-primary text-center mb-2">
            Event Registration
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter your details to proceed to payment
          </p>

          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-cyan-600 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-medium mb-2">College</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter your college name"
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-cyan-600 focus:outline-none"
              />
              {errors.college && (
                <p className="text-red-500 text-sm mt-1">{errors.college}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-cyan-600 focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Event</label>
              <select
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-cyan-600 focus:outline-none"
              >
                <option value="">-- Choose an event --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} {!event.subEvents && event.price && `(${event.price})`}
                  </option>
                ))}
              </select>
              {errors.eventId && (
                <p className="text-red-500 text-sm mt-1">{errors.eventId}</p>
              )}
            </div>

            {/* Sub-Event Selection */}
            {subEventsList.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Category
                </label>
                <select
                  name="subEvent"
                  value={formData.subEvent}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-cyan-600 focus:outline-none"
                >
                  <option value="">-- Choose category --</option>
                  {subEventsList.map((sub) => (
                    <option key={sub.name} value={sub.name}>
                      {sub.name} ({sub.price})
                    </option>
                  ))}
                </select>
                {errors.subEvent && (
                  <p className="text-red-500 text-sm mt-1">{errors.subEvent}</p>
                )}
              </div>
            )}

            {/* Proceed Button */}
            <button
              onClick={handleProceedToPayment}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
