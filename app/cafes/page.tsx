'use client'

import Link from "next/link";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

enum Tag {
  ROASTER = "roaster",
  PASTRIES = "pastries",
  SINGLE_ORIGIN = "single-origin",
}

export default function Cafes() {
  return (
    <div className='flex flex-col w-full bg-slate-300'>
      <NavBar active="cafes" />
      <PageHeader />
      <Main />
    </div>
  )
}

function PageHeader() {
  return (
    <span className="flex flex-col m-2 p-2">
      <h1 className="text-4xl font-bold">The Best Cafes in Seattle</h1>
    </span>
  )
}

function Main() {
  const [cafes, setCafes] = useState<Cafe[]>([])

  useEffect(() => {
    const fetchCafes = async () => {
      const response = await fetch('/cafes.json')
      const cafes: Cafe[] = await response.json()
      setCafes(cafes)
    }
    fetchCafes()
  }, [])

  return (
    // spacing 2px
    <main className='flex flex-col m-2 p-2 gap-2'>
      {cafes.map(cafe => <CafeCard key={cafe.name} cafe={cafe} />)}
    </main>
  )
}

type Cafe = {
  name: string,
  address: string,
  rating: number,
  images: string[],
  tags: Tag[],
  notes: string,
}

type CafeCardProps = {
  cafe: Cafe,
}

function CafeCard({ cafe }: CafeCardProps) {
  return (
    <span className="flex flex-col gap-2 bg-slate-200 p-4 rounded-md shadow-xl">
      <span className="text-2xl font-bold">{cafe.name + " "}<span className="text-lg font-normal italic"><Link target="_blank" href={`https://maps.google.com/?q=${cafe.address}`}>{cafe.address}</Link></span></span>
      <span className="text-2xl">{'⭐️'.repeat(cafe.rating)}</span>
      <div className='flex flex-row gap-2'>
        {cafe.tags.map((tag, index) => <span key={index} className='bg-slate-100 p-1 rounded-md shadow-md'>{tag}</span>)}
      </div>
      <div className='flex flex-row gap-2'>
        {cafe.images.map((image, index) => <img key={index} src={image} className='w-32 h-32 object-cover rounded-md' />)}
      </div>
      <span className="text-md italic">
        {cafe.notes}
      </span>
    </span>
  )
}