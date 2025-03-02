"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const WarehouseList = () => {
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
      const response = await fetch(`http://localhost:8080/warehouses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete warehouse');
      }

      setWarehouses((prev) => prev.filter(warehouse => warehouse.id !== id));
      toast.success('Warehouse deleted successfully!');
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      toast.error('Failed to delete warehouse');
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
            Warehouse List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Address</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Latitude</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Longitude</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Total Capacity</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.name}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.address}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.addressLocation.latitude}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.addressLocation.longitude}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.totalCapacity}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">
                    <Button onClick={() => handleDelete(warehouse.id)} variant="destructive">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseList;