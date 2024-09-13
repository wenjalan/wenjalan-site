'use client'

import { MountainResort } from '@/common/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import SnowClient from '../SnowClient'
import { type } from 'os'

export default function Resort({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [resort, setResort] = useState<MountainResort | null>(null)

  useEffect(() => {
    SnowClient.getResort(id)
      .then((resort) => {
        setResort(resort)
      })
  }, [id])

  return (
    // white bg
    <div className="bg-white">
      {resort ? <MountainResortInfo resort={resort} /> : 'Loading...'}
      <button onClick={() => router.push('/snow2')}>Back</button>
    </div>
  )
}

type MountainResortInfoProps = {
  resort: MountainResort
}

function MountainResortInfo({ resort }: MountainResortInfoProps) {
  return (
    <div>
      {/* bold */}
      <h1 className="font-bold">{resort.name}</h1>
      <ul>
        <li>id: {resort.id}</li>
        <li>url: <a href={resort.url} target='_blank'>{resort.url}</a></li>
        <li>pass: {resort.pass ? resort.pass : "unaffiliated"}</li>
        <li>lat/lng: {resort.location ? `${resort.location.latitude}, ${resort.location.longitude}` : "undefined"}</li>
        <li>weather: {resort.weather ? 'available' : 'unavailable'}</li>
        <li>webcams: {resort.webcams ? 'available' : 'unavailable'}</li>
        <li>sns: {resort.sns ? `available` : 'unavailable'}</li>
      </ul>
    </div>
  )
}
