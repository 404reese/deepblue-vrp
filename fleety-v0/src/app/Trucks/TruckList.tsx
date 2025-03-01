// TruckList.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';

interface Truck {
  id: number;
  modelName: string;
  numberPlate: string;
  capacity: number;
  currentLocation: string;
}

interface TruckListProps {
  trucks: Truck[];
}

const TruckList = ({ trucks }: TruckListProps) => {
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
                <th className="border-b border-gray-300 px-4 py-2 text-center">Number Plate</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Capacity (tons)</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Current Location</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck) => (
                <tr key={truck.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.modelName}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.numberPlate}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.capacity}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{truck.currentLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/">
            <CardDescription className="mt-4 text-center text-xs">
              To manage trucks go to dashboard
            </CardDescription>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default TruckList;