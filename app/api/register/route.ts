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

    const auth = await getAuthenticatedClient()

    // -------- GET EXISTING DATA TO CHECK FOR DUPLICATES --------
    const readResponse = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: sheetsId,
      range: "Sheet1",
    })

    const rows = readResponse.data.values || []

    // Check for duplicate transaction ID
    const existingTxn = rows.find((row: any[]) => row[3] === txnId)
    if (existingTxn) {
      return NextResponse.json(
        { error: "Transaction ID already used" },
        { status: 400 }
      )
    }

    // Check for duplicate registration (same phone + event + subEvent)
    const duplicateUser = rows.find(
      (row: any[]) =>
        row[2] === phone &&
        row[4] === eventName &&
        (row[5] || null) === (subEvent || null)
    )
    if (duplicateUser) {
      return NextResponse.json(
        { error: "Already registered for this category" },
        { status: 400 }
      )
    }

    // -------- ADD NEW ROW --------
    const newRow = [
      name.trim(),
      college.trim(),
      phone,
      txnId.trim(),
      eventName,
      subEvent || "",
      false, // verified
      new Date().toISOString(),
    ]

    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: sheetsId,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [newRow],
      },
    })

    return NextResponse.json({
      message: "Registration successful",
    })
  } catch (error) {
    console.error("Registration Error:", error)

    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    )
  }
}