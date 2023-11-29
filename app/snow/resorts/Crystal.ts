import { Resort, SnowForecast, TerrainStatus, WeatherStatus } from "../SnowAPI"
import ResortAPI from "./ResortAPI"

function getSnowForecast(resort: Resort): Promise<SnowForecast> {
  throw new Error('Function not implemented.')
}

function getTerrainStatus(resort: Resort): Promise<TerrainStatus> {
  throw new Error('Function not implemented.')
}

function getWeatherStatus(resort: Resort): Promise<WeatherStatus> {
  throw new Error('Function not implemented.')
}

export default {
  getSnowForecast,
  getTerrainStatus,
  getWeatherStatus,
} as ResortAPI