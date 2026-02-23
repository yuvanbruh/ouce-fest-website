"use client"

import { useEffect, useState } from "react"

interface Registration {
  _id: string
  name: string
  college: string
  phone: string
  txnId: string
  eventName: string
  verified: boolean
}

export default function AdminPage() {
  const [data, setData] = useState<Registration[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/admin/registrations")
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])

  const events = Array.from(new Set(data.map((d) => d.eventName)))
  const totalRegistrations = data.length

  const filteredData = data.filter(
    (d) =>
      d.eventName === selectedEvent &&
      (d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.txnId.toLowerCase().includes(search.toLowerCase()) ||
        d.phone.includes(search))
  )

  const toggleVerify = async (id: string, current: boolean) => {
    await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, verified: !current }),
    })

    setData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, verified: !current } : item
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">
        Admin Dashboard
      </h1>

      {/* Total Registrations */}
      <div className="mb-8 bg-gray-900 border border-gray-700 p-5 rounded-xl">
        <h2 className="text-lg text-gray-400">Total Registrations</h2>
        <p className="text-3xl font-bold text-white mt-2">
          {totalRegistrations}
        </p>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {events.map((event) => {
          const count = data.filter((d) => d.eventName === event).length
          return (
            <button
              key={event}
              onClick={() => setSelectedEvent(event)}
              className="bg-gray-900 border border-gray-700 p-5 rounded-xl hover:border-cyan-400 transition text-left"
            >
              <h2 className="font-semibold text-white">
                {event}
              </h2>
              <p className="text-gray-400 mt-2">
                {count} registrations
              </p>
            </button>
          )
        })}
      </div>

      {/* Selected Event */}
      {selectedEvent && (
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-cyan-300">
            {selectedEvent}
          </h2>
          <p className="text-gray-400 mb-4">
            {filteredData.length} shown
          </p>

          <input
            type="text"
            placeholder="Search by name / txn / phone"
            className="bg-gray-900 border border-gray-700 p-3 mb-6 w-full max-w-md rounded text-white focus:outline-none focus:border-cyan-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-700">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-cyan-300 uppercase text-sm tracking-wide">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">College</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Txn ID</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((reg) => (
                  <tr key={reg._id} className="border-t border-gray-700 bg-gray-900">
                    <td className="p-4">{reg.name}</td>
                    <td className="p-4">{reg.college}</td>
                    <td className="p-4">{reg.phone}</td>
                    <td className="p-4 font-mono text-sm">{reg.txnId}</td>
                    <td className="p-4">
                      {reg.verified ? (
                        <span className="text-green-400 font-semibold">
                          Verified
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() =>
                          toggleVerify(reg._id, reg.verified)
                        }
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-semibold transition"
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredData.map((reg) => (
              <div
                key={reg._id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-4"
              >
                <p className="font-semibold text-white">{reg.name}</p>
                <p className="text-sm text-gray-400">{reg.college}</p>
                <p className="text-sm mt-2">{reg.phone}</p>
                <p className="text-xs font-mono mt-1 text-gray-400">
                  {reg.txnId}
                </p>

                <div className="flex items-center justify-between mt-4">
                  {reg.verified ? (
                    <span className="text-green-400 font-semibold text-sm">
                      Verified
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold text-sm">
                      Pending
                    </span>
                  )}

                  <button
                    onClick={() =>
                      toggleVerify(reg._id, reg.verified)
                    }
                    className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black rounded text-sm font-semibold transition"
                  >
                    Toggle
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="p-6 text-gray-400 text-center">
              No registrations found.
            </div>
          )}
        </div>
      )}
    </div>
  )
}