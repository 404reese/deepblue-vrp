// components/RouteRenderer.tsx
import React, { useEffect, useRef } from "react"; // NEW: Import useRef from React

const colors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFA500', 
  '#800080', '#FFC0CB', '#A52A2A', '#00FFFF'
];

interface RouteRendererProps {
  map: google.maps.Map | undefined;
  routeData: any | null;
}

const RouteRenderer = ({ map, routeData }: RouteRendererProps) => {
  const polylinesRef = useRef<google.maps.Polyline[]>([]); // NEW: useRef to store polylines

  useEffect(() => {
    if (!map || !routeData?.vehicles) return;

    // Clear existing polylines
    polylinesRef.current.forEach(polyline => polyline.setMap(null));
    polylinesRef.current = [];

    // Create new polylines for each vehicle
    routeData.vehicles.forEach((vehicle: any, index: number) => {
      if (!vehicle.visits) return;

      // Create a path for the polyline using visit locations
      const path = vehicle.visits.map((visit: any) => ({
        lat: visit.Location[0],
        lng: visit.Location[1]
      }));

      // Create a new polyline
      const polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: colors[index % colors.length], // Assign a unique color
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: map // Attach the polyline to the map
      });

      // Store the polyline in the ref for cleanup
      polylinesRef.current.push(polyline);
    });

    // Cleanup function to remove polylines when the component unmounts
    return () => {
      polylinesRef.current.forEach(polyline => polyline.setMap(null));
    };
  }, [map, routeData]); // Re-run effect when map or routeData changes

  return null; // This component doesn't render anything visible
};

export default RouteRenderer;