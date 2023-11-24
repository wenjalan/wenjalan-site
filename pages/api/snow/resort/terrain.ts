import ResortTerrainLiftData from '@/app/snow/ResortTerrainLiftData'
import { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'

// CORS proxy for API calls to Vail Resorts websites
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Parse HTML for info
  // const url = req.query.url
  // const response = await fetch(url as string)
  // const data = await response.text()
  res.status(200).json({
    name: "Stub",
    liftsOpen: -1,
    liftsTotal: -1,
    trailsOpen: -1,
    trailsTotal: -1,
    terrainOpenPercent: -1,
  })
}

