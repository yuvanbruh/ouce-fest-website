
import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string

if (!uri) {
  throw new Error("MONGODB_URI not found")
}

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
    const { phone } = await req.json()

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Enter valid phone number" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("oucefest")
    const collection = db.collection("registrations")

    const records = await collection
      .find({ phone })
      .sort({ createdAt: -1 })
      .toArray()

    const cleaned = records.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }))

    return NextResponse.json(cleaned)

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }
}