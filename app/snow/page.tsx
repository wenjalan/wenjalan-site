'use client'
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RESORTS from "./resorts.json"
import './snow.css'
import { 
  Resort,
  SnowForecast,
  TerrainStatus,
  WeatherStatus, 
  getSnowForecast,
  getTerrainStatus,
  getWeatherStatus, 
} from "./SnowAPI";


export default function Snow() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Main />
    </div>
  )
}

function Main() {
  const resorts = RESORTS as Resort[]

  return (
    <main className="m-2 p-2 bg-slate-800 flex flex-col gap-2 text-white drop-shadow-lg">
      <h1 className="font-bold text-xl">Snow Report</h1>
      <p className="text-lg">Collects temperature, snowfall, lift status and trail status from various ski resorts.</p>
      <i>First 3 numbers are the low, current, and high temperatures. The next 3 are snowfall in the next 24, next 3 days, and next week.</i>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {
          resorts.length === 0 ?
            "Loading..." :
            resorts.map(resort => <Resort key={resort.name} resort={resort} />)
        }
      </div>
    </main>
  )
}

function Resort(props: { resort: Resort }) {
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus | null>(null)
  const [terrainStatus, setTerrainStatus] = useState<TerrainStatus | null>(null)
  const [snowForecast, setSnowForecast] = useState<SnowForecast | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!weatherStatus || !terrainStatus || !snowForecast) {
      console.log('Fetching data for ' + props.resort.name + '...')
      const weatherPromise = getWeatherStatus(props.resort)
      const terrainPromise = getTerrainStatus(props.resort)
      const snowPromise = getSnowForecast(props.resort)
      Promise.all([weatherPromise, terrainPromise, snowPromise]).then(values => {
        const weather = values[0]
        const terrain = values[1]
        const snow = values[2]
        setWeatherStatus(weather)
        setTerrainStatus(terrain)
        setSnowForecast(snow)
      }).catch(e => {
        setError(e.message)
      })
    }
  }, [weatherStatus, terrainStatus, snowForecast, props.resort])

  if (!weatherStatus || !terrainStatus || !snowForecast) {
    return (
      <div className="p-2 bg-slate-700 flex flex-col gap-2 drop-shadow-lg rounded">
        <h1 className="flex-1 font-bold text-xl text-slate-800"><a href={props.resort.url} target="_blank">{props.resort.name}</a></h1>
        <span className="flex-1 text-center">
          {error ? <p><EmojiIcon emoji="⚠️" />Error: {error}</p> : <EmojiIcon emoji="🔍" />}
        </span>
      </div >
    )
  }

  const resort = {
    name: props.resort.name,
    snow: snowForecast,
    terrain: terrainStatus,
    weather: weatherStatus,
  }

  // sum first 3 elements of snow to get next 24 hours
  const snowNext24h_cm = resort.snow.forecast.slice(0, 3).reduce((a, b) => a + b, 0)
  const snowNext24h_in = Math.round(snowNext24h_cm / 2.54)

  // sum first 9 elements of snow to get next 3 days
  const snowNext3d_cm = resort.snow.forecast.slice(0, 9).reduce((a, b) => a + b, 0)
  const snowNext3d_in = Math.round(snowNext3d_cm / 2.54)

  // sum all elements of snow to get next 7 days
  const snowNext7d_cm = resort.snow.forecast.reduce((a, b) => a + b, 0)
  const snowNext7d_in = Math.round(snowNext7d_cm / 2.54)


  return (
    <div className="p-2 bg-slate-700 flex flex-col gap-2 drop-shadow-lg rounded">
      <h1 className="font-bold text-xl text-center"><a href={props.resort.url} target="_blank">{props.resort.name}</a></h1>
      <span className="flex flex-row text-white gap-1 text-sm leading-10 text-center">
        <EmojiIcon emoji="🌡️" />
        <TempIndicator temp={resort.weather.tempLow} srcUrl={props.resort.weatherUrl} />
        <TempIndicator temp={resort.weather.tempCurrent} srcUrl={props.resort.weatherUrl} />
        <TempIndicator temp={resort.weather.tempHigh} srcUrl={props.resort.weatherUrl} />
      </span>
      <span className="flex flex-row text-white gap-1 text-sm leading-10 text-center">
        <EmojiIcon emoji="❄️ " />
        <SnowIndicator inches={snowNext24h_in} srcUrl={props.resort.snowForecastUrl} />
        <SnowIndicator inches={snowNext3d_in} srcUrl={props.resort.snowForecastUrl} />
        <SnowIndicator inches={snowNext7d_in} srcUrl={props.resort.snowForecastUrl} />
      </span>
      <span className="flex flex-row text-white gap-1 text-sm leading-10 text-center">
        <EmojiIcon emoji="🚡" />
        <PercentIndicator percent={resort.terrain.terrainOpenPercent} srcUrl={props.resort.statusUrl} />
      </span>
    </div>
  )
}

function EmojiIcon(props: { emoji: string }) {
  return <span className="text-2xl leading-10 w-10 h-10">{props.emoji}</span>
}

function PercentIndicator(props: { percent: number, srcUrl: string }) {
  const p = props.percent
  const display = p + "%"
  if (p === 100) {
    return <span className="cursor-pointer bg-green-700 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  if (p > 90) {
    return <span className="cursor-pointer bg-emerald-700 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  if (p > 50) {
    return <span className="cursor-pointer bg-amber-700 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  if (p > 10) {
    return <span className="cursor-pointer bg-orange-700 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  return <span className="cursor-pointer bg-red-700 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
}

function TempIndicator(props: { temp: number, srcUrl: string }) {
  const t = props.temp
  const display = t + "°"
  if (t > 32) {
    return <span className="cursor-pointer bg-green-600 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  if (t > 20) {
    return <span className="cursor-pointer bg-cyan-600 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  if (t > 10) {
    return <span className="cursor-pointer bg-blue-600 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  if (t > 0) {
    return <span className="cursor-pointer bg-indigo-700 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
  else {
    return <span className="cursor-pointer bg-violet-700 w-10 h-10 rounded" onClick={(e) => open(props.srcUrl)}>{display}</span>
  }
}

function SnowIndicator(props: { inches: number, srcUrl: string }) {
  const i = props.inches
  const display = i === 0 ? "-" : i + "\""

  // red = [15, sqrt(i) * 15, 100]
  const red = Math.max(Math.min(Math.sqrt(i) * 15, 100), 15)
  const green = Math.min(red / 2, 5)
  const blue = Math.min(red / 2, 10)
  const color = `rgb(${red}%, ${green}%, ${blue}%)`

  return <span className="cursor-pointer w-10 h-10 text-white rounded" onClick={(e) => open(props.srcUrl)} style={{
    backgroundColor: color,
  }}>{display}</span>
}

function weatherToEmoji(weather: WeatherStatus["weather"]): string {
  switch (weather) {
    case "SUNNY":
      return "☀️"
    case "CLOUDY":
      return "☁️"
    case "SNOW":
      return "❄️"
    case "RAIN":
      return "🌧️"
    case "WINDY":
      return "💨"
    default:
      return weather
  }
}