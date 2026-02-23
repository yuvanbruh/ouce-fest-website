import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI as string

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  const client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("oucefest")
    const collection = db.collection("registrations")

    const registrations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(registrations)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    )
  }
}