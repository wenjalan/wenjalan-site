'use client'
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-slate-50 p-2 flex flex-row w-full">
      <Link href="/" className="rounded-md hover:bg-slate-300 font-bold px-2">wenjalan</Link>
      <Link href="/strength/max" className="rounded-md hover:bg-slate-300 font-bold px-2">strength/max</Link>
      <Link href="/snow" className="rounded-md hover:bg-slate-300 font-bold px-2">snow</Link>
    </nav>
  )
}