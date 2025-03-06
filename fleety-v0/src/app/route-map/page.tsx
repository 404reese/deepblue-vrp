"use client";

import React, { useEffect, useState } from "react";
import RouteMap from "../RouteMapComponent";
import { useSearchParams } from "next/navigation";

export default function RouteMapPage() {
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    const fetchSolution = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/route-plans/${jobId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched solution data:", data);
        setSolution(data);
      } catch (error) {
        console.error("Error fetching solution:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolution();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p className="text-lg">Loading route map...</p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Solution Data Available</h2>
          <p>Unable to load the route map. Please make sure a valid job ID is provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="route-map-page">
      <RouteMap solution={solution} />
    </div>
  );
}
