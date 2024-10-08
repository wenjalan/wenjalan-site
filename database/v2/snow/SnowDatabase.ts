import { MongoClient } from "mongodb"
import mongoose from "mongoose"
import ResortModel from "./models/ResortModel"
import { MountainResort } from "../../../common/types"

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

const getResorts = async (): Promise<MountainResort[]> => {
  const resorts = await ResortModel
    .find()
    .exec()
  return resorts.map(resort => resort.toObject())
}

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

const updateResort = async (id: string, resort: MountainResort): Promise<MountainResort | undefined> => {
  const updatedResort = await ResortModel
    .findOneAndUpdate({ id }, resort, { new: true })
    .exec()
  return updatedResort?.toObject()
}

const deleteResort = async (id: string): Promise<MountainResort | undefined> => {
  const deletedResort = await ResortModel
    .findOneAndDelete({ id })
    .exec()
  return deletedResort?.toObject()
}

export default { getResortById, createResort, updateResort, deleteResort, getResorts }