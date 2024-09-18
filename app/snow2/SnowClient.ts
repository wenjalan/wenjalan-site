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

async function updateResort(id: string, resort: MountainResort): Promise<void> {
  const res = await fetch(API_ROOT + `resort?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resort)
  })
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`)
  }
}

export default { getResorts, getResort, updateResort }