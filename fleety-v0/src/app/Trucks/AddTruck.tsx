// AddTruck.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Truck {
  id: number;
  modelName: string;
  numberPlate: string;
  capacity: number;
  currentLocation: string;
}

interface AddTruckProps {
  trucks: Truck[];
  setTrucks: React.Dispatch<React.SetStateAction<Truck[]>>;
}

const AddTruck = ({ trucks, setTrucks }: AddTruckProps) => {
  const [newTruck, setNewTruck] = useState({
    modelName: '',
    numberPlate: '',
    capacity: 0,
    currentLocation: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'capacity') {
      setNewTruck((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewTruck((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = trucks.length > 0 ? Math.max(...trucks.map((truck) => truck.id)) + 1 : 1;

    const updatedTrucks = [
      ...trucks,
      { id: newId, ...newTruck },
    ];

    setTrucks(updatedTrucks);
    setNewTruck({
      modelName: '',
      numberPlate: '',
      capacity: 0,
      currentLocation: '',
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-truck mr-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
            </svg>
            Add Truck
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-row space-x-4">
              {/* Model Name */}
              <div className="flex-1">
                <Label htmlFor="modelName">Model Name</Label>
                <Input
                  type="text"
                  id="modelName"
                  name="modelName"
                  value={newTruck.modelName}
                  onChange={handleInputChange}
                  placeholder="Enter model name"
                  required
                />
              </div>

              {/* Number Plate */}
              <div className="flex-1">
                <Label htmlFor="numberPlate">Number Plate</Label>
                <Input
                  type="text"
                  id="numberPlate"
                  name="numberPlate"
                  value={newTruck.numberPlate}
                  onChange={handleInputChange}
                  placeholder="Enter number plate"
                  required
                />
              </div>

              {/* Capacity */}
              <div className="flex-1">
                <Label htmlFor="capacity">Capacity (tons)</Label>
                <Input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={newTruck.capacity}
                  onChange={handleInputChange}
                  placeholder="Enter capacity"
                  required
                />
              </div>

              {/* Current Location */}
              <div className="flex-1">
                <Label htmlFor="currentLocation">Current Location</Label>
                <Input
                  type="text"
                  id="currentLocation"
                  name="currentLocation"
                  value={newTruck.currentLocation}
                  onChange={handleInputChange}
                  placeholder="Enter current location"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Truck
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTruck;