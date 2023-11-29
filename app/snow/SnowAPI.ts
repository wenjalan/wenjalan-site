export interface ResortForecastData {
  forecast: number[]
}

export async function getSnowData(url: string): Promise<ResortForecastData> {
  const res = await fetch(`/api/snow/resort/vail/forecast?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export interface ResortTerrainLiftData {
  "liftsOpen": number,
  "liftsTotal": number,
  "trailsOpen": number,
  "trailsTotal": number,
  "terrainOpenPercent": number,
}

export async function getTerrainData(url: string): Promise<ResortTerrainLiftData> {
  const res = await fetch(`/api/snow/resort/vail/terrain?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export interface ResortWeatherData {
  "name": string,
  "tempCurrent": number,
  "tempLow": number,
  "tempHigh": number,
  "snowLastDay": number | string,
  "snowLastWeek": number | string,
  "liftsOpen": number,
  "liftsTotal": number,
  "weather": "SUNNY" | "CLOUDY" | "SNOW" | "RAIN" | string,
}

export async function getWeatherData(url: string): Promise<ResortWeatherData> {
  const res = await fetch(`/api/snow/resort/vail/weather?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}