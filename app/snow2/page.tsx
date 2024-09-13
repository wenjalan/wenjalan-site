'use client'

import { useEffect, useState } from "react"
import SnowClient from "./SnowClient"
import NavBar from "../components/NavBar"

export default function Snow() {
  return (
    <div className="flex flex-col">
      {/* <NavBar active="snow2" /> */}
      <Main />
    </div>
  )
}

function Main() {
  const [resortIds, setResortIds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    SnowClient.getResorts()
      .then((resorts) => {
        setResortIds(resorts.map((resort) => resort.id))
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])



  return (
    <div className="bg-white">
      { error }
      {/* link to snow2/[id] */}
      <ul>
        {resortIds.map((id) => (
          <li key={id}>
            <a href={`/snow2/${id}`}>{id}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}