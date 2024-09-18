'use client'
import * as React from 'react';
import Map, { Marker, MarkerEvent } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { MountainResort } from '@/common/types';
import { useEffect } from 'react';
import SnowClient from '../SnowClient';
import { type } from 'os';
import { useSession } from 'next-auth/react';

if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  throw new Error('Please set the NEXT_PUBLIC_MAPBOX_TOKEN environment variable');
}

export default function Home() {
  const { data: session, status } = useSession()

  // only enable editing if it's an authenticated user
  const canEdit: boolean = status === "authenticated" && session ? true : false;

  const [resorts, setResorts] = React.useState<MountainResort[]>([]);
  const [selectedResort, setSelectedResort] = React.useState<MountainResort | undefined>(resorts[0]);
  const [error, setError] = React.useState<string | null>();
  const [resortPanelVisible, setResortPanelVisible] = React.useState(false);
  const [editResortPanelVisible, setEditResortPanelVisible] = React.useState(false);

  useEffect(() => {
    SnowClient.getResorts()
      .then((resorts) => {
        setResorts(resorts)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  const onMarkerClick = (e: MarkerEvent, resort: MountainResort) => {
    setSelectedResort(resort);
    setResortPanelVisible(true);
    setEditResortPanelVisible(false);
    // @ts-ignore
    e.target._map.flyTo({
      center: e.target._lngLat
    });
  }

  const onEdit = () => {
    setEditResortPanelVisible(true);
    setResortPanelVisible(false);
  }

  return (
    <>
      {status === "authenticated" && session ?
        <div className="absolute top-0 right-0 z-10 p-2 text-white">{session.user?.email}</div>
        : undefined
      }
      {error ? <ErrorModal error={error} /> : undefined}
      {selectedResort ?
        <ResortPanel
          visible={resortPanelVisible}
          setVisible={setResortPanelVisible}
          canEdit={canEdit}
          onEdit={onEdit}
          resort={selectedResort}
        />
        : undefined
      }
      {selectedResort ?
        <EditResortPanel
          visible={editResortPanelVisible}
          setVisible={setEditResortPanelVisible}
          resort={selectedResort}
        />
        : undefined}
      <Map
        initialViewState={{
          latitude: 46.9281656,
          longitude: -121.5148346,
          zoom: 7
        }}
        style={{ width: "100vw", height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {resorts.map((resort) => (
          <Marker
            key={resort.id}
            latitude={resort.location.latitude}
            longitude={resort.location.longitude}
            color="red"
            // @ts-ignore
            onClick={(e) => onMarkerClick(e, resort)}
          />
        ))}
      </Map>
    </>
  );
}

type ResortPanelProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  canEdit: boolean
  onEdit: () => void
  resort: MountainResort
}

function ResortPanel({ visible, setVisible, canEdit, onEdit, resort }: ResortPanelProps) {
  if (!visible) {
    return null;
  }
  return (
    <div className='absolute top-0 left-0 z-10 w-1/3 h-full p-4 flex'>
      <div className='bg-neutral-900 bg-opacity-90 rounded-md text-white p-4 w-full'>
        {/* name */}
        <h1 className='text-2xl font-bold'><a href={resort.url} target='_blank'>{resort.name}</a></h1>
        {/* temp debug info displays */}
        {/* id */}
        <p className='text-lg'>id={resort.id}</p>
        {/* pass */}
        <p className='text-lg'>pass={resort.pass}</p>
        {/* location */}
        <p className='text-lg'>lat={resort.location.latitude}, lon={resort.location.longitude}</p>
        {/* weather */}
        <p className='text-lg'>weather={resort.weather ? 'defined' : 'undefined'}</p>
        {/* webcams */}
        <p className='text-lg'>webcams={resort.webcams ? 'defined' : 'undefined'}</p>
        {/* sns */}
        <p className='text-lg'>sns={resort.sns ? 'defined' : 'undefined'}</p>
        {/* edit and close buttons */}
        <div className='flex'>
          { canEdit ? <button onClick={onEdit} className='text-white bg-blue-500 hover:bg-blue-700 rounded-md px-2 py-1'>Edit</button> : undefined }
          <button onClick={() => setVisible(false)} className='text-white bg-gray-500 hover:bg-gray-700 rounded-md px-2 py-1'>Close</button>
        </div>
      </div>
    </div>
  );
}

type EditResortPanelProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  resort: MountainResort
}

function EditResortPanel({ visible, setVisible, resort }: EditResortPanelProps) {
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

type ErrorModalProps = {
  error: string
}

function ErrorModal({ error }: ErrorModalProps) {
  return (
    <div className='bg-red-500 text-white absolute bottom-0 left-0 z-20 p-2 text-sm'>{error}</div>
  );
}