import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { id, verified } = await req.json()

    // No database persistence - return success
    return NextResponse.json({ message: "Updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}