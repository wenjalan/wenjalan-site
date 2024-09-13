import { MountainResort } from "@/common/types"

const API_ROOT = `/api/v2/snow/`

async function getResorts(): Promise<MountainResort[]> {
  const res = await fetch(API_ROOT + 'resort')
  const data = await res.json()
  return data
}

async function getResort(id: string): Promise<MountainResort> {
  const res = await fetch(API_ROOT + `resort?id=${id}`)
  const data = await res.json()
  return data
}

export default { getResorts, getResort }