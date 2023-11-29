import { TerrainStatus } from '@/app/snow/SnowAPI'
import { NextApiRequest, NextApiResponse } from 'next'
import * as htmlparser from 'htmlparser2'
import * as cssSelect from 'css-select'

// CORS proxy for API calls to Vail Resorts websites
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url
  const response = await fetch(url as string)

  if (!response.ok) {
    res.status(500).json({ error: `Error fetching Vail data from ${url}: ${response.status} ${response.statusText}`})
    return
  }

  const html = await response.text()
  const terrainData = parseTerrainDataFromHTML(html)
  res.status(200).json(terrainData)
}

function parseTerrainDataFromHTML(html: string): TerrainStatus {
  const dom = htmlparser.parseDOM(html)
  const openSpans = cssSelect.selectAll('span.c118__number1--v1', dom)
  const totalSpans = cssSelect.selectAll('span.c118__number2--v1', dom)
  // @ts-ignore: trust me bro
  const [liftsOpen, trailsOpen, terrainOpenPercent] = openSpans.map(span => span.children[0].data)
  // @ts-ignore: just trust me bro
  const [liftsTotal, trailsTotal] = totalSpans.map(span => span.children[0].data)

  return {
    liftsOpen: parseInt(liftsOpen),
    liftsTotal: parseInt(liftsTotal.substring(1)), // removes a leading /
    trailsOpen: parseInt(trailsOpen),
    trailsTotal: parseInt(trailsTotal.substring(1)), // removes a leading /
    terrainOpenPercent: parseInt(terrainOpenPercent),
  }
}