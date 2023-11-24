'use client'
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Link from "next/link";
import RESORTS from "./resorts.json"
import './snow.css'
import ResortWeatherData from "./ResortWeatherData";
import ResortTerrainLiftData from "./ResortTerrainLiftData";


export default function Snow() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Main />
    </div>
  )
}

interface Resort {
  name: string,
  statusUrl: string,
  weatherDataUrl: string
}

function Main() {
  const resorts = RESORTS as Resort[]
  return (
    <main className="m-2 p-2 bg-slate-50 rounded-md flex flex-col gap-2 sm:max-w-4xl self-center">
      <h1 className="font-bold text-lg">Snow Report</h1>
      <p>Collects temperature, snowfall, lift status and trail status from various ski resorts.</p>
      <SnowTable resorts={resorts} />
    </main>
  )
}

interface SnowTableProps {
  resorts: Resort[]
}

function SnowTable(props: SnowTableProps) {
  return (
    <table className="table-fixed border-2 text-center w-full">
      <thead>
        <tr className="border-2">
          <th>Resort</th>
          <th>Low</th>
          <th>Current</th>
          <th>High</th>
          <th>24hr Snowfall</th>
          <th>7day Snowfall</th>
          <th>Lifts</th>
          <th>Trails</th>
          <th>Terrain</th>
        </tr>
      </thead>
      <tbody>
        {props.resorts.map((resort, i) => <SnowTableRow key={resort.name} resort={resort} />)}
      </tbody>
    </table>
  )
}

interface SnowTableRowProps {
  resort: Resort
}

function SnowTableRow(props: SnowTableRowProps) {
  const [weather, setWeather] = useState<ResortWeatherData | undefined>(undefined)
  const [terrain, setTerrain] = useState<ResortTerrainLiftData | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/snow/resort/weather?url=${props.resort.weatherDataUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWeather(data)
      })
  }, [props.resort.weatherDataUrl])

  useEffect(() => {
    fetch(`/api/snow/resort/terrain?url=${props.resort.statusUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTerrain(data)
      })
  }, [props.resort.statusUrl])

  return (
    <tr className="border-2">
      <td><Link href={props.resort.statusUrl} target="_blank">{props.resort.name}</Link></td>
      {
        weather ? (
          <>
            <td><T t={weather.tempLow}/></td>
            <td><T t={weather.tempCurrent}/></td>
            <td><T t={weather.tempHigh}/></td>
            <td>{weather.snowLastDay} in</td>
            <td>{weather.snowLastWeek}</td>
          </>
        ) : (
          <>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
          </>
        )
      }
      {
        terrain ? (
          <>
            <td>{terrain.liftsOpen}/{terrain.liftsTotal}</td>
            <td>{terrain.trailsOpen}/{terrain.trailsTotal}</td>
            <td>{terrain.terrainOpenPercent}%</td>
          </>
        ) : (
          <>
            <td>Loading...</td>
            <td>Loading...</td>
            <td>Loading...</td>
          </>
        )
      }
    </tr >
  )
}

function T(props: { t: number }) {
  const t = props.t
  if (t > 32 ) {
    return <span className="text-green-600">{t}°F</span>
  }
  if (t > 21) {
    return <span className="text-cyan-600">{t}°F</span>
  }
  if (t > 10) {
    return <span className="text-blue-600">{t}°F</span>
  }
  if (t > 0) {
    return <span className="text-purple-600">{t}°F</span>
  }
  return <span>{t}°F</span>
}