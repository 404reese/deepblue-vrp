"use client";

import { useState, useEffect } from 'react'; // Import useState and useEffect
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Driver {
  id: number;
  name: string;
  phone: string;
  vehicleId?: number;
}

interface Vehicle {
  id: number;
  name: string;
  capacity: number;
  warehouseId: number;
  departureTime: string;
}

interface DriverListProps {
  drivers: Driver[];
  handleDeleteDriver: (id: number) => void;
}

const DriverList = ({ drivers, handleDeleteDriver }: DriverListProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Define state for vehicles

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8080/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast.error('Failed to fetch vehicles');
      }
    };

    fetchVehicles();
  }, []);

  // Function to get vehicle name by ID
  const getVehicleName = (vehicleId?: number) => {
    if (!vehicleId) return 'N/A';
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? vehicle.name : 'N/A';
  };

  return (
    <div className="flex flex-col space-y-4 m-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-3xl text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users mr-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
            Driver List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Name</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Phone</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Assigned Vehicle</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.name}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.phone}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">
                    {getVehicleName(driver.vehicleId)}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">
                    <Button onClick={() => handleDeleteDriver(driver.id)} variant="destructive">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default DriverList;