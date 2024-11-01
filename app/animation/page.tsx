import { Ubuntu } from "next/font/google"
import "./animation.css"

const ubuntu = Ubuntu({
  weight: "700",
  subsets: ["latin"],
})

export default function Animation() {
  return (
    <div className={`${ubuntu.className} h-screen w-full bg-white flex`}>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="w-full px-4 text-2xl">ALAN WEN</h1>
        <span className="w-full animation px-4"><p><span className="bullet">&gt;</span>EXPERIENCE</p></span>
        <span className="w-full animation px-4"><p><span className="bullet">&gt;</span>EDUCATION</p></span>
        <span className="w-full animation px-4"><p><span className="bullet">&gt;</span>AWARDS & CERTIFICATIONS</p></span>
        <span className="w-full animation px-4"><p><span className="bullet">&gt;</span>SKILLS</p></span>
      </div>
    </div>
  )
}