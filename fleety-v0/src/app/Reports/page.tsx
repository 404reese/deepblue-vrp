'use client';

import Link from 'next/link';
import { FC, useState, useRef, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { createRoot } from 'react-dom/client';

interface Waypoint {
  lat: number;
  lng: number;
}

const mumbaiLocations: Record<number, Waypoint[]> = {
  1: [
    { lat: 19.0760, lng: 72.8777 }, // Bandra
    { lat: 19.1243, lng: 72.8198 }, // Andheri
    { lat: 18.9751, lng: 72.8258 }, // Chhatrapati Shivaji Terminus
  ],
  2: []
};

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = { lat: 19.0760, lng: 72.8777 };

const MapComponent: FC<{ waypoints: Waypoint[] }> = ({ waypoints }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new google.maps.Map(mapRef.current, {
        center,
        zoom: 10
      });
      setMap(newMap);
    }

    if (map && waypoints.length >= 2) {
      const service = new google.maps.DirectionsService();
      const request = {
        origin: waypoints[0],
        destination: waypoints[waypoints.length - 1],
        waypoints: waypoints.slice(1, waypoints.length - 1).map(wp => ({
          location: wp,
          stopover: true
        })),
        travelMode: 'DRIVING'
      };

      service.route(request, (result, status) => {
        if (status === 'OK' && result?.routes?.[0]?.overview_path) {
          const path = result.routes[0].overview_path;
          const polyline = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
          polyline.setMap(map);
        } else {
          console.error('Error getting directions:', status);
        }
      });
    }
  }, [map, waypoints]);

  return <div ref={mapRef} style={containerStyle} />;
};

const ReportsPage: FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const openPDF = (filename: string) => {
    window.open(`/${filename}`, '_blank');
  };

  const handleViewRoute = (id: number) => {
    const waypoints = mumbaiLocations[id];
    if (waypoints.length === 0) {
      alert('No path data available');
      return;
    }
    
    setSelectedRouteId(id);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedRouteId(null);
  };

  return (
    <div className='p-5'>
      <div className="flex items-center text-3xl text-primary font-semibold mb-4">
        All Reports
      </div>
      
      {/* Report Cards */}
      <div className="p-5 border mb-5 border-gray-300 rounded-lg bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => openPDF('1.pdf')}>
            <h2 className="text-xl font-semibold">Delivery_Report_777a2f5d</h2>
            <p className="text-gray-600">Date : 2025-03-01</p>
          </div>
          <button 
            onClick={() => handleViewRoute(1)} 
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            View Route
          </button>
        </div>
      </div>

      <div className="p-5 border border-gray-300 rounded-lg bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => openPDF('2.pdf')}>
            <h2 className="text-xl font-semibold">Delivery_Report_ab762f5d</h2>
            <p className="text-gray-600">Date : 2025-02-27</p>
          </div>
          <button 
            onClick={() => handleViewRoute(2)} 
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            View Route
          </button>
        </div>
      </div>

      {/* Map Display */}
      {showMap && (
        <div className="mt-5 relative">
          <button 
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" 
            onClick={handleCloseMap}
          >
            Close
          </button>
          <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2}>
            <MapComponent waypoints={mumbaiLocations[selectedRouteId!]} />
          </Wrapper>
        </div>
      )}

      <Link href="http://localhost:8501" target='_blank'>
        <p className="text-xs text-primary underline mt-5">Dev Reports</p>
      </Link>
    </div>
  );
};

export default ReportsPage;