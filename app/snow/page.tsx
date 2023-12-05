'use client'
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RESORTS from "./resorts.json"
import './snow.css'
import { Resort as ResortData } from "./SnowAPI";
import { Resort } from "./Resort";


export default function Snow() {
  return (
    <div className="flex flex-col">
      <NavBar active="snow" />
      <Main />
    </div>
  )
}

function Main() {
  const resorts = RESORTS as ResortData[]
  return (
    <main className="m-2 p-2 bg-slate-800 flex flex-col gap-2 text-white drop-shadow-lg">
      <h1 className="font-bold text-xl">Snow Resort Status</h1>
      <p className="text-sm">Collects weather, terrain and lift statuses for various Ski Resorts. Click to view sources.</p>
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