import { Resort, SnowForecast, TerrainStatus, WeatherStatus } from "../SnowAPI"
import ResortAPI from "./ResortAPI"

async function getSnowForecast(resort: Resort): Promise<SnowForecast> {
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

async function getTerrainStatus(resort: Resort): Promise<TerrainStatus> {
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

async function getWeatherStatus(resort: Resort): Promise<WeatherStatus> {
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

export default {
  getSnowForecast,
  getTerrainStatus,
  getWeatherStatus,
} as ResortAPI