import { MongoClient } from "mongodb"
import mongoose from "mongoose"
import ResortModel from "./models/ResortModel"
import { MountainResort } from "./types"

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
  }
  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  mongoose.connect(process.env.MONGODB_URI)  
  console.log("Connected to MongoDB")
}

(async () => { await connectDB() })()

const getResortById = async (id: string): Promise<MountainResort | undefined> => {
  const resort = await ResortModel
    .findOne({ id })
    .exec()
  return resort?.toObject()
}

const createResort = async (resort: MountainResort): Promise<MountainResort> => {
  const newResort = new ResortModel(resort)
  await newResort.save()
  return newResort.toObject()
}

export default { getResortById, createResort }