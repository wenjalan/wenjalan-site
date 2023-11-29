export interface Resort {
  name: string,
  isVail: boolean,
  url: string,
  statusUrl: string,
  weatherUrl: string,
  weatherDataUrl: string,
  snowForecastUrl: string,
}

export interface SnowForecast {
  forecast: number[]
}

export async function getSnowForecast(resort: Resort): Promise<SnowForecast> {
  if (resort.isVail) return getVailSnowForecast(resort)
  throw new Error(`Resort ${resort.name} is not supported`)
}

async function getVailSnowForecast(resort: Resort): Promise<SnowForecast> {
  const res = await fetch(`/api/snow/resort/vail/forecast?url=${resort.snowForecastUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export interface TerrainStatus {
  "liftsOpen": number,
  "liftsTotal": number,
  "trailsOpen": number,
  "trailsTotal": number,
  "terrainOpenPercent": number,
}

export async function getTerrainStatus(resort: Resort): Promise<TerrainStatus> {
  if (resort.isVail) return getVailTerrainStatus(resort)
  throw new Error(`Resort ${resort.name} is not supported`)
}

async function getVailTerrainStatus(resort: Resort): Promise<TerrainStatus> {
  const res = await fetch(`/api/snow/resort/vail/terrain?url=${resort.statusUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export interface WeatherStatus {
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

export async function getWeatherStatus(resort: Resort): Promise<WeatherStatus> {
  if (resort.isVail) return getVailWeatherStatus(resort)
  throw new Error(`Resort ${resort.name} is not supported`)
}

export async function getVailWeatherStatus(resort: Resort): Promise<WeatherStatus> {
  const res = await fetch(`/api/snow/resort/vail/weather?url=${resort.weatherDataUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}