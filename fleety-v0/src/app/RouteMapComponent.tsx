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

// Helper function to format date and time
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "N/A";
  const date = new Date(dateTimeString);
  return date.toLocaleString();
};

// Helper function to format duration in seconds to minutes and hours
const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "N/A";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

function RouteMapComponent({ solution }) {
  const ref = useRef();
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderers, setDirectionsRenderers] = useState([]);
  const [routeMarkers, setRouteMarkers] = useState([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState(null);

  // Set default center if no solution is provided
  const defaultCenter = {
    lat: 19.046363208637395,
    lng: 72.8712831734423,
  };

  // Initialize the map and directions service
  useEffect(() => {
    if (window.google) {
      const newMap = new window.google.maps.Map(ref.current, { 
        ...options, 
        center: defaultCenter, 
        zoom: 12 
      });
      setMap(newMap);
      
      // Initialize the directions service
      const newDirectionsService = new window.google.maps.DirectionsService();
      setDirectionsService(newDirectionsService);
    }
  }, []);

  // Clear all routes and markers
  const clearRoutesAndMarkers = () => {
    // Close any open info window
    if (activeInfoWindow) {
      activeInfoWindow.close();
      setActiveInfoWindow(null);
    }
    
    // Clear all direction renderers
    directionsRenderers.forEach(renderer => {
      renderer.setMap(null);
    });
    setDirectionsRenderers([]);
    
    // Clear all markers
    routeMarkers.forEach(marker => {
      marker.setMap(null);
    });
    setRouteMarkers([]);
  };

  // Create and open an info window with the provided content
  const createInfoWindow = (marker, content) => {
    // Close any existing info window
    if (activeInfoWindow) {
      activeInfoWindow.close();
    }
    
    // Create a new info window
    const infoWindow = new google.maps.InfoWindow({
      content,
      maxWidth: 300
    });
    
    // Open the info window
    infoWindow.open(map, marker);
    setActiveInfoWindow(infoWindow);
    
    // Add a listener to close the info window when the map is clicked
    google.maps.event.addListenerOnce(map, 'click', () => {
      infoWindow.close();
      setActiveInfoWindow(null);
    });
  };

  // Generate content for warehouse info window
  const generateWarehouseContent = (vehicle) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 5px;">
        <h3 style="margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;">Warehouse</h3>
        <p><strong>Vehicle ID:</strong> ${vehicle.id}</p>
        <p><strong>Location:</strong> [${vehicle.homeLocation[0].toFixed(6)}, ${vehicle.homeLocation[1].toFixed(6)}]</p>
        <p><strong>Capacity:</strong> ${vehicle.capacity || 'N/A'}</p>
        <p><strong>Departure Time:</strong> ${formatDateTime(vehicle.departureDateTime)}</p>
        <p><strong>Total Driving Time:</strong> ${formatDuration(vehicle.totalDrivingTimeSeconds)}</p>
        <p><strong>Total Demand:</strong> ${vehicle.totalDemand || 'N/A'}</p>
        <p><strong>Assigned Visits:</strong> ${vehicle.visits ? vehicle.visits.length : 0}</p>
      </div>
    `;
  };

  // Generate content for visit info window
  const generateVisitContent = (visit, vehicleId, vehicleColor) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 5px;">
        <h3 style="margin: 0 0 8px 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Location</h3>
        <p><strong>Visit ID:</strong> ${visit.id}</p>
        <p><strong>Vehicle ID:</strong> ${vehicleId}</p>
        <p><strong>Location:</strong> [${visit.location[0].toFixed(6)}, ${visit.location[1].toFixed(6)}]</p>
        <p><strong>Demand:</strong> ${visit.demand || 'N/A'}</p>
        <p><strong>Service Duration:</strong> ${formatDuration(visit.serviceDuration)}</p>
        <p><strong>Arrival Time:</strong> ${formatDateTime(visit.arrivalTime)}</p>
        <p><strong>Service Start Time:</strong> ${formatDateTime(visit.startServiceTime)}</p>
        <p><strong>Departure Time:</strong> ${formatDateTime(visit.departureTime)}</p>
        <p><strong>Driving Time from Previous:</strong> ${formatDuration(visit.drivingTimeSecondsFromPreviousStandstill)}</p>
        <p><strong>Time Window:</strong> ${formatDateTime(visit.minStartTime)} - ${formatDateTime(visit.maxEndTime)}</p>
      </div>
    `;
  };

  // Draw routes when solution data changes
  useEffect(() => {
    if (!map || !directionsService || !solution || !solution.vehicles || !solution.visits) {
      console.log("Missing required data for route visualization", { map, directionsService, solution });
      return;
    }
    
    console.log("Drawing routes with data:", solution);
    
    // Clear previous routes and markers
    clearRoutesAndMarkers();
    
    const newMarkers = [];
    const newRenderers = [];
    
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
      
      // Add click listener for warehouse marker
      homeMarker.addListener('click', () => {
        const content = generateWarehouseContent(vehicle);
        createInfoWindow(homeMarker, content);
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
        // Create waypoints for the route
        const waypoints = [];
        
        // Add visit markers and collect waypoints
        vehicleVisits.forEach(visit => {
          if (visit.location && Array.isArray(visit.location) && visit.location.length === 2) {
            const lat = visit.location[0];
            const lng = visit.location[1];
            
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
            
            // Add click listener for visit marker
            visitMarker.addListener('click', () => {
              const content = generateVisitContent(visit, vehicle.id, vehicleColor);
              createInfoWindow(visitMarker, content);
            });
            
            newMarkers.push(visitMarker);
            
            // Add to waypoints
            waypoints.push({
              location: new google.maps.LatLng(lat, lng),
              stopover: true
            });
          } else {
            console.error(`Invalid location for visit ${visit.id}:`, visit.location);
          }
        });
        
        // Create a directions renderer for this vehicle
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
          suppressMarkers: true, // We're creating our own markers
          polylineOptions: {
            strokeColor: vehicleColor,
            strokeOpacity: 0.8,
            strokeWeight: 5
          }
        });
        newRenderers.push(directionsRenderer);
        
        // Split into segments if there are many waypoints (Google has a limit of 25 waypoints)
        const MAX_WAYPOINTS = 23; // Leave room for origin and destination
        if (waypoints.length <= MAX_WAYPOINTS) {
          // Request directions for the entire route
          requestDirections(
            directionsService,
            directionsRenderer,
            new google.maps.LatLng(homeLocation[0], homeLocation[1]), // Origin
            new google.maps.LatLng(homeLocation[0], homeLocation[1]), // Return to origin
            waypoints
          );
        } else {
          // Split into multiple segments
          console.log(`Route for vehicle ${vehicle.id} has ${waypoints.length} waypoints, splitting into segments`);
          
          // Create multiple renderers for segments
          const segments = [];
          for (let i = 0; i < waypoints.length; i += MAX_WAYPOINTS) {
            const segmentWaypoints = waypoints.slice(i, i + MAX_WAYPOINTS);
            
            // Create origin and destination for this segment
            let origin, destination;
            
            if (i === 0) {
              // First segment starts from home
              origin = new google.maps.LatLng(homeLocation[0], homeLocation[1]);
            } else {
              // Other segments start from the last waypoint of the previous segment
              const prevWaypoint = waypoints[i - 1];
              origin = prevWaypoint.location;
            }
            
            if (i + MAX_WAYPOINTS >= waypoints.length) {
              // Last segment ends at home
              destination = new google.maps.LatLng(homeLocation[0], homeLocation[1]);
            } else {
              // Other segments end at the first waypoint of the next segment
              destination = waypoints[i + MAX_WAYPOINTS].location;
            }
            
            // Create a renderer for this segment
            const segmentRenderer = new google.maps.DirectionsRenderer({
              map: map,
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: vehicleColor,
                strokeOpacity: 0.8,
                strokeWeight: 5
              }
            });
            newRenderers.push(segmentRenderer);
            
            // Request directions for this segment
            requestDirections(
              directionsService,
              segmentRenderer,
              origin,
              destination,
              segmentWaypoints
            );
          }
        }
      }
    });
    
    // Update state with new renderers and markers
    setDirectionsRenderers(newRenderers);
    setRouteMarkers(newMarkers);
    
    // Adjust map bounds to fit all routes if there are any
    if (newMarkers.length > 0 && solution.southWestCorner && solution.northEastCorner) {
      const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(solution.southWestCorner[0], solution.southWestCorner[1]),
        new google.maps.LatLng(solution.northEastCorner[0], solution.northEastCorner[1])
      );
      map.fitBounds(bounds);
    }
  }, [map, directionsService, solution]);

  // Function to request directions
  const requestDirections = (service, renderer, origin, destination, waypoints) => {
    service.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING,
      optimizeWaypoints: false, // Don't reorder waypoints, we already have the sequence
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        renderer.setDirections(result);
      } else {
        console.error(`Directions request failed: ${status}`, { origin, destination, waypoints });
        
        // Fallback to straight lines if directions request fails
        if (waypoints && waypoints.length > 0) {
          const path = [origin];
          waypoints.forEach(wp => path.push(wp.location));
          path.push(destination);
          
          const polyline = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: renderer.polylineOptions.strokeColor,
            strokeOpacity: renderer.polylineOptions.strokeOpacity,
            strokeWeight: renderer.polylineOptions.strokeWeight,
            map: map,
          });
        }
      }
    });
  };

  return (
    <div className="route-map-container" style={{ width: "100%", height: "100vh" }}>
      <div ref={ref} style={containerStyle} />
    </div>
  );
}

export default function RouteMap({ solution }) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2} version="beta" libraries={["marker", "routes"]}>
      <RouteMapComponent solution={solution} />
    </Wrapper>
  );
}
