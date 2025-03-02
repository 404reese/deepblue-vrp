"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Truck {
  id: number;
  name: string;
  capacity: number;
  warehouseId: number;
  departureTime: string;
}

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

interface AddTruckProps {
  setTrucks: React.Dispatch<React.SetStateAction<Truck[]>>;
}

const AddTruck = ({ setTrucks }: AddTruckProps) => {
  const [newTruck, setNewTruck] = useState({
    name: '',
    capacity: 0,
    warehouseId: 0,
    departureTime: new Date().toISOString(),
  });

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch('http://localhost:8080/warehouses');
        if (!response.ok) {
          throw new Error('Failed to fetch warehouses');
        }
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
        toast.error('Failed to fetch warehouses');
      }
    };

    fetchWarehouses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'capacity') {
      setNewTruck((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewTruck((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/vehicles/${newTruck.warehouseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTruck.name,
          capacity: newTruck.capacity,
          departureTime: newTruck.departureTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add truck');
      }

      const data = await response.json();
      setTrucks((prev) => [...prev, data]);
      setNewTruck({
        name: '',
        capacity: 0,
        warehouseId: 0,
        departureTime: new Date().toISOString(),
      }); // Reset form

      toast.success('Truck added successfully!');
    } catch (error) {
      console.error('Error adding truck:', error);
      toast.error('Failed to add truck');
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
                <Label htmlFor="name">Model Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={newTruck.name}
                  onChange={handleInputChange}
                  placeholder="Enter model name"
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

              {/* Warehouse */}
              <div className="flex-1">
                <Label htmlFor="warehouseId">Warehouse</Label>
                <Select onValueChange={(value) => setNewTruck((prev) => ({ ...prev, warehouseId: parseInt(value, 10) }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Departure Time */}
              <div className="flex-1">
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input
                  type="datetime-local"
                  id="departureTime"
                  name="departureTime"
                  value={newTruck.departureTime}
                  onChange={handleInputChange}
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
      <ToastContainer />
    </div>
  );
};

export default AddTruck;