import { VailResortStatus } from "@/pages/api/snow/resort/vail/status"
import { Resort, SnowForecast, TerrainStatus, WeatherStatus } from "../SnowAPI"
import ResortAPI from "./ResortAPI"

async function getSnowForecast(resort: Resort): Promise<SnowForecast> {
  const res = await fetch(`/api/snow/resort/snowforecast?url=${resort.snowForecastUrl}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

async function getTerrainStatus(resort: Resort): Promise<TerrainStatus> {
  const res = await fetch(`/api/snow/resort/vail/status?id=${resort.id}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const status = await res.json() as VailResortStatus
  const terrainStatus: TerrainStatus = {
    liftsOpen: status.lifts?.open ?? 0,
    liftsTotal: status.lifts?.total ?? 0,
    trailsOpen: status.runs?.open ?? 0,
    trailsTotal: status.runs?.total ?? 0,
    terrainOpenPercent: status.terrainPercentage.open,
  }
  return terrainStatus
}

async function getWeatherStatus(resort: Resort): Promise<WeatherStatus> {
  const res = await fetch(`/api/snow/resort/vail/weather?url=${resort.weatherDataUrl}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export default {
  getSnowForecast,
  getTerrainStatus,
  getWeatherStatus,
} as ResortAPI