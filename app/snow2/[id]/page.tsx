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
      {/* JSON print with indents */}
      <pre>{JSON.stringify(resort, null, 2)}</pre>
    </div>
  )
}
