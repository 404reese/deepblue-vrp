// AddWarehouse.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Warehouse {
  id: number;
  location: string;
  capacity: number;
  currentStock: number;
  manager: string;
}

interface AddWarehouseProps {
  warehouses: Warehouse[];
  setWarehouses: React.Dispatch<React.SetStateAction<Warehouse[]>>;
}

const AddWarehouse = ({ warehouses, setWarehouses }: AddWarehouseProps) => {
  const [newWarehouse, setNewWarehouse] = useState({
    location: '',
    capacity: 0,
    currentStock: 0,
    manager: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'capacity' || name === 'currentStock') {
      setNewWarehouse((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setNewWarehouse((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = warehouses.length > 0 ? Math.max(...warehouses.map((warehouse) => warehouse.id)) + 1 : 1;

    const updatedWarehouses = [
      ...warehouses,
      { id: newId, ...newWarehouse },
    ];

    setWarehouses(updatedWarehouses);
    setNewWarehouse({
      location: '',
      capacity: 0,
      currentStock: 0,
      manager: '',
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
              {/* Location */}
              <div className="flex-1">
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={newWarehouse.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  required
                />
              </div>

              {/* Capacity */}
              <div className="flex-1">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={newWarehouse.capacity}
                  onChange={handleInputChange}
                  placeholder="Enter capacity"
                  required
                />
              </div>

              {/* Current Stock */}
              <div className="flex-1">
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input
                  type="number"
                  id="currentStock"
                  name="currentStock"
                  value={newWarehouse.currentStock}
                  onChange={handleInputChange}
                  placeholder="Enter current stock"
                  required
                />
              </div>

              {/* Manager */}
              <div className="flex-1">
                <Label htmlFor="manager">Manager</Label>
                <Input
                  type="text"
                  id="manager"
                  name="manager"
                  value={newWarehouse.manager}
                  onChange={handleInputChange}
                  placeholder="Enter manager name"
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