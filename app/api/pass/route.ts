import { NextResponse } from "next/server"
import { google } from "googleapis"

const sheets = google.sheets("v4")
const sheetsId = process.env.GOOGLE_SHEETS_ID

// Helper to get authenticated client
async function getAuthenticatedClient() {
  const auth = new google.auth.GoogleAuth({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    },
  })

  return auth
}

export async function POST(req: Request) {
  try {
    const { phone } = await req.json()

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Enter valid phone number" },
        { status: 400 }
      )
    }

    const auth = await getAuthenticatedClient()

    // -------- GET DATA FROM SHEETS --------
    const readResponse = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: sheetsId,
      range: "Sheet1",
    })

    const rows = readResponse.data.values || []

    // Filter records by phone number (column 2 - index 2)
    const registrations = rows
      .filter((row: any[]) => row[2] === phone)
      .map((row: any[]) => ({
        name: row[0],
        college: row[1],
        phone: row[2],
        txnId: row[3],
        eventName: row[4],
        subEvent: row[5] || null,
        verified: row[6] === "TRUE" || row[6] === true,
        createdAt: row[7],
      }))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )

    return NextResponse.json(registrations)
  } catch (error) {
    console.error("Pass Error:", error)
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}