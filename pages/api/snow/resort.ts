import { NextApiRequest, NextApiResponse } from 'next'

// CORS proxy for API calls to Vail Resorts websites
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url
  const response = await fetch(url as string)
  const data = await response.json()
  res.status(200).json(data)
}