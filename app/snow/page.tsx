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
      <i>First 3 numbers are the current, low and high temps. The next 3 are snowfall past 24 hours, next 24, and next 3 days. Final 3 are lifts open, trails open, and total terrain open.</i>
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

  // sum all elements of snow to get next 7 days
  const snowNext7d_cm = resort.snow.forecast.reduce((a, b) => a + b, 0)
  const snowNext7d_in = Math.round(snowNext7d_cm / 2.54)


  return (
    <div className="p-2 bg-slate-700 flex flex-col gap-2 drop-shadow-lg rounded">
      <h1 className="font-bold text-xl text-center"><a href={props.resort.url} target="_blank">{props.resort.name}</a></h1>
      <span className="flex flex-row text-white gap-1 text-sm leading-10 text-center">
        <EmojiIcon emoji="🌡️" />
        <TempIndicator title="Current Temp F" temp={resort.weather.tempCurrent} srcUrl={props.resort.weatherUrl} />
        <TempIndicator title="Low Temp F" temp={resort.weather.tempLow} srcUrl={props.resort.weatherUrl} />
        <TempIndicator title="Hi Temp F" temp={resort.weather.tempHigh} srcUrl={props.resort.weatherUrl} />
      </span>
      <span className="flex flex-row text-white gap-1 text-sm leading-10 text-center">
        <EmojiIcon emoji="❄️ " />
        <InverseSnowIndicator title={"Snow Last 24h"} inches={resort.weather.snowLastDay} srcUrl={props.resort.snowForecastUrl} />
        <SnowIndicator title={"Snow Next 24h"} inches={snowNext24h_in} srcUrl={props.resort.snowForecastUrl} />
        <SnowIndicator title={"Snow Next 7d"} inches={snowNext7d_in} srcUrl={props.resort.snowForecastUrl} />
      </span>
      <span className="flex flex-row text-white gap-1 text-sm leading-10 text-center">
        <EmojiIcon emoji="🚡" />
        <Indicator options={{ href: props.resort.statusUrl, title: "Lifts Open"}}>{resort.terrain.liftsOpen}/{resort.terrain.liftsTotal}</Indicator>
        <Indicator options={{ href: props.resort.statusUrl, title: "Trails Open"}}>{resort.terrain.trailsOpen}/{resort.terrain.trailsTotal}</Indicator>
        <PercentIndicator title={"Terrain Open"} percent={resort.terrain.terrainOpenPercent} srcUrl={props.resort.statusUrl} />
      </span>
    </div>
  )
}

interface IndicatorOptions {
  title?: string,
  href?: string,
  color?: string,
  backgroundColor?: string,
}

function Indicator(props: { options?: IndicatorOptions, children: React.ReactNode }) {
  const options = props.options
  return (
    <span
      title={options?.title ?? undefined}
      className="cursor-pointer w-10 h-10 rounded font-bold"
      onClick={options?.href ? () => open(options?.href) : undefined}
      style={{
        color: options?.color ?? "black",
        backgroundColor: options?.backgroundColor ?? "white",
      }}
    >
      {props.children}
    </span>
  )
}

function EmojiIcon(props: { emoji: string }) {
  return <span className="text-2xl leading-10 w-10 h-10">{props.emoji}</span>
}

function PercentIndicator(props: { title: string, percent: number, srcUrl: string }) {
  const p = props.percent
  const display = p + "%"

  let color = "#EF4444"
  if (p === 100) color = "#10B981" // bg-green-700
  else if (p > 90) color = "#22D3EE" // bg-emerald-700
  else if (p > 50) color = "#FBBF24" // bg-amber-700
  else if (p > 10) color = "#F59E0B" // bg-orange-700

  return (
    <Indicator options={{
      title: props.title,
      href: props.srcUrl,
      color: "white",
      backgroundColor: color
    }}>
      {display}
    </Indicator>
  )
}

function TempIndicator(props: { title: string, temp: number, srcUrl: string }) {
  const t = props.temp
  const display = t + "°"
  let color

  // bg-green-600
  if (t > 32) color = "#10B981"
  // bg-cyan-600
  else if (t > 20) color = "#22D3EE"
  // bg-blue-600
  else if (t > 10) color = "#3B82F6"
  // bg-indigo-700
  else if (t > 0) color = "#6366F1"
  // bg-violet-700
  else color = "#8B5CF6"

  return (
    <Indicator options={{
      title: props.title,
      backgroundColor: color,
      href: props.srcUrl
    }}>
      {display}
    </Indicator>
  )
}

function SnowIndicator(props: { title: string, inches: number, srcUrl: string }) {
  const i = props.inches
  const display = i === 0 ? "-" : i + "\""

  // red = [15, sqrt(i) * 15, 100]
  const red = Math.max(Math.min(Math.sqrt(i) * 15, 100), 15)
  const green = Math.min(red / 2, 5)
  const blue = Math.min(red / 2, 10)
  const color = `rgb(${red}%, ${green}%, ${blue}%)`

  return (
    <Indicator options={{
      title: props.title,
      color: "white",
      backgroundColor: color,
      href: props.srcUrl
    }}>
      {display}
    </Indicator>
  )
}

// like the above but the bg is white and the text is red
function InverseSnowIndicator(props: { title: string, inches: number, srcUrl: string }) {
  const i = props.inches
  const display = i === 0 ? "-" : i + "\""

  // red = [15, sqrt(i) * 15, 100]
  const red = Math.max(Math.min(Math.sqrt(i) * 15, 100), 15)
  const green = Math.min(red / 2, 5)
  const blue = Math.min(red / 2, 10)
  const color = `rgb(${red}%, ${green}%, ${blue}%)`

  return <Indicator options={{
    title: props.title,
    backgroundColor: "white",
    color: color,
    href: props.srcUrl
  }}>{display}</Indicator>
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