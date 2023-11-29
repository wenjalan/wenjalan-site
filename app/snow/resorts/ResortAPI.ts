import { Resort, SnowForecast, TerrainStatus, WeatherStatus } from "../SnowAPI"

export default interface ResortAPI {
  getSnowForecast(resort: Resort): Promise<SnowForecast>
  getTerrainStatus(resort: Resort): Promise<TerrainStatus>
  getWeatherStatus(resort: Resort): Promise<WeatherStatus>
}