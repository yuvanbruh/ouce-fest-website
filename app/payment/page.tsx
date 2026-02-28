"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import QRCode from "qrcode"

const events = [
  { id: 1, name: "Mechathon", price: "₹249" },
  { id: 2, name: "Business Events", price: "₹100" },
  { id: 3, name: "Open Loop Events", price: "Will be updated soon" },
  { id: 4, name: "Navadhara Praudyogika", price: "₹499" },
  { id: 5, name: "3D Printing Hackathon", price: "₹799" },
  { id: 6, name: "Technical Events" },
  { id: 7, name: "Robotic Events" },
  { id: 9, name: "Autonomous Drone Challenge", price: "₹499" },
  { id: 8, name: "Workshops" },
]

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [txnId, setTxnId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [upiLink, setUpiLink] = useState("")

  const name = searchParams.get("name") || ""
  const college = searchParams.get("college") || ""
  const phone = searchParams.get("phone") || ""
  const eventId = searchParams.get("eventId") || ""
  const subEvent = searchParams.get("subEvent") || ""

  const selectedEvent = events.find((e) => e.id === parseInt(eventId))
  const eventName = selectedEvent?.name || "Unknown Event"

  // Extract amount from price
  let amount = "0"
  if (selectedEvent?.price && selectedEvent.price.includes("₹")) {
    amount = selectedEvent.price.replace("₹", "").trim()
  }

  // Generate UPI Link dynamically
  useEffect(() => {
    if (!name || !eventId) {
      router.push("/register")
      return
    }

    if (!amount || amount === "0") {
      return
    }

    const upiId = "mecharena@sbi"
    const payeeName = "Mecharena 2026"
    const fullEvent = subEvent ? `${eventName} - ${subEvent}` : eventName
    
    // Unique reference with timestamp
    const reference = `${name.replace(/\s+/g, "")}-${fullEvent.replace(/\s+/g, "")}-${Date.now()}`
    
    // Generate UPI link
    const link = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`${name} - ${fullEvent}`)}`
    
    setUpiLink(link)

    // Generate QR Code from UPI link
    QRCode.toDataURL(link)
      .then((qrDataUrl: string) => {
        setQrCode(qrDataUrl)
      })
      .catch((err: unknown) => {
        console.error("Error generating QR code:", err)
      })
  }, [name, eventId, eventName, subEvent, amount, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!txnId.trim()) {
      setError("Please enter transaction ID")
      return
    }

    if (!/^[A-Za-z0-9]{10,}$/.test(txnId)) {
      setError("Transaction ID must be at least 10 characters")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          college,
          phone,
          txnId,
          eventName,
          subEvent,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed. Try again.")
        setLoading(false)
        return
      }

      setSuccess("🎉 Registration successful! Check your passes in 'My Passes'")
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (err) {
      setError("Server error. Please try again.")
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary text-center mb-2">
            Payment & Confirmation
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Review your details and complete payment
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Registration Details */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-primary">
                  Registration Details
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-lg font-semibold text-white">{name}</p>
                  </div>

                  {/* College */}
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">College</p>
                    <p className="text-lg font-semibold text-white">{college}</p>
                  </div>

                  {/* Phone */}
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-lg font-semibold text-white">{phone}</p>
                  </div>

                  {/* Event */}
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Event</p>
                    <p className="text-lg font-semibold text-white">
                      {eventName}
                    </p>
                  </div>

                  {/* Sub-event if selected */}
                  {subEvent && (
                    <div className="pb-4 border-b border-border">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-lg font-semibold text-white">
                        {subEvent}
                      </p>
                    </div>
                  )}

                  {/* Price */}
                  <div className="pt-2 bg-cyan-600/10 border border-cyan-600/30 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Payment Amount</p>
                    <p className="text-3xl font-bold text-cyan-600">
                      {selectedEvent?.price || "Price not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Payment & Transaction */}
            <div className="space-y-6">
              {/* UPI Payment Section */}
              <div className="bg-card border border-cyan-600/50 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-bold text-primary">
                  📱 Complete Payment
                </h2>

                {/* QR Code */}
                {qrCode && (
                  <div className="flex justify-center">
                    <img 
                      src={qrCode} 
                      alt="UPI QR Code" 
                      className="w-48 h-48 border-2 border-cyan-600 rounded-lg p-2 bg-white"
                    />
                  </div>
                )}

                {/* UPI ID Display */}
                <div className="bg-background rounded-lg p-4 text-center space-y-3 border border-cyan-600/30">
                  <p className="text-xs text-muted-foreground">UPI ID</p>
                  <div className="flex items-center justify-center gap-2">
                    <code className="text-base font-mono font-bold text-cyan-600">
                      mecharena@sbi
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("mecharena@sbi")
                        alert("UPI ID copied!")
                      }}
                      className="px-3 py-1 text-xs bg-cyan-600 hover:bg-cyan-700 text-white rounded transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Quick Pay Button - Opens UPI App */}
                {upiLink && (
                  <a 
                    href={upiLink}
                    className="block"
                  >
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                    >
                      💳 Pay via UPI (Open App)
                    </button>
                  </a>
                )}

                {/* Instructions */}
                <div className="text-xs text-muted-foreground space-y-2 pt-3 border-t border-border">
                  <p className="font-semibold text-white">📋 How to pay:</p>
                  <ul className="space-y-1 text-left">
                    <li>✓ Scan QR code with any UPI app</li>
                    <li>✓ OR click "Pay via UPI" button</li>
                    <li>✓ Amount & details auto-filled</li>
                    <li>✓ Complete payment in your app</li>
                  </ul>
                </div>
              </div>

              {/* Transaction ID Form */}
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-primary">
                  ✅ Confirm Payment
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Transaction ID / Reference Number
                    </label>
                    <input
                      type="text"
                      value={txnId}
                      onChange={(e) => setTxnId(e.target.value)}
                      placeholder="Enter transaction ID from your UPI app"
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-cyan-600 focus:outline-none"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get this from your UPI app after successful payment
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 font-semibold">
                      {success}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    {loading ? "Processing..." : "Complete Registration"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
