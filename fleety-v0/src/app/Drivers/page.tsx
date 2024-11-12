"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Driver {
  id: number;
  user: string;
  phone: string;
  age: number;
  status: string;
}

const DashboardPanel = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, user: 'John Doe', phone: '123-456-7890', age: 30, status: 'Active' },
    { id: 2, user: 'Jane Doe', phone: '987-654-3210', age: 25, status: 'Inactive' },
  ]);

  const [newDriver, setNewDriver] = useState<Driver>({
    id: 0,
    user: '',
    phone: '',
    age: 0,
    status: '',
  });

  const handleAddDriver = () => {
    if (newDriver.user && newDriver.phone && newDriver.age > 0 && newDriver.status) {
      setDrivers([...drivers, { id: drivers.length + 1, ...newDriver }]);
      setNewDriver({ id: 0, user: '', phone: '', age: 0, status: '' });
    }
  };

  const handleUpdateDriver = (id: number, updatedDriver: Driver) => {
    setDrivers(drivers.map((driver) => (driver.id === id ? updatedDriver : driver)));
  };

  const handleDeleteDriver = (id: number) => {
    setDrivers(drivers.filter((driver) => driver.id !== id));
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Drivers</CardTitle>
          <CardDescription>Manage drivers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex space-x-2">
            <Input
              type="text"
              value={newDriver.user}
              onChange={(e) => setNewDriver({ ...newDriver, user: e.target.value })}
              placeholder="User "
              className="flex-1"
            />
            <Input
              type="text"
              value={newDriver.phone}
              onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
              placeholder="Phone"
              className="flex-1"
            />
            <Input
              type="number"
              value={newDriver.age}
              onChange={(e) => setNewDriver({ ...newDriver, age: parseInt(e.target.value, 10) })}
              placeholder="Age"
              className="flex-1"
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active" onClick={() => setNewDriver({ ...newDriver, status: 'Active' })}>
                  Active
                </SelectItem>
                <SelectItem value="Inactive" onClick={() => setNewDriver({ ...newDriver, status: 'Inactive' })}>
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddDriver}>Add Driver</Button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-center">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-center">User </th>
                <th className="border border-gray-300 px-4 py-2 text-center">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Age</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                <th className="border border-gray-300 px -4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{driver.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{driver.user}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{driver.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{driver.age}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{driver.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Button
                      variant="btn1"
                      onClick={() => handleUpdateDriver(driver.id, { ...driver, status: driver.status === 'Active' ? 'Inactive' : 'Active' })}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPanel;