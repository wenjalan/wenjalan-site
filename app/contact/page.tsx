'use client'
import NavBar from "../components/NavBar";

export default function Contact() {
  return (
    <div className='flex flex-col'>
      <NavBar active="contact"/>
      <Main />
    </div>
  )
}

function Main() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="bg-slate-100 p-16 m-2 rounded-md w-3/4 sm:w-1/4 flex flex-col gap-2 items-center shadow-xl">
        <img
          src="https://media.licdn.com/dms/image/D5603AQF1Wa6asa3htQ/profile-displayphoto-shrink_800_800/0/1635008788285?e=1707350400&v=beta&t=wFlpxG3MQOHHu5rsu-pW8C7DWb__WNNi25wEOzb5ORI"
          alt="Alan Wen"
          className="rounded-full w-32 h-32 border-2 border-slate-100 shadow-xl"
        />
        <h1 className="text-xl font-bold">Alan Wen</h1>
        <h2 className="text-sm italic">Software Engineering, AI & ML.</h2>
        <hr className="border-1 border-slate-300 w-full" />
        <LinkButton href="https://www.linkedin.com/in/wenjalan/">LinkedIn</LinkButton>
      </div>
    </main>
  )
}

function LinkButton(props: { href: string, children: React.ReactNode }) {
  return (
    <span
      className="text-white bg-slate-800 hover:bg-slate-600 cursor-pointer p-2 rounded-md w-full text-center shadow-xl"
      onClick={() => window.open(props.href, '_blank')}
    >
      {props.children}
    </span>
  )
}