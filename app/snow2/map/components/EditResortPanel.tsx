import { MountainResort } from "@/common/types";
import React from "react";
import SnowClient from "../../SnowClient";

export type EditResortPanelProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  resort: MountainResort
}

export default function EditResortPanel({ visible, setVisible, resort }: EditResortPanelProps) {
  const [resortDraft, setResortDraft] = React.useState<MountainResort>(resort);
  const [status, setStatus] = React.useState<string | undefined>(undefined);

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
      pass: e.target.value === 'none' ? undefined : e.target.value as 'ikon' | 'epic'
    });
  }

  const onLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      location: {
        ...resortDraft.location,
        latitude: parseFloat(e.target.value)
      }
    });
  }

  const onLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      location: {
        ...resortDraft.location,
        longitude: parseFloat(e.target.value)
      }
    });
  }

  const onTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      sns: {
        ...resortDraft.sns,
        twitter: e.target.value
      }
    });
  }

  const onInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResortDraft({
      ...resortDraft,
      sns: {
        ...resortDraft.sns,
        instagram: e.target.value
      }
    });
  }

  const onSave = async () => {
    try {
      // todo: maybe hoist this to the parent component
      await SnowClient.updateResort(resort.id, resortDraft)
      setStatus('success')
    } catch (err) {
      // @ts-ignore
      setStatus(err.message)
    }
  }

  if (!visible) {
    return null;
  }

  // similar to ResortPanel but each text field is editable
  return (
    <div className='absolute top-0 left-0 z-10 w-1/3 h-full p-4 flex'>
      <div className='bg-neutral-900 bg-opacity-90 rounded-md text-white p-4 w-full'>
        <form className='space-y-4'>
          {/* id, not editable */}
          <label className='font-bold'>ID</label>
          <input type='text' value={resortDraft.id} className='w-full bg-neutral-800 text-white p-2 rounded-md' disabled />
          {/* name */}
          <label className='font-bold'>Name</label>
          <input type='text' value={resortDraft.name} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onNameChange} />
          {/* url */}
          <label className='font-bold'>URL</label>
          <input type='text' value={resortDraft.url} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onUrlChange} />
          {/* pass, dropdown list with "ikon" "epic" or "none" */}
          <label className='font-bold'>Pass</label>
          <select value={resortDraft.pass ? resortDraft.pass : 'none'} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onPassChange}>
            <option value='ikon'>Ikon</option>
            <option value='epic'>Epic</option>
            <option value='none'>None</option>
          </select>
          {/* location */}
          <label className='font-bold'>Location (Lat, Lng)</label>
          <input type='text' value={resortDraft.location.latitude} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onLatitudeChange} />
          <input type='text' value={resortDraft.location.longitude} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onLongitudeChange} />
          {/* sns */}
          <label className='font-bold'>Social Media</label>
          <input type='text' value={resortDraft.sns ? resortDraft.sns.twitter : ''} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onTwitterChange} />
          <input type='text' value={resortDraft.sns ? resortDraft.sns.instagram : ''} className='w-full bg-neutral-800 text-white p-2 rounded-md' onChange={onInstagramChange} />
          {/* save and close buttons */}
          <div className='flex'>
            <button type='button' onClick={onSave} className='text-white bg-blue-500 hover:bg-blue-700 rounded-md px-2 py-1'>Save</button>
            <button type='button' onClick={() => setVisible(false)} className='text-white bg-gray-500 hover:bg-gray-700 rounded-md px-2 py-1 ml-2'>Close</button>
          </div>
          {/* status */}
          {status ? <div className={status === 'success' ? 'text-green-500' : 'text-red-500'}>{status}</div> : undefined}
        </form>
      </div>
    </div>
  )
}