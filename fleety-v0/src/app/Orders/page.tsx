// ProductDashboardPanel.tsx
"use client";

import { useState } from 'react';
import AddOrder from './AddOrder';
import OrderList from './OrderList';
import { initialOrders } from './orders';

const ProductDashboardPanel = () => {
  const [orders, setOrders] = useState(initialOrders);

  return (
    <div>
      <AddOrder orders={orders} setOrders={setOrders} />
      <OrderList orders={orders} />
    </div>
  );
};

export default ProductDashboardPanel;