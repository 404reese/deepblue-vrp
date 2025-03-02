// src/components/VehiclesTable.tsx
import React from 'react';

interface Vehicle {
  name: string;
  load: string;
  drivingTime: string;
}

interface VehiclesTableProps {
  vehicles: Vehicle[];
}

const VehiclesTable: React.FC<VehiclesTableProps> = ({ vehicles }) => {
  return (
    <div>
      <h2>Vehicles</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Load</th>
            <th>Driving Time</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.name}</td>
              <td>{vehicle.load}</td>
              <td>{vehicle.drivingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default VehiclesTable;
