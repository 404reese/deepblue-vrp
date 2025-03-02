"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

interface Order {
  id: number;
  senderName: string;
  receiverName: string;
  receiverAddress: string;
  phoneNumber: string;
  visit: {
    location: {
      latitude: number;
      longitude: number;
    };
    demand: number;
    minStartTime: string;
    maxEndTime: string;
    serviceDuration: string;
  };
}

interface Warehouse {
  id: string;
  name: string;
}

const AddOrder = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string>("");
  const [newOrder, setNewOrder] = useState({
    senderName: "",
    receiverName: "",
    receiverPhoneNumber: "",
    dropLocation: "",
    dropLocationLatLng: { lat: 0, lng: 0 },
    weight: 1,
    startTime: "",
    endTime: "",
    serviceTime: "",
  });

  const dropLocationRef = useRef<HTMLInputElement>(null);

  // Fetch warehouses from the backend
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

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      if (dropLocationRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(dropLocationRef.current, {
          types: ["geocode"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            setNewOrder((prev) => ({
              ...prev,
              dropLocation: place.formatted_address || "",
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedWarehouseId) {
      alert("Please select a warehouse");
      return;
    }

    const orderData = {
      senderName: newOrder.senderName,
      receiverName: newOrder.receiverName,
      receiverAddress: newOrder.dropLocation,
      phoneNumber: newOrder.receiverPhoneNumber,
      visit: {
        location: {
          latitude: newOrder.dropLocationLatLng.lat,
          longitude: newOrder.dropLocationLatLng.lng,
        },
        demand: newOrder.weight,
        minStartTime: newOrder.startTime,
        maxEndTime: newOrder.endTime,
        serviceDuration: `PT${newOrder.serviceTime}M`, // Convert minutes to ISO 8601 duration
      },
    };

    try {
      const response = await fetch(`http://localhost:8080/orders/${selectedWarehouseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Order created successfully!");
        console.log("Order created:", data);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order");
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
            {/* Warehouse Dropdown */}
            <div className="flex-1">
              <Label htmlFor="warehouse">Warehouse</Label>
              <select
                id="warehouse"
                name="warehouse"
                value={selectedWarehouseId}
                onChange={(e) => setSelectedWarehouseId(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select a warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sender and Receiver Info */}
            <div className="flex flex-row space-x-4">
              <div className="flex-1">
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={newOrder.senderName}
                  onChange={handleInputChange}
                  placeholder="Enter sender name"
                  required
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="receiverName">Receiver Name</Label>
                <Input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  value={newOrder.receiverName}
                  onChange={handleInputChange}
                  placeholder="Enter receiver name"
                  required
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="receiverPhoneNumber">Receiver Phone Number</Label>
                <Input
                  type="text"
                  id="receiverPhoneNumber"
                  name="receiverPhoneNumber"
                  value={newOrder.receiverPhoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter receiver phone number"
                  required
                />
              </div>
            </div>

            {/* Drop Location */}
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

            {/* Start Time, End Time, and Service Time */}
            <div className="flex flex-row space-x-4">
              <div className="flex-1">
                <Label htmlFor="startTime">Start Time</Label>
                <DateTimePicker
                  onChange={(value) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      startTime: value ? value.toISOString() : "",
                    }))
                  }
                  value={newOrder.startTime ? new Date(newOrder.startTime) : null}
                  format="yyyy-MM-dd HH:mm"
                  disableClock={true}
                  clearIcon={null}
                  required
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="endTime">End Time</Label>
                <DateTimePicker
                  onChange={(value) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      endTime: value ? value.toISOString() : "",
                    }))
                  }
                  value={newOrder.endTime ? new Date(newOrder.endTime) : null}
                  format="yyyy-MM-dd HH:mm"
                  disableClock={true}
                  clearIcon={null}
                  required
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="serviceTime">Service Time (Minutes)</Label>
                <Input
                  type="number"
                  id="serviceTime"
                  name="serviceTime"
                  value={newOrder.serviceTime}
                  onChange={(e) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      serviceTime: e.target.value,
                    }))
                  }
                  placeholder="Enter service time in minutes"
                  min="0"
                  required
                />
              </div>
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