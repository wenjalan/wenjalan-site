'use client'
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RESORTS from "./resorts.json";
import './snow.css'

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
    <table className="table-fixed border-2">
      <thead>
        <tr className="border-2">
          <th className="flex-3">Resort</th>
          <th>Temperature</th>
          <th>24hr Snowfall</th>
          <th>Lifts</th>
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
  const [data, setData] = useState<ResortData | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/snow/resort?url=${props.resort.weatherDataUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData({
          temperature_F: data.CurrentTempStandard,
          temperatureHigh_F: data.HighTempStandard,
          temperatureLow_F: data.LowTempStandard,

          temperature_C: data.CurrentTempMetric,
          temperatureHigh_C: data.HighTempMetric,
          temperatureLow_C: data.LowTempMetric,

          snowfallLast24_in: data.SnowReportSections[0].Depth.Inches as number,
          snowfallBaseDepth_in: data.SnowReportSections[1].Depth.Inches as number,

          snowfallLast24_cm: data.SnowReportSections[0].Depth.Centimeters as number,
          snowfallBaseDepth_cm: data.SnowReportSections[1].Depth.Centimeters as number,

          liftsOpen: data.OpenLifts,
          liftsTotal: data.TotalLifts,
        })
      })
  }, [props.resort.weatherDataUrl])

  if (data === undefined) {
    return (
      <tr>
        <td>{props.resort.name}</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
      </tr>
    )
  }

  return (
    <tr className="border-2">
      <td>{props.resort.name}</td>
      <td>{data.temperature_F}°F</td>
      <td>{data.snowfallLast24_in} in</td>
      <td>{data.liftsOpen}/{data.liftsTotal}</td>
    </tr>
  )
}
