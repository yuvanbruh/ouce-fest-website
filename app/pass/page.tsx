"use client"

import { useState } from "react"

interface Registration {
  _id: string
  eventName: string
  subEvent?: string
  txnId: string
  verified: boolean
  createdAt: string
}

export default function PassPage() {
  const [phone, setPhone] = useState("")
  const [data, setData] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter valid 10-digit phone number")
      return
    }

    setLoading(true)
    setSearched(true)

    const res = await fetch("/api/pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    })

    const result = await res.json()
    setData(result)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-20">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8 tracking-widest">
          🎟 MY PASS
        </h1>

        {/* Search Box */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Enter your registered phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-black border border-white/30 px-4 py-3 rounded focus:outline-none focus:border-cyan-400"
          />

          <button
            onClick={handleSearch}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded transition"
          >
            {loading ? "Checking..." : "View Pass"}
          </button>
        </div>

        {/* Results */}
        {searched && !loading && data.length === 0 && (
          <p className="text-center text-gray-400">
            No registrations found.
          </p>
        )}

        <div className="space-y-6">

          {data.map((reg) => (
            <div
              key={reg._id}
              className="relative bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-2xl p-6 overflow-hidden"
            >
              {/* Ticket Cut Effect */}
              <div className="absolute left-0 top-1/2 w-6 h-6 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute right-0 top-1/2 w-6 h-6 bg-black rounded-full translate-x-1/2 -translate-y-1/2" />

              <h2 className="text-2xl font-semibold mb-2">
                {reg.eventName}
              </h2>

              {reg.subEvent && (
                <p className="text-sm text-cyan-400 mb-3">
                  {reg.subEvent}
                </p>
              )}

              <div className="text-sm text-gray-400 mb-2">
                Transaction ID:
              </div>

              <div className="font-mono text-sm mb-4">
                {reg.txnId}
              </div>

              <div className="flex justify-between items-center">

                <span className="text-sm text-gray-400">
                  {new Date(reg.createdAt).toLocaleDateString()}
                </span>

                {reg.verified ? (
                  <span className="text-green-400 font-semibold">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="text-yellow-400 font-semibold">
                    Pending Verification
                  </span>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}