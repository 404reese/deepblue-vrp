"use client";

import { useState, useEffect } from 'react';
import AddDriver from './AddDriver';
import DriverList from './DriverList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Driver {
  id: number;
  name: string;
  phone: string;
  vehicleId?: number;
}

const DriverPanel = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:8080/drivers');
        if (!response.ok) {
          throw new Error('Failed to fetch drivers');
        }
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        toast.error('Failed to fetch drivers');
      }
    };

    fetchDrivers();
  }, []);

  const handleDeleteDriver = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/drivers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete driver');
      }

      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
      toast.success('Driver deleted successfully!');
    } catch (error) {
      console.error('Error deleting driver:', error);
      toast.error('Failed to delete driver');
    }
  };

  return (
    <div>
      <AddDriver drivers={drivers} setDrivers={setDrivers} />
      <DriverList drivers={drivers} handleDeleteDriver={handleDeleteDriver} />
    </div>
  );
};

export default DriverPanel;