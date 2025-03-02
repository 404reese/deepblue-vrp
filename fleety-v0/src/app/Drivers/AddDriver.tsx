"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Driver {
  id: number;
  name: string;
  phone: string;
  vehicleId?: number;
}

interface Vehicle {
  id: number;
  name: string;
  capacity: number;
  warehouseId: number;
  departureTime: string;
}

interface AddDriverProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
}

const AddDriver = ({ drivers, setDrivers }: AddDriverProps) => {
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    vehicleId: undefined as number | undefined,
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8080/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast.error('Failed to fetch vehicles');
      }
    };

    fetchVehicles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDriver((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newDriver.vehicleId) {
      toast.error('Please select a vehicle');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/drivers/${newDriver.vehicleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newDriver.name,
          phone: newDriver.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add driver');
      }

      const data = await response.json();
      setDrivers((prev) => [...prev, data]);
      setNewDriver({ name: '', phone: '', vehicleId: undefined });

      toast.success('Driver added successfully!');
    } catch (error) {
      console.error('Error adding driver:', error);
      toast.error(`Failed to add driver: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col space-y-4 m-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-3xl text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users mr-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
            Add Driver
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-row space-x-4">
              {/* Driver Name */}
              <div className="flex-1">
                <Label htmlFor="name">Driver Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={newDriver.name}
                  onChange={handleInputChange}
                  placeholder="Enter driver name"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex-1">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newDriver.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              {/* Vehicle Dropdown */}
              <div className="flex-1">
                <Label htmlFor="vehicleId">Assign Vehicle</Label>
                <Select
                  onValueChange={(value) =>
                    setNewDriver((prev) => ({ ...prev, vehicleId: parseInt(value, 10) }))
                  }
                  value={newDriver.vehicleId?.toString() || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                        {vehicle.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Driver
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AddDriver;