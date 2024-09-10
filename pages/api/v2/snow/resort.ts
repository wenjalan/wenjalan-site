import SnowDatabase from "@/database/v2/snow/SnowDatabase";
import { MountainResort } from "@/database/v2/snow/types";
import { NextApiRequest, NextApiResponse } from "next";


// mock resort
const resort: MountainResort = {
  name: "Crystal Mountain",
  id: "crystalmountainresort",
  url: "https://crystalmountainresort.com",
  pass: "ikon",
  location: {
    latitude: 46.9358,
    longitude: -121.4741
  },
  weather: {
    current: {
      temperature: 0,
      status: "snowing"
    },
    forecast: {
      snow: [0, 0, 0, 0, 0, 0, 0]
    }
  },
  webcams: [
    {
      type: "photo",
      src: "https://crystalmountainresort.com/webcams/crystal-mountain-base-cam/"
    },
    {
      type: "photo",
      src: "https://crystalmountainresort.com/webcams/crystal-mountain-summit-cam/"
    }
  ],
  sns: {
    twitter: "https://twitter.com/crystalmt"
  }
}

// GET /api/v2/snow/resort
// retrieves a resort given its id
// example: /api/v2/snow/resort?id=crystal
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getHandler(req, res)
  } else if (req.method === "POST") {
    return postHandler(req, res)
  } else {
    return res.status(405).json({ message: "Method not allowed" })
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  console.log(`GET request to /api/v2/snow/resort with id: ${id}`)

  const resort = await SnowDatabase.getResortById(id as string)
  // if the resort is not found, return 404
  if (!resort) {
    return res.status(404).json({ message: `Resort with id "${id}" not found` })
  }

  // if the resort is found, return it
  return res.status(200).json(resort)
}

// POST /api/v2/snow/resort
// creates a new resort
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`POST request to /api/v2/snow/resort with body: ${req.body}`)
  const resort: MountainResort = req.body
  const newResort = await SnowDatabase.createResort(resort)
  return res.status(201).json(newResort)
}