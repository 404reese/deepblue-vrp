// components/DashboardCards.js
import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const DashboardCards = () => {
  return (
    <CardContent className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      <Card className="p-4 bg-primary-foreground rounded-md">
        <CardTitle className="text-lg font-semibold text-primary flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-plus mr-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            <path d="M15 12h-6" />
            <path d="M12 9v6" />
          </svg>
          New Orders
        </CardTitle>
        <CardDescription className="text-4xl font-bold">34</CardDescription>
      </Card>

      <Card className="p-4 bg-primary-foreground rounded-md">
        <CardTitle className="text-lg font-semibold text-primary flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check mr-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
            <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
            <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
            <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
            <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
            <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
            <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
            <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
            <path d="M9 12l2 2l4 -4" />
          </svg>
          Order Delivered
        </CardTitle>
        <CardDescription className="text-4xl font-bold">234</CardDescription>
      </Card>

      <Card className="p-4 bg-primary-foreground rounded-md">
        <CardTitle className="text-lg font-semibold text-primary flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
 strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-truck-delivery mr-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
            <path d="M3 9l4 0" />
          </svg>
          Order Shipping
        </CardTitle>
        <CardDescription className="text-4xl font-bold">24</CardDescription>
      </Card>

      <Card className="p-4 bg-primary-foreground rounded-md">
        <CardTitle className="text-lg font-semibold text-primary flex items-center mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-currency-rupee mr-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6" />
            <path d="M7 9l11 0" />
          </svg>
          Earnings
        </CardTitle>
        <CardDescription className="text-4xl font-bold">12,234</CardDescription>
      </Card>
    </CardContent>
  );
};

export default DashboardCards;