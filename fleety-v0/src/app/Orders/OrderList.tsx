"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';

interface Order {
  id: number;
  senderName: string;
  receiverName: string;
  receiverAddress: string;
  phoneNumber: string;
  serviceorigin_id: number; // Assuming serviceorigin_id is a number
  visit: {
    location: {
      latitude: number;
      longitude: number;
    };
    demand: number;
    minStartTime: string;
    maxEndTime: string;
    serviceDuration: string;
  };
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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
                <th className="border-b border-gray-300 px-4 py-2 text-center">Sender Name</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Receiver Name</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Receiver Address</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Phone Number</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Warehouse ID</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Start Time</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">End Time</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Service Duration</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.senderName}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.receiverName}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.receiverAddress}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.phoneNumber}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.serviceorigin_id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.visit.minStartTime}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.visit.maxEndTime}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{order.visit.serviceDuration}</td>
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