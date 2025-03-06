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
  const handleOpenMap = () => {
    // Open the map in a new tab
    const newTab = window.open("", "_blank");
    newTab.document.write(`
      <html>
        <head>
          <title>Vehicle Route Map</title>
          <script src="https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2}&libraries=marker"></script>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.solution = ${JSON.stringify(solution)};
          </script>
          <script src="/path/to/RouteMap.js"></script>
        </body>
      </html>
    `);
    newTab.document.close();
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Solution Summary</h3>

      {/* General Route Information */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Route Information</h4>
        <p><strong>Name:</strong> {solution.name}</p>
      </div>

      {/* Vehicles */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Vehicles</h4>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Total Capacity</th>
              <th className="text-center">Departure Time</th>
              <th className="text-center">Arrival Time</th>
              <th className="text-center">Utilized Capacity</th>
              <th className="text-center">Driving Time</th>
            </tr>
          </thead>
          <tbody>
            {solution.vehicles.map((vehicle, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 text-center">{vehicle.id}</td>
                <td className="py-2 text-center">{vehicle.capacity}</td>
                <td className="py-2 text-center">{vehicle.departureTime}</td>
                <td className="py-2 text-center">{vehicle.arrivalTime}</td>
                <td className="py-2 text-center">{vehicle.totalDemand}</td>
                <td className="py-2 text-center">{Math.floor(vehicle.totalDrivingTimeSeconds / 3600)}H {Math.floor((vehicle.totalDrivingTimeSeconds % 3600) / 60)}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolutionDetails;