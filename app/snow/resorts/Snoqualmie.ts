import { Resort, SnowForecast, TerrainStatus, WeatherStatus } from "../SnowAPI"
import ResortAPI from "./ResortAPI"

async function getSnowForecast(resort: Resort): Promise<SnowForecast> {
  const res = await fetch(`/api/snow/resort/snowforecast?url=${resort.snowForecastUrl}`)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

async function getTerrainStatus(resort: Resort): Promise<TerrainStatus> {
  throw new Error('Not implemented')
}

async function getWeatherStatus(resort: Resort): Promise<WeatherStatus> {
  throw new Error('Not implemented')
}

export default {
  getSnowForecast,
  getTerrainStatus,
  getWeatherStatus,
} as ResortAPI