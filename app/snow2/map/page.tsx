'use client'
import * as React from 'react';
import Map, { Marker, MarkerEvent } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { MountainResort } from '@/common/types';
import { useEffect } from 'react';
import SnowClient from '../SnowClient';

if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  throw new Error('Please set the NEXT_PUBLIC_MAPBOX_TOKEN environment variable');
}

export default function Home() {
  const [resorts, setResorts] = React.useState<MountainResort[]>([]);
  const [selectedResort, setSelectedResort] = React.useState<MountainResort | undefined>(resorts[0]);
  const [error, setError] = React.useState<string | null>();

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
    // @ts-ignore
    e.target._map.flyTo({
      center: e.target._lngLat
    });
  }

  return (
    <>
      {error ? <ErrorModal error={error} /> : undefined}
      {selectedResort ? <ResortPanel resort={selectedResort} /> : undefined}
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
  resort: MountainResort
}

function ResortPanel({ resort }: ResortPanelProps) {
  return (
    // white bg
    <div className='absolute top-0 left-0 z-10 w-1/3 h-full p-4 flex'>
      <div className='bg-neutral-900 bg-opacity-90 rounded-md text-white p-4 w-full'>
        <h1 className='text-2xl font-bold'><a href={resort.url} target='_blank'>{resort.name}</a></h1>
      </div>
    </div>
  );
}

type ErrorModalProps = {
  error: string
}

function ErrorModal({ error }: ErrorModalProps) {
  return (
    <div className='bg-red-500 text-white absolute bottom-0 left-0 z-20 p-2 text-sm'>{error}</div>
  );
}