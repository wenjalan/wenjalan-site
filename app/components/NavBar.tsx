'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar(props: { active?: string }) {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-slate-50 p-2 flex flex-row w-full drop-shadow-md">
      <SectionLink href="/" active={props.active === "wenjalan"}>wenjalan</SectionLink>
      <SectionLink href="/contact" active={props.active === "contact"}>contact</SectionLink>
      <SectionLink href="/strength" active={props.active === "strength"}>strength</SectionLink>
      <SectionLink href="/snow" active={props.active === "snow"}>snow</SectionLink>
      <SectionLink href="/cafes" active={props.active === "cafes"}>cafes</SectionLink>
      {
        status === "authenticated" && session ?
          <div className="ml-auto">{session.user?.email}</div>
          : undefined
      }
    </nav>
  )
}

function SectionLink(props: { href: string, children: React.ReactNode, active: boolean }) {
  return (
    <Link href={props.href} className={`rounded-md hover:bg-slate-300 font-bold px-2 ${props.active ? 'text-[#d97706]' : ''}`}>
      {props.children}
    </Link>
  )
}