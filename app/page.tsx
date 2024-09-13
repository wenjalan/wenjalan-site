'use client'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import NavBar from './components/NavBar'
import { SessionProvider } from 'next-auth/react'

const ERROR_MD_SRC = './error.md'

interface Section {
  id: string
  title: string
  src: string
}

export default function Home() {
  return (
    <div className='flex flex-col'>
      <NavBar active="wenjalan" />
      <Main />
    </div>
  )
}

function Main() {
  const [sections, setSections] = useState<Section[]>([])
  const [selected, setSelected] = useState('about') // default to about.md before metadata is loaded

  useEffect(() => {
    fetch('./metadata.json')
      .then((res) => {
        return res.ok ? res.json() : ['Something went wrong: Error retrieving metadata']
      })
      .then((metadata) => {
        setSections(metadata.sections)
        setSelected(metadata.sections[0].id)
      })
  }, [])

  const selectedSection = sections.find((section) => section.id === selected)
  const contentSrc = selectedSection ? selectedSection.src : ERROR_MD_SRC

  return (
    <main className="sm:max-w-screen-xl sm:min-w-[75%] m-2 self-center flex flex-col sm:flex-row gap-2">
      <Menu sections={sections} selected={selected} setSelected={setSelected} />
      <Content src={contentSrc} />
    </main>
  )
}

interface MenuProps {
  sections: Section[]
  selected: string
  setSelected: (page: string) => void
}

function Menu(props: MenuProps) {
  return (
    <div className="sm:w-2/12 text-1xl flex flex-col gap-2">
      {props.sections.map((section) => (
        section.id === props.selected ?
          <div key={section.id} className="hover:bg-slate-300 cursor-pointer font-bold p-4 rounded-md bg-slate-50" onClick={() => props.setSelected(section.id)}>{section.title}</div> :
          <div key={section.id} className="hover:bg-slate-300 cursor-pointer p-4 rounded-md bg-slate-50" onClick={() => props.setSelected(section.id)}>{section.title}</div>
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
        if (!res.ok) {
          console.error(res.status, res.statusText);
          return `Something went wrong: Error retrieving content from src=${props.src}`
        }
        return res.text()
      })
      .then((content) => setContent(content))
  }, [props.src])

  return (
    <Markdown className="content sm:w-10/12 p-4 bg-slate-50 rounded-md">{content}</Markdown>
  )
}
