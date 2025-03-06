// components/Admin.js
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCards from '../components/dashboardwidgets';
import Panel from './Panel';
import Map from './MapComponent';
import SolveOrderView from './SolveOrderView';

const Admin = () => {
  // Add state to hold the solution data
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
              <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
            </svg>
            Dashboard
          </CardTitle>
        </CardHeader>
        <DashboardCards />
      </Card>

      {/* New Containers Below */}
      <div className="flex space-x-4">
        {/* Left Container: Map */}
        <div className="w-[60%] bg-white p-4 rounded-md shadow-md h-[100vh]">
          <h2 className="text-2xl font-semibold mb-4">Map</h2>
          <Map />
        </div>

        {/* Right Container: Driver & Truck List */}
        <div className="w-[40%] bg-white p-4 rounded-md shadow-md">
          <Panel onSolutionUpdate={setSolution} />
        </div>
      </div>
      <div className="h-auto min-h-[200px] bg-white rounded-md shadow-md overflow-hidden mt-4">
        {isLoading && <div>Loading...</div>}
        {solution && <SolveOrderView solution={solution} />}
      </div>
    </div>
  );
};

export default Admin;