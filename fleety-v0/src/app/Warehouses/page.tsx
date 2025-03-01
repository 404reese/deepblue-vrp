// WarehouseDashboardPanel.tsx
"use client";

import { useState } from 'react';
import AddWarehouse from './AddWarehouse';
import WarehouseList from './WarehouseList';
import { initialWarehouses } from './warehouses';

const WarehouseDashboardPanel = () => {
  const [warehouses, setWarehouses] = useState(initialWarehouses);

  return (
    <div>
      <AddWarehouse warehouses={warehouses} setWarehouses={setWarehouses} />
      <WarehouseList warehouses={warehouses} />
    </div>
  );
};

export default WarehouseDashboardPanel;