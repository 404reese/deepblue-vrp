// components/Panel.js
"use client";

import React, { useState } from 'react';  // Import useState
import Image from 'next/image';
import Link from 'next/link';

const Panel = () => {
  const [isPlanning, setIsPlanning] = useState(false);  // Create a state to track the button status

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
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${isPlanning ? 'bg-red-600 text-red-600' : 'bg-green-600 text-white'}`}  // Dynamically apply classes
          onClick={() => setIsPlanning(prevState => !prevState)}  // Toggle the button state
        >
          {isPlanning ? 'Stop' : 'Plan Now'}  {/* Dynamically set the text */}
        </button>
        <div className="ml-6">Score : 100</div>
        <div className="ml-6">
          <Link href="google.com">
            <Image src="/notepad-text.svg" width={30} height={30} alt="Arrow Icon" className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Solution Summary</h2>

        <div className="flex justify-between">
          <div className="ml-4">
            Total driving time: 
          </div>
          <div className="flex items-center justify-end mr-4 font-semibold">0H 0M </div>
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
    </div>
  );
};

export default Panel;
