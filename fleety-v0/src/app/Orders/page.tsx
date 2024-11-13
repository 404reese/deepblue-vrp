"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const ProductDashboardPanel = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      pickupLocation: 'Andheri',
      dropLocation: 'Bandra',
      dimensions: '10x10x10',
      weight: 5,
      itemType: 'Electronics',
      itemName: 'Laptop',
    },
    {
      id: 2,
      pickupLocation: 'Juhu',
      dropLocation: 'Dadar',
      dimensions: '15x5x5',
      weight: 3,
      itemType: 'Books',
      itemName: 'Novel',
    },
  ]);

  return (
    <div className='m-4'>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-3xl text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{product.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{product.pickupLocation}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{product.dropLocation}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{product.dimensions}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{product.weight}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{product.itemType}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{product.itemName}</td>
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

export default ProductDashboardPanel;