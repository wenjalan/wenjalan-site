'use client'

import NavBar from "../components/NavBar";
import { useState } from "react";

enum Tag {
  ROASTER = "roaster",
  PASTRIES = "pastries",
  SINGLE_ORIGIN = "single-origin",
}

const tempCafes = [
  { 
    name: 'Broadcast Coffee & Bakery',
    address: '6515 Roosevelt Way NE, Seattle, WA 98115',
    rating: 3,
    images: [
      'https://lh5.googleusercontent.com/p/AF1QipORIP4JdfzK2OJT3S5S8aSxJu6EGHowDFNfekKc=s635-k-no',
      'https://lh5.googleusercontent.com/p/AF1QipP98a-6n4GdhxGIWSuzpJXmZRoM5HrA-Oa-nu6r=s846-k-no',
      'https://lh5.googleusercontent.com/p/AF1QipOFXL8vX6Ykz9hb95iW9HyY7x0Izdhi5r_uq0J6=s481-k-no',
    ],
    tags: [Tag.ROASTER, Tag.PASTRIES, Tag.SINGLE_ORIGIN],
  },
  {
    name: 'Santo Coffee Co.',
    address: '1325 NE 65th St, Seattle, WA 98115',
    rating: 3,
    images: [
      'https://lh5.googleusercontent.com/p/AF1QipNreYsD8085xy2M34aiO3gWQxcyKCOrazYy3mG8=w408-h305-k-no',
      'https://lh5.googleusercontent.com/p/AF1QipNG06EyCX2m0XZTqcuewq1361EjK4LbCNBIp0mJ=s846-k-no',
      'https://lh3.ggpht.com/p/AF1QipPlUbKOPYkg3fLZ8QC1vdhszOdLwOHEkFjIoHsx=s512',
    ],
    tags: [Tag.ROASTER, Tag.PASTRIES, Tag.SINGLE_ORIGIN],
  }
]

export default function Cafes() {
  return (
    <div className='flex flex-col w-full h-screen bg-slate-300'>
      <NavBar active="cafes" />
      <PageHeader />
      <Main />
    </div>
  )
}

function PageHeader() {
  return (
    <span className="flex flex-col m-2 p-2">
      <h1 className="text-4xl font-bold">Seattle Cafe List</h1>
      <p className="text-lg italic">The best cafes in Seattle.</p>
    </span>
  )
}

function Main() {
  const [cafes, setCafes] = useState<Cafe[]>(tempCafes)


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
}

type CafeCardProps = {
  cafe: Cafe,
}

function CafeCard({ cafe }: CafeCardProps) {
  return (
    <span className="flex flex-col gap-2 bg-slate-200 p-4 rounded-md shadow-xl">
      {/* name followed by address separated by |, where the name is large and bold and the address italics*/}
      <span className="text-2xl font-bold">{cafe.name} <span className="text-lg font-normal italic">{cafe.address}</span></span>
      {/* rating as star emojis */}
      <span className="text-2xl">{'⭐️'.repeat(cafe.rating)}</span>
      <div className='flex flex-row gap-2'>
        {/* rating is added as a tag of star emojis*/}
        {cafe.tags.map((tag, index) => <span key={index} className='bg-slate-100 p-1 rounded-md shadow-md'>{tag}</span>)}
      </div>
      <div className='flex flex-row gap-2'>
        {cafe.images.map((image, index) => <img key={index} src={image} className='w-32 h-32 object-cover rounded-md' />)}
      </div>
    </span>
  )
}