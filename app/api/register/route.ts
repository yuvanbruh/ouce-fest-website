import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local")
}

// Extend global type for hot reload safety
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, college, phone, txnId, eventName } = body

    // -------- SERVER-SIDE VALIDATION --------
    if (
      !name ||
      !college ||
      !phone ||
      !txnId ||
      !eventName
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

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

    const client = await clientPromise
    const db = client.db("oucefest")
    const collection = db.collection("registrations")

    // -------- DUPLICATE TRANSACTION CHECK --------
    const existingTxn = await collection.findOne({ txnId })

    if (existingTxn) {
      return NextResponse.json(
        { error: "Transaction ID already used" },
        { status: 400 }
      )
    }

    // -------- DUPLICATE PHONE + EVENT CHECK --------
    const duplicateUser = await collection.findOne({
      phone,
      eventName,
    })

    if (duplicateUser) {
      return NextResponse.json(
        { error: "You have already registered for this event" },
        { status: 400 }
      )
    }

    // -------- INSERT CLEAN RECORD --------
    await collection.insertOne({
      name: name.trim(),
      college: college.trim(),
      phone,
      txnId: txnId.trim(),
      eventName,
      verified: false,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "Registration successful" })
  } catch (error) {
    console.error("Registration Error:", error)
    return NextResponse.json(
      { error: "Server error. Please try again." },
      { status: 500 }
    )
  }
}