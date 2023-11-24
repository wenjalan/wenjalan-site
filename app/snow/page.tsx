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
    <main className="m-2 p-2 bg-slate-50 rounded-md flex flex-col gap-2 sm:max-w-2xl self-center">
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
    <table className="table-fixed border-2 text-center">
      <thead>
        <tr className="border-2">
          <th className="flex-3">Resort</th>
          <th>Temp</th>
          <th>Low</th>
          <th>High</th>
          <th>24hr Snowfall</th>
          <th>7day Snowfall</th>
          {/* <th>Lifts</th>
          <th>Trails</th>
          <th>Terrain</th> */}
        </tr>
      </thead>
      <tbody>
        {props.resorts.map((resort, i) => <SnowTableRow key={resort.name} resort={resort} />)}
      </tbody>
    </table>
  )
}

interface ResortData {
  temperature_F: number,
  temperatureHigh_F: number,
  temperatureLow_F: number,

  temperature_C: number,
  temperatureHigh_C: number,
  temperatureLow_C: number,

  snowfallLast24_in: number,
  snowfallBaseDepth_in: number,

  snowfallLast24_cm: number,
  snowfallBaseDepth_cm: number,

  liftsOpen: number,
  liftsTotal: number
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
            <td>{weather.tempCurrent}°F</td>
            <td>{weather.tempLow}°F</td>
            <td>{weather.tempHigh}°F</td>
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
      {/* {
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
      } */}
    </tr >
  )
}
