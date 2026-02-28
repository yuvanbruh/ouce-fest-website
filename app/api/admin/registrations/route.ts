import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return empty registrations (no database persistence)
    return NextResponse.json([])
  } catch (error) {
    console.error("Admin Fetch Error:", error)

    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    )
  }
}