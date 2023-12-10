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

  const refresh = () => {
    setWeatherStatus(null)
    setTerrainStatus(null)
    setSnowForecast(null)
    setError(null)
    window.alert('REFRESH')
  }

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
          {
            error ?
              <div className="flex flex-col">
                <p><EmojiIcon emoji="⚠️" />Error: {error}</p>
                <RefreshButton onRefresh={refresh} />
              </div> :
              undefined
          }
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
      <ResortHeader resort={resort} refresh={refresh} />
      {props.resort.camPreviews ? <CameraPreviews srcs={props.resort.camPreviews} /> : undefined}
      <SnowForecastBar forecast={snowDaily_in} href={props.resort.snowForecastUrl} />
      <StatusBar terrainStatus={resort.terrain} href={props.resort.statusUrl} />
    </div>
  )
}

function ResortHeader(props: { resort: any, refresh: () => void }) {
  const resort = props.resort
  return (
    <span className="flex flex-row text-white gap-2 cursor-pointer items-center">
      <h1 className="font-bold text-xl" onClick={() => open(props.resort.url, "_blank")}>{props.resort.name.toUpperCase()}</h1>
      <RefreshButton onRefresh={props.refresh}/>
      <h1 className="font-bold text-xl flex-1 text-end">{weatherToEmoji(resort.weather.weather)}{resort.weather.tempCurrent}°F</h1>
    </span>
  )
}

function CameraPreviews(props: { srcs: string[] }) {
  const srcs = props.srcs
  const [index, setIndex] = useState(0)

  return (
    <span className="border">
      <span className="cursor-pointer border bg-black px-2 absolute left-5 top-64" onClick={() => setIndex(index === 0 ? srcs.length - 1 : index - 1)}>
        &lt;
      </span>
      <span className="absolute right-6 top-14">
        {index + 1}/{srcs.length}
      </span>
      <span className="cursor-pointer border bg-black px-2 absolute right-5 top-64" onClick={() => setIndex((index + 1) % srcs.length)}>
        &gt;
      </span>
      <img src={srcs[index]} />
    </span>
  )
}

function SnowForecastBar(props: { forecast: number[], href: string }) {
  const forecast = props.forecast
  const href = props.href
  return (
    <span className="flex flex-row text-white text-sm leading-10 text-center">
      {
        forecast.map((inches, i) => <SnowIndicator key={i} title={"Snow Day " + (i + 1)} inches={inches} srcUrl={href} />)
      }
    </span>
  )
}

function StatusBar(props: { terrainStatus: TerrainStatus, href: string }) {
  const status = props.terrainStatus
  const href = props.href
  return (
    <span className="flex flex-row text-black gap-1 text-sm text-center cursor-pointer drop-shadow-xl">
      <span
        className="bg-white flex-1 self-center font-bold"
        style={{
          backgroundColor: getBGPercentColor({ p: status.terrainOpenPercent }),
        }}
        onClick={() => open(href)}
      >
        {status.liftsOpen}/{status.liftsTotal} Lifts {status.trailsOpen}/{status.trailsTotal} Trails ({status.terrainOpenPercent}%)
      </span>
    </span>
  )
}

function RefreshButton(props: { onRefresh: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <span
        onClick={() => props.onRefresh()}
        className="cursor-pointer hover:bg-slate-600 px-2 text-slate-800 text-sm"
      >
        REFRESH
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