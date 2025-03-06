import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createRoot } from "react-dom/client";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const options = {
  mapTypeControl: false,
  streetViewControl: false,
  scrollwheel: true,
};

// Define an array of colors for vehicle routes
const ROUTE_COLORS = [
  "#FF5733", // Red-Orange
  "#33A1FF", // Blue
  "#33FF57", // Green
  "#FF33A1", // Pink
  "#A133FF", // Purple
  "#FFFF33", // Yellow
  "#33FFFF", // Cyan
  "#FF8333", // Orange
  "#8333FF", // Indigo
  "#33FF83", // Mint
];

function RouteMapComponent({ solution }) {
  const ref = useRef();
  const [map, setMap] = useState(null);
  const [routePolylines, setRoutePolylines] = useState([]);
  const [routeMarkers, setRouteMarkers] = useState([]);

  // Set default center if no solution is provided
  const defaultCenter = {
    lat: 19.046363208637395,
    lng: 72.8712831734423,
  };

  // Initialize the map
  useEffect(() => {
    if (window.google) {
      setMap(new window.google.maps.Map(ref.current, { 
        ...options, 
        center: defaultCenter, 
        zoom: 12 
      }));
    }
  }, []);

  // Draw routes when solution data changes
  useEffect(() => {
    if (!map || !solution || !solution.vehicles || !solution.visits) {
      console.log("Missing required data for route visualization", { map, solution });
      return;
    }
    
    console.log("Drawing routes with data:", solution);
    
    // Clear previous routes and markers
    routePolylines.forEach(polyline => polyline.setMap(null));
    routeMarkers.forEach(marker => marker.setMap(null));
    
    const newPolylines = [];
    const newMarkers = [];
    
    // Process each vehicle's route
    solution.vehicles.forEach((vehicle, vehicleIndex) => {
      const vehicleColor = ROUTE_COLORS[vehicleIndex % ROUTE_COLORS.length];
      
      // Get the home location as starting point
      const homeLocation = vehicle.homeLocation;
      if (!homeLocation || homeLocation.length !== 2) {
        console.error(`Invalid home location for vehicle ${vehicle.id}:`, homeLocation);
        return;
      }
      
      // Create a marker for the home location (warehouse)
      const homeMarker = new google.maps.Marker({
        position: { lat: homeLocation[0], lng: homeLocation[1] },
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: vehicleColor,
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
        },
        title: `Vehicle ${vehicle.id} Home`,
      });
      newMarkers.push(homeMarker);
      
      // Find all visits assigned to this vehicle
      const vehicleVisitIds = vehicle.visits || [];
      const vehicleVisits = solution.visits.filter(visit => vehicleVisitIds.includes(visit.id));
      
      console.log(`Vehicle ${vehicle.id} has ${vehicleVisitIds.length} assigned visits, found ${vehicleVisits.length} matching visits`);
      
      // Sort visits by arrival time to ensure correct sequence
      vehicleVisits.sort((a, b) => {
        const timeA = new Date(a.arrivalTime).getTime();
        const timeB = new Date(b.arrivalTime).getTime();
        return timeA - timeB;
      });
      
      if (vehicleVisits.length > 0) {
        // Create path coordinates starting from home location
        const path = [
          { lat: homeLocation[0], lng: homeLocation[1] }
        ];
        
        // Add each visit location to the path
        vehicleVisits.forEach(visit => {
          // Check if location exists in the expected format
          if (visit.location && Array.isArray(visit.location) && visit.location.length === 2) {
            const lat = visit.location[0];
            const lng = visit.location[1];
            
            path.push({ lat, lng });
            
            // Create a marker for each visit
            const visitMarker = new google.maps.Marker({
              position: { lat, lng },
              map: map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: vehicleColor,
                fillOpacity: 0.7,
                strokeColor: "#FFFFFF",
                strokeWeight: 1,
              },
              title: `Visit ${visit.id} (Vehicle ${vehicle.id})`,
            });
            newMarkers.push(visitMarker);
          } else {
            console.error(`Invalid location for visit ${visit.id}:`, visit.location);
          }
        });
        
        // Add final path back to home location
        path.push({ lat: homeLocation[0], lng: homeLocation[1] });
        
        // Create a polyline for the vehicle's route
        const polyline = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: vehicleColor,
          strokeOpacity: 0.8,
          strokeWeight: 3,
          map: map,
        });
        newPolylines.push(polyline);
      }
    });
    
    // Update state with new polylines and markers
    setRoutePolylines(newPolylines);
    setRouteMarkers(newMarkers);
    
    // Adjust map bounds to fit all routes if there are any
    if (newPolylines.length > 0 && solution.southWestCorner && solution.northEastCorner) {
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(solution.southWestCorner[0], solution.southWestCorner[1]),
        new google.maps.LatLng(solution.northEastCorner[0], solution.northEastCorner[1])
      );
      map.fitBounds(bounds);
    }
  }, [map, solution]);

  return (
    <div className="route-map-container" style={{ width: "100%", height: "100vh" }}>
      <div ref={ref} style={containerStyle} />
    </div>
  );
}

export default function RouteMap({ solution }) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2} version="beta" libraries={["marker"]}>
      <RouteMapComponent solution={solution} />
    </Wrapper>
  );
}
