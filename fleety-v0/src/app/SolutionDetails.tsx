import React from 'react';

interface Vehicle {
  id: string;
  capacity: number;
  homeLocation: number[];
  departureTime: string;
  visits: any[];
  arrivalTime: string;
  totalDemand: number;
  totalDrivingTimeSeconds: number;
}

interface Visit {
  id: string;
  name: string | null;
  location: number[];
  demand: number;
  minStartTime: string;
  maxEndTime: string;
  serviceDuration: number;
  vehicle: any | null;
  previousVisit: any | null;
  arrivalTime: string | null;
  departureTime: string | null;
  startServiceTime: string | null;
  drivingTimeSecondsFromPreviousStandstill: number | null;
}

interface SolutionData {
  name: string;
  southWestCorner: number[];
  northEastCorner: number[];
  startDateTime: string;
  endDateTime: string;
  vehicles: Vehicle[];
  visits: Visit[];
  score: string;
  solverStatus: string;
  scoreExplanation: string;
  totalDrivingTimeSeconds: number;
}

interface SolutionDetailsProps {
  solution: SolutionData;
}

const SolutionDetails: React.FC<SolutionDetailsProps> = ({ solution }) => {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Solution Details</h3>

      {/* General Route Information */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Route Information</h4>
        <p><strong>Name:</strong> {solution.name}</p>
        <p><strong>South West Corner:</strong> {solution.southWestCorner.join(', ')}</p>
        <p><strong>North East Corner:</strong> {solution.northEastCorner.join(', ')}</p>
        <p><strong>Start Date Time:</strong> {solution.startDateTime}</p>
        <p><strong>End Date Time:</strong> {solution.endDateTime}</p>
        <p><strong>Total Driving Time:</strong> {Math.floor(solution.totalDrivingTimeSeconds / 3600)}H {Math.floor((solution.totalDrivingTimeSeconds % 3600) / 60)}M</p>
      </div>

      {/* Vehicles */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Vehicles</h4>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Capacity</th>
              <th className="text-left">Home Location</th>
              <th className="text-left">Departure Time</th>
              <th className="text-left">Arrival Time</th>
              <th className="text-left">Total Demand</th>
              <th className="text-left">Driving Time</th>
            </tr>
          </thead>
          <tbody>
            {solution.vehicles.map((vehicle, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{vehicle.id}</td>
                <td className="py-2">{vehicle.capacity}</td>
                <td className="py-2">{vehicle.homeLocation.join(', ')}</td>
                <td className="py-2">{vehicle.departureTime}</td>
                <td className="py-2">{vehicle.arrivalTime}</td>
                <td className="py-2">{vehicle.totalDemand}</td>
                <td className="py-2">{Math.floor(vehicle.totalDrivingTimeSeconds / 3600)}H {Math.floor((vehicle.totalDrivingTimeSeconds % 3600) / 60)}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visits */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Visits</h4>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Location</th>
              <th className="text-left">Demand</th>
              <th className="text-left">Min Start Time</th>
              <th className="text-left">Max End Time</th>
              <th className="text-left">Service Duration</th>
            </tr>
          </thead>
          <tbody>
            {solution.visits.map((visit, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{visit.id}</td>
                <td className="py-2">{visit.location.join(', ')}</td>
                <td className="py-2">{visit.demand}</td>
                <td className="py-2">{visit.minStartTime}</td>
                <td className="py-2">{visit.maxEndTime}</td>
                <td className="py-2">{visit.serviceDuration} seconds</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Solver Information */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Solver Information</h4>
        <p><strong>Score:</strong> {solution.score}</p>
        <p><strong>Solver Status:</strong> {solution.solverStatus}</p>
        <p><strong>Score Explanation:</strong></p>
        <pre className="bg-white p-2 rounded">{solution.scoreExplanation}</pre>
      </div>
    </div>
  );
};

export default SolutionDetails;