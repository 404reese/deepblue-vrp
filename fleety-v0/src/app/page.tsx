// components/Admin.js
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCards from '../components/dashboardwidgets';
import Image from 'next/image';

const Admin = () => {
  return (
    <div className="flex flex-col space-y-4 m-4">
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-layout-dashboard mr-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
              <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
              <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
              <path d="M15 4h4a1 ```javascript
              1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
            </svg>
            Dashboard
          </CardTitle>
        </CardHeader>
        <DashboardCards />
      </Card>

      {/* New Containers Below */}
      <div className="flex space-x-4">
        {/* Left Container: Driver & Truck List */}
        <div className="flex-2 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Trucks on Route</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-left">Driver</th>
                <th className="border-b border-gray-300 px-4 py-2 text-left">Truck</th>
                <th className="border-b border-gray-300 px-4 py-2 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">John Doe</td>
                <td className="border-b border-gray-300 px-4 py-2">Mahindra Blazo</td>
                <td className="border-b border-gray-300 px-4 py-2">Andheri</td>
              </tr>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">Jane Doe</td>
                <td className="border-b border-gray-300 px-4 py-2">Tata Prima</td>
                <td className="border-b border-gray-300 px-4 py-2">Bandra</td>
              </tr>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">Bob Smith</td>
                <td className="border-b border-gray-300 px-4 py-2">Ashok Leyland</td>
                <td className="border-b border-gray-300 px-4 py-2">Vashi</td>
              </tr>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">Alice Brown</td>
                <td className="border-b border-gray-300 px-4 py-2">BharatBenz</td>
                <td className="border-b border-gray-300 px-4 py-2">Dadar</td>
              </tr>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">Mike Davis</td>
                <td className="border-b border-gray-300 px-4 py-2">Eicher</td>
                <td className="border-b border-gray-300 px-4 py-2">Kurla</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Container: Map Image */}
        <div className="flex-1 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Map</h2>
          <img src="/map.png" height={1000} width={1000} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
