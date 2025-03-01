// AddOrder.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Order {
  id: number;
  pickupLocation: string;
  dropLocation: string;
  dropLocationLatLng: { lat: number; lng: number }; // Add latitude and longitude
  dimensions: string;
  weight: number;
  itemType: string;
  itemName: string;
}

interface AddOrderProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AddOrder = ({ orders, setOrders }: AddOrderProps) => {
  const [newOrder, setNewOrder] = useState({
    pickupLocation: 'Warehouse Alpha',
    dropLocation: '',
    dropLocationLatLng: { lat: 0, lng: 0 }, // Initialize with default values
    dimensions: '',
    weight: 0,
    itemType: 'Electronics',
    itemName: '',
  });

  const dropLocationRef = useRef<HTMLInputElement>(null); // Ref for the drop location input

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      if (dropLocationRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(dropLocationRef.current, {
          types: ['geocode'], // Restrict to geographical locations
        });

        // Listen for place changes
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            setNewOrder((prev) => ({
              ...prev,
              dropLocation: place.formatted_address || '',
              dropLocationLatLng: { lat: lat(), lng: lng() },
            }));
          }
        });
      }
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'weight') {
      setNewOrder((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewOrder((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = orders.length > 0 ? Math.max(...orders.map((order) => order.id)) + 1 : 1;

    const updatedOrders = [
      ...orders,
      { id: newId, ...newOrder },
    ];

    setOrders(updatedOrders);
    setNewOrder({
      pickupLocation: 'Warehouse Alpha',
      dropLocation: '',
      dropLocationLatLng: { lat: 0, lng: 0 },
      dimensions: '',
      weight: 0,
      itemType: 'Electronics',
      itemName: '',
    }); // Reset form
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-box mr-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
              <path d="M12 12l8 -4.5" />
              <path d="M12 12l0 9" />
              <path d="M12 12l-8 -4.5" />
            </svg>
            Add Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-row space-x-4">
              {/* Pickup Location Dropdown */}
              <div className="flex-1">
                <Label htmlFor="pickupLocation">Pickup Location</Label>
                <select
                  id="pickupLocation"
                  name="pickupLocation"
                  value={newOrder.pickupLocation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Warehouse Alpha">Warehouse Alpha</option>
                  <option value="Warehouse Beta">Warehouse Beta</option>
                </select>
              </div>

              {/* Drop Location with Google Maps Autocomplete */}
              <div className="flex-1">
                <Label htmlFor="dropLocation">Drop Location</Label>
                <Input
                  type="text"
                  id="dropLocation"
                  name="dropLocation"
                  ref={dropLocationRef}
                  value={newOrder.dropLocation}
                  onChange={handleInputChange}
                  placeholder="Enter drop location"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row space-x-4">
              {/* Dimensions */}
              <div className="flex-1">
                <Label htmlFor="dimensions">Dimensions (height x width x length)</Label>
                <Input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={newOrder.dimensions}
                  onChange={handleInputChange}
                  placeholder="Enter dimensions (e.g., 10x10x10)"
                  required
                />
              </div>

              {/* Weight */}
              <div className="flex-1">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  value={newOrder.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row space-x-4">
              {/* Item Type Dropdown */}
              <div className="flex-1">
                <Label htmlFor="itemType">Item Type</Label>
                <select
                  id="itemType"
                  name="itemType"
                  value={newOrder.itemType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Books">Books</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Item Name */}
              <div className="flex-1">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={newOrder.itemName}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOrder;