// components/Panel.js
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useRoutePlanner from './useRoutePlanner'; // Import the custom hook
import SolutionDetails from './SolutionDetails'; // Import the new component

const Panel = ({ onSolutionUpdate }) => {
  const { 
    isPlanning, 
    routeData, 
    isLoading, 
    handlePlanClick,
    jobId
  } = useRoutePlanner(); // Use the custom hook
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
      // Update parent state with the latest routeData
      onSolutionUpdate(routeData);
    }
  }, [isLoading, routeData, onSolutionUpdate]);

  // Function to open route map in a new tab
  const openRouteMap = () => {
    if (jobId) {
      window.open(`/route-map?jobId=${jobId}`, '_blank');
    } else {
      alert('No route plan available. Please generate a route plan first.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Stats Panel</h2>
      <div className="flex items-center space-x-6 mb-4">
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            isLoading ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
          }`}
          onClick={handlePlanClick}
          disabled={isLoading}
        >
          {isLoading ? `Processing... (${countdown}s)` : 'Plan Now'}
        </button>
        <div className="ml-6">Score : {routeData?.score || 'N/A'}</div>
        <div className="ml-6">
          <Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <Image 
              src="/notepad-text.svg" 
              width={30} 
              height={30} 
              alt="Arrow Icon" 
              className="w-6 h-6"
            />
          </Link>
        </div>
        
        {/* Route Map Button */}
        {routeData && jobId && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            onClick={openRouteMap}
          >
            Open Route Map
          </button>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Solution Summary</h2>
        <div className="flex justify-between">
          <div className="ml-4">Total driving time:</div>
          <div className="flex items-center justify-end mr-4 font-semibold">
            {routeData 
              ? `${Math.floor(routeData.totalDrivingTimeSeconds / 3600)}H ${Math.floor((routeData.totalDrivingTimeSeconds % 3600) / 60)}M` 
              : '0H 0M'
            }
          </div>
        </div>
      </div>

      {/* Display SolutionDetails when routeData is available */}
      {routeData && (
        <SolutionDetails solution={routeData} />
      )}
    </div>
  );
};

export default Panel;