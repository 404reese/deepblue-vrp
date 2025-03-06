"use client";

import React, { useState, useEffect } from 'react';
import useRoutePlanner from './useRoutePlanner'; // Import the custom hook
import SolutionDetails from './SolutionDetails'; // Import the new component

const Panel = ({ onSolutionUpdate }) => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/warehouses')
      .then(res => res.json())
      .then(data => setWarehouses(data))
      .catch(err => console.error('Failed to fetch warehouses:', err));
  }, []);

  return (
    <div className="space-y-4">
      {warehouses.map(warehouse => (
        <WarehouseCard
          key={warehouse.id}
          warehouse={warehouse}
          onSolutionUpdate={onSolutionUpdate}
        />
      ))}
    </div>
  );
};

const WarehouseCard = ({ warehouse, onSolutionUpdate }) => {
  const { 
    isPlanning, 
    handlePlanClick,
    routeData,
    jobId
  } = useRoutePlanner(warehouse.id);

  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let intervalId;

    if (isPlanning) {
      setCountdown(35);
      intervalId = setInterval(() => {
        setCountdown((prev) => (prev && prev > 0 ? prev - 1 : null));
      }, 1000);
    } else {
      // Reset countdown when planning stops
      clearInterval(intervalId); // Clear any existing interval
      setCountdown(null);
    }

    // Cleanup interval on unmount or state change
    return () => clearInterval(intervalId);
  }, [isPlanning]);

  useEffect(() => {
    if (!isPlanning && routeData) {
      onSolutionUpdate?.(routeData);
    }
  }, [isPlanning, routeData, onSolutionUpdate]);

  const openRouteMap = () => {
    if (jobId) {
      window.open(`/route-map?jobId=${jobId}`, '_blank');
    } else {
      alert('No route plan available');
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="text-lg font-medium mb-2">{warehouse.name}</h3>
      <div className="flex items-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            isPlanning 
              ? 'bg-blue-600 text-white' 
              : 'bg-green-600 text-white'
          }`}
          onClick={handlePlanClick}
          disabled={isPlanning}
        >
          {isPlanning 
            ? `Processing... (${countdown || 0}s)` 
            : 'Plan Now'
          }
        </button>
        <div className="ml-6">Score: {routeData?.score || 'N/A'}</div>
        {jobId && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

      {routeData && (
        <SolutionDetails solution={routeData} />
      )}
    </div>
  );
};

export default Panel;