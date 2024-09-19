import SnowDatabase from "@/database/v2/snow/SnowDatabase";
import { MountainResort } from "@/common/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res)
    case "POST":
      return postHandler(req, res)
    case "PUT":
      return putHandler(req, res)
    case "DELETE":
      return deleteHandler(req, res)
    default:
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}

// GET /api/v2/snow/resort
// retrieves a resort given its id
// example: /api/v2/snow/resort?id=crystal
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (id) {
    console.log(`GET request to /api/v2/snow/resort with id: ${id}`)
    const resort = await SnowDatabase.getResortById(id as string)
    if (!resort) {
      return res.status(404).json({ message: `Resort with id "${id}" not found` })
    }
    return res.status(200).json(resort)
  } else {
    console.log(`GET request to /api/v2/snow/resort`)
    const resorts = await SnowDatabase.getResorts()
    return res.status(200).json(resorts)
  }
}

// POST /api/v2/snow/resort
// creates a new resort
async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`POST request to /api/v2/snow/resort with body: ${req.body}`)
  const allowed = await isAdmin(req)
  if (!allowed) {
    return res.status(403).json({ message: `Forbidden` })
  }

  const resort: MountainResort = req.body
  const newResort = await SnowDatabase.createResort(resort)
  return res.status(201).json(newResort)
}

// PUT /api/v2/snow/resort
// updates an existing resort
async function putHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`PUT request to /api/v2/snow/resort with body: ${req.body}`)
  const allowed = await isAdmin(req)
  if (!allowed) {
    return res.status(403).json({ message: `Forbidden` })
  }

  const resort: MountainResort = req.body
  const updatedResort = await SnowDatabase.updateResort(resort.id, resort)
  return res.status(200).json(updatedResort)
}

// DELETE /api/v2/snow/resort
// deletes an existing resort
async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`DELETE request to /api/v2/snow/resort with id: ${req.query.id}`)
  const allowed = await isAdmin(req)
  if (!allowed) {
    return res.status(403).json({ message: `Forbidden` })
  }

  const id = req.query.id as string
  await SnowDatabase.deleteResort(id)
  return res.status(204).end()
}

// returns whether a session is allowed to access the API
async function isAdmin(req: NextApiRequest) {
  // if this is the development environment, allow
  if (process.env.ENVIRONMENT === "development") {
    console.log("!!! Development environment, allowing all requests !!!")
    return true
  }

  // otherwise, check if the user is me
  const session = await getSession()
  if (!session) {
    return false
  }

  const user = session.user
  if (!user) {
    return false
  }

  const email = user.email
  if (!email) {
    return false
  }

  // list of allowed emails
  return [
    "wenjalan@gmail.com"
  ].includes(email)
}