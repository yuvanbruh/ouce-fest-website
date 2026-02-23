import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

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

export async function POST(req: Request) {
  try {
    const { id, verified } = await req.json()

    const client = await clientPromise
    const db = client.db("oucefest")
    const collection = db.collection("registrations")

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { verified } }
    )

    return NextResponse.json({ message: "Updated" })
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}