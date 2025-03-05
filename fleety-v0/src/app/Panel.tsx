"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useRoutePlanner from './useRoutePlanner'; // Import the custom hook
import SolutionDetails from './SolutionDetails'; // Import the new component

const Panel = () => {
  const { isPlanning, routeData, isLoading, handlePlanClick } = useRoutePlanner(); // Use the custom hook
  const [countdown, setCountdown] = useState<number | null>(null); // Countdown state

  // Start the countdown when isLoading is true
  useEffect(() => {
    if (isLoading) {
      setCountdown(35); // Initialize countdown to 35 seconds
      const interval = setInterval(() => {
        setCountdown((prev) => (prev && prev > 0 ? prev - 1 : null)); // Decrement countdown
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup interval on unmount
    } else {
      setCountdown(null); // Reset countdown when not loading
    }
  }, [isLoading]);

  const vehicles = [
    { name: 'Vehicle 1', load: '🌟', drivingTime: '0h 0m' },
    { name: 'Vehicle 2', load: '🌟', drivingTime: '0h 0m' },
    { name: 'Vehicle 3', load: '🌟', drivingTime: '0h 0m' },
    { name: 'Vehicle 4', load: '🌟', drivingTime: '0h 0m' },
    { name: 'Vehicle 5', load: '🌟', drivingTime: '0h 0m' },
    { name: 'Vehicle 6', load: '🌟', drivingTime: '0h 0m' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Stats Panel</h2>
      <div className="flex items-center space-x-6 mb-4">
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            isLoading ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
          }`}
          onClick={handlePlanClick} // Use the handler function from the custom hook
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? `Processing... (${countdown}s)` : 'Plan Now'} {/* Dynamically set the text */}
        </button>
        <div className="ml-6">Score : 100</div>
        <div className="ml-6">
          <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <Image src="/notepad-text.svg" width={30} height={30} alt="Arrow Icon" className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Solution Summary</h2>
        <div className="flex justify-between">
          <div className="ml-4">Total driving time:</div>
          <div className="flex items-center justify-end mr-4 font-semibold">
            {routeData ? `${Math.floor(routeData.totalDrivingTimeSeconds / 3600)}H ${Math.floor((routeData.totalDrivingTimeSeconds % 3600) / 60)}M` : '0H 0M'}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Vehicles</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Load</th>
            <th className="text-left">Driving Time</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{vehicle.name}</td>
              <td className="py-2">{vehicle.load}</td>
              <td className="py-2">{vehicle.drivingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render SolutionDetails if routeData is available */}
      {routeData && <SolutionDetails solution={routeData} />}
    </div>
  );
};

export default Panel;