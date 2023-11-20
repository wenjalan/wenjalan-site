import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-slate-50 p-2 flex flex-row">
      <Link href="/" className="rounded-md hover:bg-slate-300 font-bold px-2">wenjalan</Link>
    </nav>
  )
}