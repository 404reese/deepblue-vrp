"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const TruckList = ({ trucks }: { trucks: Truck[] }) => {
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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/vehicles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete truck');
      }

      toast.success('Truck deleted successfully!');
    } catch (error) {
      console.error('Error deleting truck:', error);
      toast.error('Failed to delete truck');
    }
  };

  // Function to get warehouse name by ID
  const getWarehouseName = (warehouseId: number) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    return warehouse ? warehouse.name : 'N/A';
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
            Truck List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Model Name</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Capacity (tons)</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Warehouse</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Departure Time</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck) => (
                <tr key={truck.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.name}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.capacity}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">
                    {getWarehouseName(truck.warehouseId)}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.departureTime}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">
                    <Button onClick={() => handleDelete(truck.id)} variant="destructive">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default TruckList;