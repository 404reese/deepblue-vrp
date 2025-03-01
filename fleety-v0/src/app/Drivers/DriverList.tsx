// DriverList.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface Driver {
  id: number;
  user: string;
  phone: string;
  age: number;
  status: string;
}

interface DriverListProps {
  drivers: Driver[];
  handleUpdateDriver: (id: number, updatedDriver: Driver) => void;
  handleDeleteDriver: (id: number) => void;
}

const DriverList = ({ drivers, handleUpdateDriver, handleDeleteDriver }: DriverListProps) => {
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
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">User</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Phone</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Age</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border-b border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-secondary">
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.id}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.user}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.phone}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.age}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">{driver.status}</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-center">
                    <Button
                      variant="btn1"
                      onClick={() =>
                        handleUpdateDriver(driver.id, {
                          ...driver,
                          status: driver.status === 'Active' ? 'Inactive' : 'Active',
                        })
                      }
                    >
                      Change Status
                    </Button>
                    <Button variant="btn2" onClick={() => handleDeleteDriver(driver.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/">
            <CardDescription className="mt-4 text-center text-xs">
              To manage drivers go to dashboard
            </CardDescription>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverList;