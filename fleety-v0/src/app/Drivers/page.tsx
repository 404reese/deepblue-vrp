// DriverPanel.tsx
"use client";

import { useState } from 'react';
import AddDriver from './AddDriver';
import DriverList from './DriverList';

interface Driver {
  id: number;
  user: string;
  phone: string;
  age: number;
  status: string;
}

const DriverPanel = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, user: 'John Doe', phone: '123-456-7890', age: 30, status: 'Active' },
    { id: 2, user: 'Jane Doe', phone: '987-654-3210', age: 25, status: 'Inactive' },
  ]);

  const handleUpdateDriver = (id: number, updatedDriver: Driver) => {
    setDrivers(drivers.map((driver) => (driver.id === id ? updatedDriver : driver)));
  };

  const handleDeleteDriver = (id: number) => {
    setDrivers(drivers.filter((driver) => driver.id !== id));
  };

  return (
    <div>
      <AddDriver drivers={drivers} setDrivers={setDrivers} />
      <DriverList
        drivers={drivers}
        handleUpdateDriver={handleUpdateDriver}
        handleDeleteDriver={handleDeleteDriver}
      />
    </div>
  );
};

export default DriverPanel;