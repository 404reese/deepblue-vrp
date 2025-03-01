// AddDriver.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Driver {
  id: number;
  user: string;
  phone: string;
  age: number;
  status: string;
}

interface AddDriverProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
}

const AddDriver = ({ drivers, setDrivers }: AddDriverProps) => {
  const [newDriver, setNewDriver] = useState({
    user: '',
    phone: '',
    age: 0,
    status: 'Inactive', // Default status is "Inactive"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'age') {
      setNewDriver((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setNewDriver((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = drivers.length > 0 ? Math.max(...drivers.map((driver) => driver.id)) + 1 : 1;

    const updatedDrivers = [
      ...drivers,
      { id: newId, ...newDriver },
    ];

    setDrivers(updatedDrivers);
    setNewDriver({ user: '', phone: '', age: 0, status: 'Inactive' }); // Reset form
  };

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
            Add Driver
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-row space-x-4">
              {/* User Name */}
              <div className="flex-1">
                <Label htmlFor="user">User Name</Label>
                <Input
                  type="text"
                  id="user"
                  name="user"
                  value={newDriver.user}
                  onChange={handleInputChange}
                  placeholder="Enter user name"
                  required
                />
              </div>

              {/* Age */}
              <div className="flex-1">
                <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  id="age"
                  name="age"
                  value={newDriver.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex-1">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newDriver.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Add Driver
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDriver;