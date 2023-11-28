'use client'
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";
import RESORTS from "./resorts.json"
import './snow.css'
import ResortWeatherData from "./ResortWeatherData";
import ResortTerrainLiftData from "./ResortTerrainLiftData";
import { ResortForecastData } from "./ResortForecastData";


export default function Snow() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Main />
    </div>
  )
}

interface ResortMetadata {
  name: string,
  statusUrl: string,
  weatherDataUrl: string,
  snowForecastUrl: string,
}

interface ResortData {
  name: string,
  weather: ResortWeatherData,
  terrain: ResortTerrainLiftData,
  snow: ResortForecastData,
}

function Main() {
  const resortsMetadata = RESORTS as ResortMetadata[]
  const [resorts, setResorts] = useState<ResortData[]>([])

  useEffect(() => {
    const resortsData: ResortData[] = []
    resortsMetadata.forEach((resortMetadata, i) => {
      const weatherPromise = getWeatherData(resortMetadata.weatherDataUrl)
      const terrainPromise = getTerrainData(resortMetadata.statusUrl)
      const snowPromise = getSnowData(resortMetadata.snowForecastUrl)
      Promise.all([weatherPromise, terrainPromise, snowPromise])
        .then(([weather, terrain, snow]) => {
          resortsData.push({
            name: resortMetadata.name,
            weather: weather,
            terrain: terrain,
            snow: snow,
          })
          if (resortsData.length === resortsMetadata.length) {
            setResorts(resortsData)
          }
        })
    })
  }, [resortsMetadata])

  return (
    <main className="m-2 p-2 bg-slate-800 flex flex-col gap-2 sm:max-w-xl text-white drop-shadow-lg">
      <h1 className="font-bold text-xl">Snow Report</h1>
      <p className="text-lg">Collects temperature, snowfall, lift status and trail status from various ski resorts.</p>
      <i>First 3 numbers are the low, current, and high temperatures. The next 3 are snowfall in the next 24, next 3 days, and next week.</i>
      {
        resorts.length === 0 ?
          "Loading..." :
          resorts.map(resort => <Resort key={resort.name} resort={resort} />)
      }
    </main>
  )
}

function Resort(props: { resort: ResortData }) {
  const resort = props.resort

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
    <div className="p-2 bg-slate-700 flex flex-col gap-2 drop-shadow-lg">
      <span className="flex flex-row">
        <h1 className="flex-1 font-bold text-xl">{resort.name}</h1>
        <span className="flex-1 text-end font-bold text-xl">❄️ {snowNext7d_in}&quot; {weatherToEmoji(resort.weather.weather)} {resort.weather.tempCurrent}°F</span>
      </span>
      <span className="flex flex-row text-black gap-2">
        <TempIndicator temp={resort.weather.tempLow} />
        <TempIndicator temp={resort.weather.tempCurrent} />
        <TempIndicator temp={resort.weather.tempHigh} />
        <SnowIndicator inches={snowNext24h_in} />
        <SnowIndicator inches={snowNext3d_in} />
        <SnowIndicator inches={snowNext7d_in} />
      </span>
    </div>
  )
}

function TempIndicator(props: { temp: number }) {
  const t = props.temp
  const display = t + "°"
  if (t > 32) {
    return <span className="bg-emerald-500 w-10 h-10 text-center font-bold text-lg leading-10 rounded-md">{display}</span>
  }
  if (t > 20) {
    return <span className="bg-cyan-500 w-10 h-10 text-center font-bold text-lg leading-10 rounded-md">{display}</span>
  }
  if (t > 10) {
    return <span className="bg-blue-500 w-10 h-10 text-center font-bold text-lg leading-10 rounded-md">{display}</span>
  }
  if (t > 0) {
    return <span className="bg-indigo-500 w-10 h-10 text-center font-bold text-lg leading-10 rounded-md">{display}</span>
  }
  else {
    return <span className="bg-violet-500 w-10 h-10 text-center font-bold text-lg leading-10 rounded-md">{display}</span>
  }
}

function SnowIndicator(props: { inches: number }) {
  const i = props.inches
  

  // color is red, saturation depends on inches where 0 = black and 18 = fully red
  const red = ((i / 18) * 100)
  const green = red / 8
  const color = `rgb(${red}%, ${green}%, 0%)`

  return <span className="w-10 h-10 text-center font-bold text-lg leading-10 rounded-md text-white" style={{
    backgroundColor: color,
  }}>{i}&quot;</span>
}

function weatherToEmoji(weather: ResortWeatherData["weather"]): string {
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

async function getWeatherData(url: string): Promise<ResortWeatherData> {
  const res = await fetch(`/api/snow/resort/weather?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  return await res.json()
}

async function getTerrainData(url: string): Promise<ResortTerrainLiftData> {
  const res = await fetch(`/api/snow/resort/terrain?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  return await res.json()
}

async function getSnowData(url: string): Promise<ResortForecastData> {
  const res = await fetch(`/api/snow/resort/forecast?url=${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  })
  return await res.json()
}

