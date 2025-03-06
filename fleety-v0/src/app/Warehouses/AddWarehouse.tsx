"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

interface Warehouse {
  id: number;
  name: string;
  address: string;
  addressLocation: {
    latitude: number;
    longitude: number;
  };
  totalCapacity?: number;
}

interface AddWarehouseProps {
  setWarehouses: React.Dispatch<React.SetStateAction<Warehouse[]>>;
}

const AddWarehouse = ({ setWarehouses }: AddWarehouseProps) => {
  const [newWarehouse, setNewWarehouse] = useState({
    name: '',
    address: '',
    addressLocation: {
      latitude: 0,
      longitude: 0,
    },
    totalCapacity: 0,
  });

  const addressRef = useRef(null);

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      if (addressRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(addressRef.current, {
          types: ["geocode"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            setNewWarehouse((prev) => ({
              ...prev,
              address: place.formatted_address || "",
              addressLocation: { latitude: lat(), longitude: lng() },
            }));
          }
        });
      }
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'totalCapacity') {
      setNewWarehouse((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setNewWarehouse((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/warehouses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWarehouse),
      });

      if (!response.ok) {
        throw new Error('Failed to add warehouse');
      }

      const data = await response.json();
      setWarehouses((prev) => [...prev, data]);
      setNewWarehouse({
        name: '',
        address: '',
        addressLocation: {
          latitude: 0,
          longitude: 0,
        },
        totalCapacity: 0,
      }); // Reset form

      alert('Warehouse added successfully!');
    } catch (error) {
      console.error('Error adding warehouse:', error);
      alert('Failed to add warehouse');
    }
  };

  return (
    <div className="flex flex-col space-y-4 m-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-3xl text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-building-warehouse mr-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 21v-13l9 -4l9 4v13" />
              <path d="M13 13h4v8h-10v-6h6" />
              <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" />
            </svg>
            Add Warehouse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-row space-x-4">
              {/* Name */}
              <div className="flex-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={newWarehouse.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  ref={addressRef}
                  value={newWarehouse.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  required
                />
              </div>

              {/* Latitude */}
              <div className="flex-1">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  type="number"
                  id="latitude"
                  name="latitude"
                  value={newWarehouse.addressLocation.latitude}
                  onChange={handleInputChange}
                  placeholder="Enter latitude"
                  readOnly
                />
              </div>

              {/* Longitude */}
              <div className="flex-1">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  type="number"
                  id="longitude"
                  name="longitude"
                  value={newWarehouse.addressLocation.longitude}
                  onChange={handleInputChange}
                  placeholder="Enter longitude"
                  readOnly
                />
              </div>

              {/* Total Capacity */}
              <div className="flex-1">
                <Label htmlFor="totalCapacity">Total Capacity</Label>
                <Input
                  type="number"
                  id="totalCapacity"
                  name="totalCapacity"
                  value={newWarehouse.totalCapacity}
                  onChange={handleInputChange}
                  placeholder="Enter total capacity"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Warehouse
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddWarehouse;