'use client'
import * as React from 'react';
import Map, { Marker, MarkerEvent } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { MountainResort, Pass } from '@/common/types';
import { useEffect } from 'react';
import SnowClient from '../SnowClient';
import { useSession } from 'next-auth/react';
import ResortPanel from './ResortPanel';
import EditResortPanel from './EditResortPanel';
import NewResortModal from './NewResortModal';

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
  const [newResortModalVisible, setNewResortModalVisible] = React.useState(false);

  useEffect(() => {
    SnowClient.getResorts()
      .then((resorts) => {
        setResorts(resorts)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  const onCloseResortPanel = () => {
    setResortPanelVisible(false);
    setSelectedResort(undefined);
  }

  const onCloseEditResortPanel = () => {
    setEditResortPanelVisible(false);
    setSelectedResort(undefined);
  }

  const onCloseNewResortPanel = () => {
    setNewResortModalVisible(false);
    setSelectedResort(undefined);
  }

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

  const onDelete = async (id: string) => {
    // ask for the resort id in a window alert
    const idToDelete = prompt(`Confirm you want to delete ${id} by typing its id`);
    if (idToDelete === id) {
      try {
        await SnowClient.deleteResort(id)
        window.alert(`Deleted ${id}`)
      } catch (e: any) {
        window.alert(e.message)
      }
    } else {
      window.alert(`ID mismatch, try again`)
    }
  }

  const onNew = () => {
    setEditResortPanelVisible(false)
    setResortPanelVisible(false)
    setNewResortModalVisible(true);
  }



  return (
    <>
      {canEdit && session != null ?
        <div className="absolute top-0 right-0 z-10 p-2 text-white">{session.user?.email}</div>
        : undefined
      }
      {error ? <ErrorModal error={error} /> : undefined}
      {/* create new resort floating action button bottom right */}
      {canEdit ?
        <button className='absolute bottom-0 right-0 z-10 m-4 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded' onClick={onNew}>New</button>
        : undefined
      }
      {
        newResortModalVisible && newResortModalVisible ?
          <NewResortModal
            onClose={onCloseNewResortPanel}
          />
          : undefined
      }
      {selectedResort && resortPanelVisible ?
        <ResortPanel
          onClose={onCloseResortPanel}
          canEdit={canEdit}
          onEdit={onEdit}
          onDelete={() => onDelete(selectedResort.id)}
          resort={selectedResort}
        />
        : undefined
      }
      {selectedResort && editResortPanelVisible ?
        <EditResortPanel
          onClose={onCloseEditResortPanel}
          resort={selectedResort}
        />
        : undefined}
      <Map
        initialViewState={{
          latitude: 46.8238718,
          longitude: -121.8643158,
          zoom: 6
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

type ErrorModalProps = {
  error: string
}

function ErrorModal({ error }: ErrorModalProps) {
  return (
    <div className='bg-red-500 text-white absolute bottom-0 left-0 z-20 p-2 text-sm'>{error}</div>
  );
}