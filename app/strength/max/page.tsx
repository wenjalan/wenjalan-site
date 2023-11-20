'use client'
import NavBar from "@/app/components/NavBar";
import { log } from "console";
import { useState } from "react";

export default function OneRepMax() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Main />
    </div>
  )
}

function Main() {
  const [weight, setWeight] = useState<number | undefined>()
  const [reps, setReps] = useState<number | undefined>()
  return (
    <main className="m-2 p-2 bg-slate-50 rounded-md flex flex-col gap-2 sm:w-max">
      <h1 className="font-bold text-lg">One-Rep Max Calculator</h1>
      <p>Calculates a one-rep max, and two-rep max, and three-rep max...</p>
      <i>To start, input a hard top set, for any exercise.</i>
      <Input weight={weight} setWeight={setWeight} reps={reps} setReps={setReps} />
      {weight && reps ? <Table max={brzycki(weight, reps)}/> : undefined}
    </main>
  )
}

interface InputProps {
  weight: number | undefined,
  setWeight: (weight: number) => void,
  reps: number | undefined,
  setReps: (reps: number) => void
}

function Input(props: InputProps) {
  return (
    <form className="flex flex-col flex-wrap gap-2">
      <div>
        <input value={props.weight || ''} onChange={(e) => props.setWeight(e.target.value as unknown as number)} type="number" name="weight" id="weight" className="p-1 rounded-md bg-slate-200" />
        <label htmlFor="weight" className="p-1">lbs/kgs</label>
      </div>
      <div>
        <input value={props.reps || ''} onChange={(e) => props.setReps(e.target.value as unknown as number)} type="number" name="reps" id="reps" className="p-1 rounded-md bg-slate-200" />
        <label htmlFor="reps" className="p-1">reps</label>
      </div>
    </form>
  )
}

interface TableProps {
  max: number
}

function Table(props: TableProps) {
  const repRange = [1, 20]
  const rows = []
  for (let i = repRange[0]; i <= repRange[1]; i++) {
    rows.push(<TableRow key={i} max={props.max} reps={i} />)
  }
  return (
    <table className="border-2 table-fixed sm:max-w-full">
      <thead className="border-2">
        <tr>
          <th>Reps</th>
          <th>Weight</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

interface TableRowProps {
  max: number,
  reps: number
}

function TableRow(props: TableRowProps) {
  const weight = Math.round(maxWeight(props.max, props.reps))
  const percent = Math.round(weight / props.max * 100)
  return (
    <tr className="border-2">
      <td>{props.reps}</td>
      <td>{weight}</td>
      <td>{percent}</td>
    </tr>
  )
}

// see: https://www.vcalc.com/wiki/Caroline4/Brzycki
// returns a one-rep max 
function brzycki(weight: number, reps: number): number {
  return weight * (36 / (37 - reps));
}

// returns max weight for a number of reps
function maxWeight(max: number, reps: number) {
  return max / (36 / (37 - reps));
}

// returns max reps for a weight
function maxReps(max: number, weight: number) {
  return -(36 * weight / max) + 37
}