'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'

export default function Home() {
  return (
    <div className='flex flex-col'>
      <NavBar />
      <Main />
    </div>
  )
}

function NavBar() {
  return (
    <nav className="bg-slate-50 p-2 flex flex-row">
      <Link href="/" className="rounded-md hover:bg-slate-300 font-bold px-2">wenjalan</Link>
    </nav>
  )
}

function Main() {
  const [sections, setSections] = useState([])
  const [selected, setSelected] = useState('about') // default to about.md before metadata is loaded

  useEffect(() => {
    fetch('./metadata.json')
      .then((res) => {
        return res.ok ? res.json() : ['Something went wrong.']
      })
      .then((metadata) => {
        setSections(metadata.sections)
        setSelected(metadata.sections[0])
      })
  }, [])

  return (
    <main className="m-4 flex flex-row gap-2">
      <Menu sections={sections} selected={selected} setSelected={setSelected} />
      <Content src={`./${selected}.md`} />
    </main>
  )
}

interface MenuProps {
  sections: string[]
  selected: string
  setSelected: (page: string) => void
}

function Menu(props: MenuProps) {
  return (
    <div className="text-1xl flex-4 flex flex-col gap-2">
      {props.sections.map((section) => (
        section === props.selected ?
          <div key={section} className="hover:bg-slate-300 cursor-pointer font-bold p-4 rounded-md bg-slate-50" onClick={() => props.setSelected(section)}>{section.toUpperCase()}</div> :
          <div key={section} className="hover:bg-slate-300 cursor-pointer p-4 rounded-md bg-slate-50" onClick={() => props.setSelected(section)}>{section.toUpperCase()}</div>
      ))}
    </div>
  )
}

interface ContentProps {
  src: string
}

function Content(props: ContentProps) {
  const [content, setContent] = useState('Loading...')

  useEffect(() => {
    fetch(props.src)
      .then((res) => {
        return res.ok ? res.text() : 'Something went wrong.'
      })
      .then((content) => setContent(content))
  }, [props.src])

  return (
    <Markdown className="content p-4 bg-slate-50 rounded-md flex-1">{content}</Markdown>
  )
}
