import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

// Define types for the map, directions, and vehicle data
interface LatLng {
  lat: number;
  lng: number;
}

interface Vehicle {
  id: number;
  color: string;
  warehouse: LatLng;
  deliveryPoints: LatLng[];
}

interface DirectionsResult {
  id: number;
  result: google.maps.DirectionsResult | null;
  status: google.maps.DirectionsStatus;
}

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "600px",
};

const center: LatLng = {
  lat: 37.7749, // Default center (San Francisco)
  lng: -122.4194,
};

const MapComponent: React.FC = () => {
  const [directions, setDirections] = useState<DirectionsResult[]>([]);

  // Example data for vehicles, warehouses, and delivery points
  const vehicles: Vehicle[] = [
    {
      id: 1,
      color: "#FF0000", // Red
      warehouse: { lat: 37.7749, lng: -122.4194 }, // Warehouse location
      deliveryPoints: [
        { lat: 37.7849, lng: -122.4294 },
        { lat: 37.7949, lng: -122.4394 },
      ],
    },
    {
      id: 2,
      color: "#0000FF", // Blue
      warehouse: { lat: 37.7749, lng: -122.4194 }, // Warehouse location
      deliveryPoints: [
        { lat: 37.7649, lng: -122.4094 },
        { lat: 37.7549, lng: -122.3994 },
      ],
    },
  ];

  const directionsCallback = useCallback(
    (
      result: google.maps.DirectionsResult | null,
      status: google.maps.DirectionsStatus,
      vehicleId: number
    ) => {
      if (status === "OK" && result) {
        setDirections((prevDirections) => [
          ...prevDirections,
          { id: vehicleId, result, status },
        ]);
      }
    },
    []
  );

  // Load the Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Replace with your API key
  });

  if (!isLoaded) {
    return <div>Loading...</div>; // Show a loading state while the script is loading
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
    >
      {vehicles.map((vehicle) => (
        <React.Fragment key={vehicle.id}>
          {/* Marker for Warehouse */}
          <Marker position={vehicle.warehouse} label="W" />

          {/* DirectionsService to calculate path */}
          <DirectionsService
            options={{
              destination:
                vehicle.deliveryPoints[vehicle.deliveryPoints.length - 1],
              origin: vehicle.warehouse,
              waypoints: vehicle.deliveryPoints
                .slice(0, -1)
                .map((point) => ({
                  location: point,
                  stopover: true,
                })),
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={(result, status) =>
              directionsCallback(result, status, vehicle.id)
            }
          />

          {/* DirectionsRenderer to display path */}
          {directions
            .filter((dir) => dir.id === vehicle.id)
            .map((dir) => (
              <DirectionsRenderer
                key={dir.id}
                options={{
                  directions: dir.result,
                  polylineOptions: {
                    strokeColor: vehicle.color,
                    strokeOpacity: 1,
                    strokeWeight: 4,
                  },
                }}
              />
            ))}
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};

export default MapComponent;