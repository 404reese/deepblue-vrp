"use client";

import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FiMapPin } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiWarehouse } from "react-icons/pi";
import { renderToString } from "react-dom/server";

const warehouse: [number, number] = [51.505, -0.09]; // Warehouse location

const vehicle1Path: [number, number][] = [
  warehouse,
  [51.51, -0.1],
  [51.52, -0.11],
];

const vehicle2Path: [number, number][] = [
  warehouse,
  [51.495, -0.08],
  [51.49, -0.07],
];

// Muted colors for icons
const warehouseColor = "#4A5568"; // Muted Slate Gray
const pinColor = "rgb(24, 147, 247)"; // Muted Cool Gray

// Function to create a custom DivIcon for all markers
const markerIcon = new L.DivIcon({
  html: renderToString(<FaMapMarkerAlt size={32} color={pinColor} />),
  className: "custom-icon",
  iconSize: [24, 24],
  iconAnchor: [12, 24], // Adjust anchor so it correctly points
});

// Function for warehouse icon
const warehouseIcon = new L.DivIcon({
  html: renderToString(<PiWarehouse size={30} color={warehouseColor} />),
  className: "custom-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapComponent() {
  return (
    <MapContainer center={warehouse} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Warehouse Marker */}
      <Marker position={warehouse} icon={warehouseIcon}>
        <Popup>
          <h3>Warehouse</h3>
          <p>Main Distribution Hub</p>
        </Popup>
      </Marker>

      {/* Vehicle 1 Path (Red) */}
      <Polyline positions={vehicle1Path} color="red" />
      {vehicle1Path.slice(1).map((point, index) => (
        <Marker key={`v1-${index}`} position={point} icon={markerIcon}>
          <Popup>
            <h3>Delivery Point {index + 1}</h3>
            <p>Covered by Vehicle 1 (Red Path)</p>
          </Popup>
        </Marker>
      ))}

      {/* Vehicle 2 Path (Purple) */}
      <Polyline positions={vehicle2Path} color="purple" />
      {vehicle2Path.slice(1).map((point, index) => (
        <Marker key={`v2-${index}`} position={point} icon={markerIcon}>
          <Popup>
            <h3>Delivery Point {index + 1}</h3>
            <p>Covered by Vehicle 2 (Purple Path)</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
