import React, { useEffect, useRef, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const options = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
  mapTypeControl: false,
  streetViewControl: false,
  scrollwheel: true,
};

const center = {
  lat: 19.046363208637395,
  lng: 72.8712831734423,
};

function MapComponent({ solution }) {
  const ref = useRef();
  const [map, setMap] = useState();
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  // Initialize the map
  useEffect(() => {
    const mapInstance = new window.google.maps.Map(ref.current, { ...options, center, zoom: 13 });
    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map: mapInstance }));
  }, []);

  // Plot vehicle routes
  useEffect(() => {
    if (map && directionsService && directionsRenderer && solution) {
      solution.vehicles.forEach((vehicle) => {
        const waypoints = vehicle.visits
          .map((visitId) => {
            const visit = solution.visits.find((v) => v.id === visitId);
            return visit ? { location: new google.maps.LatLng(visit.location[0], visit.location[1]), stopover: true } : null;
          })
          .filter((waypoint) => waypoint);

        const origin = new google.maps.LatLng(vehicle.homeLocation[0], vehicle.homeLocation[1]);
        const destination = waypoints.length > 0 ? waypoints.pop().location : origin;

        directionsService.route(
          {
            origin,
            destination,
            waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.error(`Error fetching directions for vehicle ${vehicle.id}: ${status}`);
            }
          }
        );
      });
    }
  }, [map, directionsService, directionsRenderer, solution]);

  return (
    <div ref={ref} style={containerStyle} />
  );
}

export default function RouteMap({ solution }) {
  return (
    <MapComponent solution={solution} />
  );
}