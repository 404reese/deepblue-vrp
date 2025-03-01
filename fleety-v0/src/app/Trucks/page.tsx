// TruckDashboardPanel.tsx
"use client";

import { useState } from 'react';
import AddTruck from './AddTruck';
import TruckList from './TruckList';
import { initialTrucks } from './trucks';

const TruckDashboardPanel = () => {
  const [trucks, setTrucks] = useState(initialTrucks);

  return (
    <div>
      <AddTruck trucks={trucks} setTrucks={setTrucks} />
      <TruckList trucks={trucks} />
    </div>
  );
};

export default TruckDashboardPanel;