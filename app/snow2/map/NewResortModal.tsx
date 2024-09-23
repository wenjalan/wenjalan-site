import { MountainResort, Pass } from "@/common/types";
import SnowClient from "../SnowClient";
import React from "react";

export type NewResortModalProps = {
  onClose: (visible: boolean) => void
}

export default function NewResortModal({ onClose: onClose }: NewResortModalProps) {
  const [resortDraft, setResortDraft] = React.useState<MountainResort>({
    id: '',
    name: '',
    url: '',
    pass: undefined,
    location: {
      latitude: 0,
      longitude: 0
    },
    webcams: [],
  });

  const onIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      id: e.target.value
    });
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      name: e.target.value
    });
  }

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      url: e.target.value
    });
  }

  const onPassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResortDraft({
      ...resortDraft,
      pass: e.target.value as Pass
    });
  }

  const onLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      location: {
        ...resortDraft.location,
        latitude: parseFloat(e.target.value)
      }
    });
  }

  const onLonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      location: {
        ...resortDraft.location,
        longitude: parseFloat(e.target.value)
      }
    });
  }

  const onCreate = async () => {
    try {
      await SnowClient.createResort(resortDraft);
    } catch (e: any) {
      alert(e.message)
    }
  }

  return (
    <div className='absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center'>
      <div className='bg-neutral-900 bg-opacity-90 rounded-md text-white p-4 w-1/3'>
        <h1 className='text-2xl font-bold'>New Resort</h1>
        <div className='flex flex-col gap-2'>
          <form className='flex flex-col gap-2'>
            <label className='text-lg'>ID</label>
            <input type='text' value={resortDraft.id} onChange={onIdChange} className='rounded-md px-2 py-1 text-black' />
            <label className='text-lg'>Name</label>
            <input type='text' value={resortDraft.name} onChange={onNameChange} className='rounded-md px-2 py-1 text-black' />
            <label className='text-lg'>URL</label>
            <input type='text' value={resortDraft.url} onChange={onUrlChange} className='rounded-md px-2 py-1 text-black' />
            <label className='text-lg'>Pass</label>
            <select value={resortDraft.pass} onChange={onPassChange} className='rounded-md px-2 py-1 text-black'>
              <option value={'ikon'}>Ikon</option>
              <option value={'epic'}>Epic</option>
              <option value={undefined}>None</option>
            </select>
            <label className='text-lg'>Latitude</label>
            <input type='number' value={resortDraft.location.latitude} onChange={onLatChange} className='rounded-md px-2 py-1 text-black' />
            <label className='text-lg'>Longitude</label>
            <input type='number' value={resortDraft.location.longitude} onChange={onLonChange} className='rounded-md px-2 py-1 text-black' />
            <button onClick={onCreate} className='text-white bg-blue-500 hover:bg-blue-700 rounded-md px-2 py-1'>Create</button>
            <button onClick={() => onClose(false)} className='text-white bg-gray-500 hover:bg-gray-700 rounded-md px-2 py-1'>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
}