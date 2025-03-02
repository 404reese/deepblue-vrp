import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { map } from 'leaflet'

const containerStyle = {
  width: '100%',
  height: '90vh',
}

const options = {
  mapTypeControl: false,
  // clickableIcons: false,
  streetViewControl: false,
  scrollwheel: true,
}

const center = {
  lat: 19.046363208637395,
  lng: 72.8712831734423,
}

const pinIcon = {
  url: '/map-pin.svg',
  scaledSize: {width : 30, height : 30},
}

const warehouseIcon = {
  url: '/warehouse.svg',
  scaledSize: {width : 30, height : 30},
}

function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2,
    // kjsit 19.046363208637395, 72.8712831734423
  })


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={options}
    >
      {[...Array(100)].map((_, i) => {
        const lat = center.lat + (Math.random() - 0.5) * 0.1
        const lng = center.lng + (Math.random() - 0.5) * 0.1
        return <Marker icon={pinIcon} key={i} position={{ lat, lng }} />
      })}
      <Marker position = {{lat : 19.046363208637395, lng : 72.8712831734423}} icon={warehouseIcon} />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default React.memo(MapComponent)