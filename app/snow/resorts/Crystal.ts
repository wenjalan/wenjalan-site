import { Resort, SnowForecast, TerrainStatus, WeatherStatus } from "../SnowAPI"
import ResortAPI from "./ResortAPI"

async function getSnowForecast(resort: Resort): Promise<SnowForecast> {
  const res = await fetch(`/api/snow/resort/snowforecast?url=${resort.snowForecastUrl}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

async function getTerrainStatus(resort: Resort): Promise<TerrainStatus> {
  const res = await fetch(`/api/snow/resort/crystal/terrain?statusUrl=${resort.statusUrl}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

async function getWeatherStatus(resort: Resort): Promise<WeatherStatus> {
  const res = await fetch(`/api/snow/resort/crystal/weather?statusUrl=${resort.statusUrl}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export default {
  getSnowForecast,
  getTerrainStatus,
  getWeatherStatus,
} as ResortAPI