"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const WarehouseDashboardPanel = () => {
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      location: 'Andheri',
      capacity: 100,
      currentStock: 75,
      manager: 'Alice',
    },
    {
      id: 2,
      location: 'Bandra',
      capacity: 150,
      currentStock: 120,
      manager: 'Bob',
    },
  ]);

  return (
    <div className='m-4'>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-3xl text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
                <th className="border-b border-gray-300 px-4 py-2 text-center">Location</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Capacity</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Current Stock</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Manager</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.location}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.capacity}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.currentStock}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{warehouse.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/">
            <CardDescription className="mt-4 text-center text-xs">
              To manage warehouses go to dashboard
            </CardDescription>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseDashboardPanel;