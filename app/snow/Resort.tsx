'use client'
import { useState, useEffect } from "react";
import {
  Resort,
  SnowForecast,
  TerrainStatus,
  WeatherStatus,
  getSnowForecast,
  getTerrainStatus,
  getWeatherStatus,
} from "./SnowAPI";

export function Resort(props: { resort: Resort }) {
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
      <div className="p-2 bg-slate-700 flex flex-col gap-1 drop-shadow-lg">
        <h1 className="text-center text-slate-300">Fetching {props.resort.name}...</h1>
        <span className="flex-1 text-center">
          {error ? <p><EmojiIcon emoji="⚠️" />Error: {error}</p> : undefined}
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

  // sum every 3 elements of snow to get daily snowfall
  const snowDaily_cm = []
  for (let i = 0; i < resort.snow.forecast.length; i += 3) {
    snowDaily_cm.push(resort.snow.forecast.slice(i, i + 3).reduce((a, b) => a + b, 0))
  }
  const snowDaily_in = snowDaily_cm.map(cm => Math.round(cm / 2.54))

  return (
    <div className="sm:max-w-screen-sm bg-slate-700 p-2 flex flex-col gap-2 drop-shadow-xl font-mono">
      <span className="flex flex-row text-white gap-2 cursor-pointer" onClick={() => open(props.resort.url, "_blank")}>
        <h1 className="flex-1 font-bold text-xl">{props.resort.name.toUpperCase()}</h1>
        <h1 className="font-bold text-xl">{weatherToEmoji(resort.weather.weather)}{resort.weather.tempCurrent}°F</h1>
      </span>
      <span className="flex flex-row text-white text-sm leading-10 text-center">
        {
          snowDaily_in.map((inches, i) => <SnowIndicator key={i} title={"Snow Day " + (i + 1)} inches={inches} srcUrl={props.resort.snowForecastUrl} />)
        }
      </span>
      <span className="flex flex-row text-black gap-1 text-sm text-center cursor-pointer drop-shadow-xl">
        <span
          className="bg-white flex-1 self-center font-bold"
          style={{
            backgroundColor: getBGPercentColor({ p: resort.terrain.terrainOpenPercent }),
          }}
          onClick={() => open(props.resort.statusUrl)}  
        >
          {resort.terrain.liftsOpen}/{resort.terrain.liftsTotal} Lifts {resort.terrain.trailsOpen}/{resort.terrain.trailsTotal} Trails ({resort.terrain.terrainOpenPercent}%)
        </span>
      </span>
    </div>
  )
}

function EmojiIcon(props: { emoji: string }) {
  return <span className="text-2xl leading-10 w-10 h-10">{props.emoji}</span>
}

function SnowIndicator(props: { title: string, inches: number, srcUrl: string }) {
  const i = props.inches
  const display = i === 0 ? "-" : i + "\""

  // red = [15, sqrt(i) * 15, 100]
  const red = Math.max(Math.min(Math.sqrt(i) * 30, 100), 15)
  const green = Math.min(red / 2, 5)
  const blue = Math.min(red / 2, 10)
  const color = `rgb(${red}%, ${green}%, ${blue}%)`

  return (
    <span
      title={props.title}
      className="w-10 h-10 flex-1 cursor-pointer font-bold drop-shadow-xl"
      onClick={() => open(props.srcUrl)}
      style={{
        color: "white",
        backgroundColor: color,
      }}
    >
      {display}
    </span>
  )
}

function getBGPercentColor(props: { p: number }) {
  const p = props.p
  let color = "#EF4444"
  if (p === 100) color = "#10B981" // bg-green-700
  else if (p > 90) color = "#22D3EE" // bg-emerald-700
  else if (p > 50) color = "#FBBF24" // bg-amber-700
  else if (p > 10) color = "#F59E0B" // bg-orange-700
  return color
}

function weatherToEmoji(weather: WeatherStatus["weather"]): string {
  const query = weather.toUpperCase()
  if (query.match(/SNOW/)) return "❄️"
  else if (query.match(/RAIN/)) return "🌧️"
  else if (query.match(/SUN/)) return "☀️"
  else if (query.match(/CLOUD/)) return "☁️"
  else return query
}