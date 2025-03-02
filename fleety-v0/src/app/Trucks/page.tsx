"use client";

import { useState, useEffect } from 'react';
import AddTruck from "./AddTruck";
import TruckList from "./TruckList";

interface Truck {
  id: number;
  name: string;
  capacity: number;
  warehouseId: number;
  departureTime: string;
}

const TrucksPage = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await fetch('http://localhost:8080/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch trucks');
        }
        const data = await response.json();
        setTrucks(data);
      } catch (error) {
        console.error('Error fetching trucks:', error);
      }
    };

    fetchTrucks();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <AddTruck setTrucks={setTrucks} />
      <TruckList trucks={trucks} />
    </div>
  );
};

export default TrucksPage;