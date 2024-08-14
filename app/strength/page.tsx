'use client'
import NavBar from "@/app/components/NavBar";
import { useState } from "react";

enum LIFT {
  squat = 'squat',
  bench = 'bench',
  deadlift = 'deadlift'
}

enum RANK {
  novice = 'novice',
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
  elite = 'elite',
  freak = 'freak'
}

export default function OneRepMax() {
  return (
    <div className="flex flex-col">
      <NavBar active="strength" />
      <Main />
    </div>
  )
}

function Main() {
  const [weight, setWeight] = useState<number | undefined>()
  const [reps, setReps] = useState<number | undefined>()
  const [bodyweight, setBodyweight] = useState<number | undefined>()
  const [lift, setLift] = useState<LIFT | undefined>(undefined)
  const max = brzycki(weight ?? 0, reps ?? 0)
  const rank = bodyweight && lift ? getRank(lift, max, bodyweight) : undefined

  return (
    <main className="m-2 p-2 bg-slate-50 rounded-md flex flex-col gap-2 sm:w-max">
      <h1 className="font-bold text-lg">One-Rep Max Calculator</h1>
      <p>Calculates a n-rep max.</p>
      <p>Also grades your lift according to <a className="underline" target="_blank" href="https://jeffnippard.com/blogs/news/how-strong-should-you-be-noob-to-freak-1">Jeff Nippard's standards.</a></p>
      <Input
        weight={weight}
        setWeight={setWeight}
        reps={reps}
        setReps={setReps}
        bodyweight={bodyweight}
        setBodyweight={setBodyweight}
        lift={lift}
        setLift={setLift}
      />
      <Table max={max} rank={rank} ratio={bodyweight ? max / bodyweight : 0} />
    </main>
  )
}

interface InputProps {
  weight: number | undefined,
  setWeight: (weight: number) => void,
  reps: number | undefined,
  setReps: (reps: number) => void,
  bodyweight: number | undefined,
  setBodyweight: (bodyweight: number) => void,
  lift: LIFT | undefined,
  setLift: (lift: LIFT | undefined) => void
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
      <div>
        <input value={props.bodyweight || ''} onChange={(e) => props.setBodyweight(e.target.value as unknown as number)} type="number" name="bodyweight" id="bodyweight" className="p-1 rounded-md bg-slate-200" />
        <label htmlFor="bodyweight" className="p-1">lbs/kgs bodyweight</label>
      </div>
      <div className="flex flex-row gap-2">
        <input type="radio" name="lift" id="squat" value="squat" checked={props.lift === LIFT.squat} onChange={() => props.setLift(LIFT.squat)} />
        <label htmlFor="squat">Squat</label>
        <input type="radio" name="lift" id="bench" value="bench" checked={props.lift === LIFT.bench} onChange={() => props.setLift(LIFT.bench)} />
        <label htmlFor="bench">Bench</label>
        <input type="radio" name="lift" id="deadlift" value="deadlift" checked={props.lift === LIFT.deadlift} onChange={() => props.setLift(LIFT.deadlift)} />
        <label htmlFor="deadlift">Deadlift</label>
        <input type="radio" name="lift" id="other" value="other" checked={props.lift === undefined} onChange={() => props.setLift(undefined)} />
        <label htmlFor="other">Other</label>
      </div>
    </form>
  )
}

interface TableProps {
  max: number,
  rank: RANK | undefined,
  ratio: number | undefined
}

function Table(props: TableProps) {
  const repRange = [1, 10]
  const rows = []
  for (let i = repRange[0]; i <= repRange[1]; i++) {
    rows.push(<TableRow key={i} max={props.max} reps={i} />)
  }

  const getColorForRank = (rank: RANK | undefined) => {
    switch (rank) {
      case RANK.novice:
        return 'bg-green-300'
      case RANK.beginner:
        return 'bg-blue-300'
      case RANK.intermediate:
        return 'bg-purple-300'
      case RANK.advanced:
        return 'bg-yellow-300'
      case RANK.elite:
        return 'bg-red-300'
      case RANK.freak:
        return 'bg-red-300'
      default:
        return 'bg-slate-200'
    }
  }

  return (
    <>
      {props.rank ? <h1 className={`font-bold text-lg text-center rounded-md ${getColorForRank(props.rank)}`}>{`${props.rank.toUpperCase()} (${props.ratio ? Math.round(props.ratio * 100) / 100 : 0}x)`}</h1> : null}
      <table className="border-2 table-fixed">
        <thead className="border-2">
          <tr className="border-2 text-left">
            <th>Reps</th>
            <th>Weight</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  )
}

interface TableRowProps {
  max: number,
  reps: number
}

function TableRow(props: TableRowProps) {
  const weight = Math.round(maxWeight(props.max, props.reps))
  const percent = props.max ? Math.round(weight / props.max * 100) : 0
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

// source: https://jeffnippard.com/blogs/news/how-strong-should-you-be-noob-to-freak-1
function getRankSquat(max: number, bodyweight: number): RANK {
  const ratio = max / bodyweight
  if (max < 135) return RANK.novice
  if (ratio < 1.25) return RANK.beginner
  if (ratio < 1.75) return RANK.intermediate
  if (ratio < 2.5) return RANK.advanced
  if (ratio < 3) return RANK.elite
  return RANK.freak
}

// source: https://jeffnippard.com/blogs/news/how-strong-should-you-be-noob-to-freak-1
function getRankBench(max: number, bodyweight: number): RANK {
  const ratio = max / bodyweight
  if (max < 95) return RANK.novice
  if (ratio < 1.25) return RANK.beginner
  if (ratio < 1.75) return RANK.intermediate
  if (ratio < 2.5) return RANK.advanced
  if (ratio < 3) return RANK.elite
  return RANK.freak
}

// source: https://jeffnippard.com/blogs/news/how-strong-should-you-be-noob-to-freak-1
function getRankDeadlift(max: number, bodyweight: number): RANK {
  const ratio = max / bodyweight
  if (max < 225) return RANK.novice
  if (ratio < 1.5) return RANK.beginner
  if (ratio < 2.25) return RANK.intermediate
  if (ratio < 3) return RANK.advanced
  if (ratio < 3.5) return RANK.elite
  return RANK.freak
}

function getRank(lift: LIFT, max: number, bodyweight: number): RANK {
  switch (lift) {
    case LIFT.squat:
      return getRankSquat(max, bodyweight)
    case LIFT.bench:
      return getRankBench(max, bodyweight)
    case LIFT.deadlift:
      return getRankDeadlift(max, bodyweight)
    default:
      return RANK.novice
  }
}