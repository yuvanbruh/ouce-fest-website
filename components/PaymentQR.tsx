"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface PaymentQRProps {
  name: string
  eventName: string
  phone: string
  subEvent?: string
  price?: string
}

export function PaymentQR({
  name,
  eventName,
  phone,
  subEvent,
  price,
}: PaymentQRProps) {
  const [qrUrl, setQrUrl] = useState("")
  const [upiLink, setUpiLink] = useState("")

  useEffect(() => {
    if (!name || !eventName) return

    // Generate UPI string with user name in remark
    const upiId = "mecharena@sbi" // 👈 REPLACE WITH YOUR UPI ID
    const amount = "100" // Default amount
    const remark = subEvent
      ? `${eventName} - ${subEvent} - ${name}`
      : `${eventName} - ${name}`

    const upi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent("OUCE FEST")}&am=${amount}&tn=${encodeURIComponent(remark)}`

    setUpiLink(upi)

    // Generate QR code using Google Charts API
    const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(upi)}`
    setQrUrl(qrCodeUrl)
  }, [name, eventName, subEvent])

  return (
    <div className="text-center space-y-4">
      <div>
        <p className="font-semibold mb-2">Scan QR Code with UPI App</p>
        <p className="text-sm text-muted-foreground mb-4">
          Payment Remark: <span className="text-cyan-400">{eventName} {subEvent && `- ${subEvent}`} - {name}</span>
        </p>
      </div>

      {qrUrl ? (
        <div className="flex justify-center">
          <img
            src={qrUrl}
            alt="Payment QR Code"
            width={250}
            height={250}
            className="rounded-lg border border-white/20"
          />
        </div>
      ) : (
        <div className="w-64 h-64 bg-gray-900 rounded-lg animate-pulse flex items-center justify-center mx-auto">
          Generating QR...
        </div>
      )}

      <div className="text-sm text-muted-foreground pt-2">
        Registration will be confirmed only after successful payment.
        <br />
        <span className="text-cyan-500">Your name will be sent as remark in the UPI transaction.</span>
      </div>

      {upiLink && (
        <a
          href={upiLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded font-semibold mt-4 transition"
        >
          💳 Open in UPI App
        </a>
      )}
    </div>
  )
}
