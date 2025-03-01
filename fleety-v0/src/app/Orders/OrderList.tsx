// OrderList.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';

interface Order {
  id: number;
  pickupLocation: string;
  dropLocation: string;
  dimensions: string;
  weight: number;
  itemType: string;
  itemName: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className="flex flex-col space-y-4 m-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-3xl text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-box mr-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
              <path d="M12 12l8 -4.5" />
              <path d="M12 12l0 9" />
              <path d="M12 12l-8 -4.5" />
            </svg>
            Order List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Pickup Location</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Drop Location</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Dimensions</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Weight (kg)</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Item Type</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Item Name</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.pickupLocation}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.dropLocation}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.dimensions}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.weight}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.itemType}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.itemName}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/">
            <CardDescription className="mt-4 text-center text-xs">
              To manage orders go to dashboard
            </CardDescription>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderList;