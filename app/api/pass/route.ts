import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { phone } = await req.json()

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Enter valid phone number" },
        { status: 400 }
      )
    }

    // -------- NO REGISTRATIONS STORED --------
    // Return empty array since no database is configured
    return NextResponse.json([])
  } catch (error) {
    console.error("Pass Error:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}