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
  const resort = props.resort
  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus | undefined | null>(undefined)
  const [terrainStatus, setTerrainStatus] = useState<TerrainStatus | undefined | null>(undefined)
  const [snowForecast, setSnowForecast] = useState<SnowForecast | undefined | null>(undefined)
  const [error, setError] = useState<string | null>(null)

  const refresh = () => {
    setWeatherStatus(undefined)
    setTerrainStatus(undefined)
    setSnowForecast(undefined)
    setError(null)
  }

  useEffect(() => {
    console.log('Fetching data for ' + resort.name + '...')

    getWeatherStatus(resort)
      .then(setWeatherStatus)
      .catch((e) => {
        console.error(e)
        setError(`Error loading weather status: ${e.message}`)
        setWeatherStatus(null)
      })

    getTerrainStatus(resort)
      .then(setTerrainStatus)
      .catch((e) => {
        console.error(e)
        setError(`Error loading terrain status: ${e.message}`)
        setTerrainStatus(null)
      })

    getSnowForecast(resort)
      .then(setSnowForecast)
      .catch((e) => {
        console.error(e)
        setError(`Error loading snow forecast: ${e.message}`)
        setSnowForecast(null)
      })
  }, [resort, error])

  if (weatherStatus === undefined || terrainStatus === undefined || snowForecast === undefined) {
    return (
      <div className="p-2 bg-slate-700 flex flex-col gap-1 drop-shadow-lg">
        <h1 className="text-center text-slate-300">Fetching {props.resort.name}...</h1>
        <RefreshButton onRefresh={refresh} />
      </div>
    )
  }

  return (
    <div className="w-full sm:w-1/3 md:w-1/4 bg-slate-700 p-2 flex flex-col gap-2 drop-shadow-xl font-mono">
      <ResortHeader resort={resort} weather={weatherStatus} refresh={refresh} error={error} />
      {resort.liveCameras ? <LiveCameras srcs={resort.liveCameras} /> : undefined}
      {resort.camPreviews ? <CameraPreviews srcs={resort.camPreviews} /> : undefined}
      <SnowForecastBar forecast={snowForecast} href={resort.snowForecastUrl} />
      <StatusBar terrainStatus={terrainStatus} href={resort.statusUrl} />
    </div>
  )
}

function ResortHeader(props: { resort: Resort, weather: WeatherStatus | null, refresh: () => void, error: string | null }) {
  const resort = props.resort
  const weather = props.weather
  const refresh = props.refresh
  const error = props.error
  const h1Class = error === null ? 'font-bold text-xl' : 'font-bold text-xl text-yellow-500'
  return (
    <span className="flex flex-row text-white gap-2 cursor-pointer items-center">
      <h1 className={h1Class} onClick={() => open(resort.url, "_blank")}>{resort.name.toUpperCase()}</h1>
      <RefreshButton onRefresh={refresh} />
      {
        weather === null ?
          <h1 className="font-bold text-xl flex-1 text-end">N/A</h1> :
          <h1 className="font-bold text-xl flex-1 text-end">{weatherToEmoji(weather.weather)}{weather.tempCurrent}°F</h1>
      }
    </span>
  )
}

function LiveCameras(props: { srcs: string[] }) {
  const srcs = props.srcs
  const [index, setIndex] = useState(0)
  return (
    <div className="border grow relative">
      <iframe className="overflow-hidden h-full w-full" src={srcs[index]} key={index}></iframe>
      <div className="absolute bottom-0 right-0 flex flex-row m-2 bg-black text-center leading-7">
        <span className="cursor-pointer border w-8 h-8" onClick={() => setIndex(index === 0 ? srcs.length - 1 : index - 1)}>
          &lt;
        </span>
        <span className="cursor-pointer border w-8 h-8" onClick={() => setIndex((index + 1) % srcs.length)}>
          &gt;
        </span>
      </div>
      <span className="absolute top-0 right-0 flex-1 self-end p-2 bg-black">
        {index + 1}/{srcs.length}
      </span>
    </div>
  )
}

function CameraPreviews(props: { srcs: string[] }) {
  const srcs = props.srcs
  const [index, setIndex] = useState(0)

  return (
    <div className="relative grow-0">
      <img className="border object-cover h-72 w-full" src={srcs[index]} />
      <div className="absolute bottom-0 right-0 flex flex-row m-2 bg-black text-center leading-7">
        <span className="cursor-pointer border w-8 h-8" onClick={() => setIndex(index === 0 ? srcs.length - 1 : index - 1)}>
          &lt;
        </span>
        <span className="cursor-pointer border w-8 h-8" onClick={() => setIndex((index + 1) % srcs.length)}>
          &gt;
        </span>
      </div>
      <span className="absolute top-0 right-0 flex-1 self-end p-2">
        {index + 1}/{srcs.length}
      </span>
    </div>
  )
}

function SnowForecastBar(props: { forecast: SnowForecast | null, href: string }) {
  if (!props.forecast) {
    return (
      <span className="flex flex-row text-white text-sm leading-10 self-center">
        Error loading Snow Forecast.
      </span>
    )
  }

  const forecast = props.forecast.forecast
  const href = props.href


  // sum every 3 elements of snow to get daily snowfall
  const snowDaily_cm = []
  for (let i = 0; i < forecast.length; i += 3) {
    snowDaily_cm.push(forecast.slice(i, i + 3).reduce((a, b) => a + b, 0))
  }
  const snowDaily_in = snowDaily_cm.map(cm => Math.round(cm / 2.54))

  return (
    <span className="flex flex-row text-white text-sm leading-10 text-center">
      {
        snowDaily_in.map((inches, i) => <SnowIndicator key={i} title={"Snow Day " + (i + 1)} inches={inches} srcUrl={href} />)
      }
    </span>
  )
}

function StatusBar(props: { terrainStatus: TerrainStatus | null, href: string }) {
  const status = props.terrainStatus
  const href = props.href

  if (!status) {
    return (
      <span className="flex flex-row text-black gap-1 text-sm text-center cursor-pointer drop-shadow-xl">
        <span
          className="bg-white flex-1 self-center font-bold"
          style={{
            backgroundColor: getBGPercentColor({ p: 0 }),
          }}
          onClick={() => open(href)}
        >
          Error retrieving terrain status.
        </span>
      </span>
    )
  }

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