export default function Home() {
  return (
    <>
      <NavBar />
      <Main />
    </>
  )
}

function NavBar() {
  return (
    <nav className="bg-slate-50 p-2 flex flex-row">
      <div className="font-bold px-2">wenjalan</div>
    </nav>
  )
}

function Main() {
  return (
    <main className="m-4 flex flex-row gap-2">
      <Menu />
      <Content />
    </main>
  )
}

function Menu() {
  return (
    <div className="text-1xl font-bold flex-4 flex flex-col gap-2">
      <div className="p-4 rounded-md bg-slate-50">About Me</div>
      <div className="p-4 rounded-md bg-slate-50">Education</div>
      <div className="p-4 rounded-md bg-slate-50">Experience</div>
      <div className="p-4 rounded-md bg-slate-50">Projects</div>
      <div className="p-4 rounded-md bg-slate-50">Awards & Certifications</div>
    </div>
  )
}

function Content() {
  return (
    <div className=" p-4 bg-slate-50 rounded-md flex-1">
      <b>About Me</b>
      <p>
        I am a software engineer with 13 years of experience in programming.
      </p>
    </div>
  )
}
