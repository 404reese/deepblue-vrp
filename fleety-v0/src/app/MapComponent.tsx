import React, { useEffect, useState, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createRoot } from "react-dom/client";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const options = {
  mapId: process.env.NEXT_PUBLIC_MAP_ID, // Added Map ID
  mapTypeControl: false,
  streetViewControl: false,
  scrollwheel: true,
};

const center = {
  lat: 19.046363208637395,
  lng: 72.8712831734423,
};

function MapComponent() {
  const ref = useRef();
  const [map, setMap] = useState();
  const [warehouses, setWarehouses] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, { ...options, center, zoom: 13 }));
  }, []);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch("http://localhost:8080/warehouses");
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };
    fetchWarehouses();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div ref={ref} style={containerStyle} />
      {map && (
        <>
          {warehouses.map((warehouse) => (
            <AdvancedMarker
              key={`warehouse-${warehouse.id}`}
              map={map}
              position={{
                lat: warehouse.addressLocation.latitude,
                lng: warehouse.addressLocation.longitude,
              }}
              content={<img src="/warehouse.svg" alt="Warehouse" style={{ width: "30px", height: "30px" }} />}
            />
          ))}
          {orders.map((order) => (
            <AdvancedMarker
              key={`order-${order.id}`}
              map={map}
              position={{
                lat: order.visit.location.latitude,
                lng: order.visit.location.longitude,
              }}
              content={<img src="/map-pin.svg" alt="Order Location" style={{ width: "30px", height: "30px" }} />}
            />
          ))}
        </>
      )}
    </>
  );
}

function AdvancedMarker({ map, position, content }) {
  const rootRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");
      rootRef.current = createRoot(container);
      markerRef.current = new google.maps.marker.AdvancedMarkerView({
        position,
        content: container,
      });
    }
    return () => (markerRef.current.map = null);
  }, []);

  useEffect(() => {
    rootRef.current.render(content);
    markerRef.current.position = position;
    markerRef.current.map = map;
  }, [map, position, content]);
}

export default function App() {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2} version="beta" libraries={["marker"]}>
      <MapComponent />
    </Wrapper>
  );
}
