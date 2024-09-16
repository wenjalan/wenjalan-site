'use client'
import * as React from 'react';
import Map, { Marker, MarkerEvent } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Popup } from 'mapbox-gl';

if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
  throw new Error('Please set the NEXT_PUBLIC_MAPBOX_TOKEN environment variable');
}

export default function Home() {

  const onMarkerClick = (e: MarkerEvent) => {
    // @ts-ignore
    e.target._map.flyTo({
      center: e.target._lngLat
    });
  }

  return (
    <Map
      initialViewState={{
        latitude: 46.9281656,
        longitude: -121.5148346,
        zoom: 7
      }}
      // fullscreen
      style={{ width: "100vw", height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      <Marker
        latitude={46.9281656}
        longitude={-121.5148346}
        color="red"
        // @ts-ignore
        onClick={onMarkerClick}
        popup={new Popup({ offset: 25 }).setHTML('<h1>Crystal Mountain Resort</h1>')}
      />
    </Map>
  );
}