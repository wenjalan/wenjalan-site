import Vail from './resorts/Vail'
import Crystal from './resorts/Crystal'

export interface Resort {
  name: string,
  id: string,
  isVailResort: boolean,
  url: string,
  statusUrl: string,
  snowForecastUrl: string,
  weatherDataUrl: string,
  camPreviews: string[] | undefined,
  liveCameras: string[] | undefined,
}

export interface SnowForecast {
  forecast: number[]
}

export async function getSnowForecast(resort: Resort): Promise<SnowForecast> {
  if (resort.isVailResort) return Vail.getSnowForecast(resort)
  switch (resort.name) {
    case 'Crystal Mountain, WA':
      return Crystal.getSnowForecast(resort)
    default: 
      throw new Error(`Resort ${resort.name} is not supported`)
  }
}

export interface TerrainStatus {
  "liftsOpen": number,
  "liftsTotal": number,
  "trailsOpen": number,
  "trailsTotal": number,
  "terrainOpenPercent": number,
}

export async function getTerrainStatus(resort: Resort): Promise<TerrainStatus> {
  if (resort.isVailResort) return Vail.getTerrainStatus(resort)
  switch (resort.name) {
    case 'Crystal Mountain, WA':
      return Crystal.getTerrainStatus(resort)
    default:
      throw new Error(`Resort ${resort.name} is not supported`)
  }
}

export interface WeatherStatus {
  "tempCurrent": number,
  "tempLow": number,
  "tempHigh": number,
  "snowLastDay": number,
  "weather": "SUNNY" | "CLOUDY" | "SNOW" | "RAIN" | string,
}

export async function getWeatherStatus(resort: Resort): Promise<WeatherStatus> {
  if (resort.isVailResort) return Vail.getWeatherStatus(resort)
  switch (resort.name) {
    case 'Crystal Mountain, WA':
      return Crystal.getWeatherStatus(resort)
    default:
      throw new Error(`Resort ${resort.name} is not supported`)
  }
}