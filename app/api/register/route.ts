import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, college, phone, txnId, eventName, subEvent } = body

    // -------- REQUIRED FIELDS --------
    if (!name || !college || !phone || !txnId || !eventName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // -------- VALIDATION --------
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      )
    }

    if (!/^[A-Za-z0-9]{10,}$/.test(txnId)) {
      return NextResponse.json(
        { error: "Invalid Transaction ID" },
        { status: 400 }
      )
    }

    // -------- REGISTRATION SUCCESS --------
    // Registration accepted (no database storage)
    return NextResponse.json({
      message: "Registration successful",
      data: {
        name: name.trim(),
        college: college.trim(),
        phone,
        txnId: txnId.trim(),
        eventName,
        subEvent: subEvent || null,
        registeredAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Registration Error:", error)

    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    )
  }
}