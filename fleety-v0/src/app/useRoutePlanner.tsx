// hooks/useRoutePlanner.tsx
import { useState, useEffect } from 'react';

interface RouteData {
  name: string;
  southWestCorner: number[] | null;
  northEastCorner: number[] | null;
  startDateTime: string | null;
  endDateTime: string | null;
  vehicles: {
    id: string;
    capacity: number;
    homeLocation: number[];
    departureDateTime: string;
    visits: any[] | null;
    totalDrivingTimeSeconds: number | null;
    arrivalTime: string | null;
    totalDemand: number | null;
  }[];
  visits: {
    id: string;
    demand: number;
    minStartTime: string;
    maxEndTime: string;
    serviceDuration: number;
    vehicle: any | null;
    previousVisit: any | null;
    arrivalTime: string | null;
    startServiceTime: string | null;
    departureTime: string | null;
    drivingTimeSecondsFromPreviousStandstill: number;
    Location: number[];
  }[];
  totalDrivingTimeSeconds: number;
}

const useRoutePlanner = () => {
  const [isPlanning, setIsPlanning] = useState<boolean>(false);
  const [routeData, setRouteData] = useState<RouteData | null>(null);

  const handlePlanClick = async () => {
    if (!isPlanning) {
      try {
        const response = await fetch('http://localhost:8080/vehiclerouteplan/1');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: RouteData = await response.json();
        console.log('Original Response Data:', data);

        // Update the data with the required fields
        const updatedData: RouteData = {
          ...data,
          southWestCorner: [18.834810692801472, 72.6193892137543],
          northEastCorner: [19.3448320723129, 73.09248794015707],
          startDateTime: '2025-03-04T16:45:20.798008400Z',
          endDateTime: '2025-03-09T00:00:00.000000000Z',
        };

        console.log('Updated Route Data:', updatedData);  // Log the updated data to the console

        setRouteData(updatedData);  // Store the updated data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setRouteData(null);  // Clear the data if stopping the planning
    }
    setIsPlanning(prevState => !prevState);  // Toggle the button state
  };

  useEffect(() => {
    if (routeData) {
      console.log('Route Data from useEffect:', routeData);
      // Send the updated data to the server
      sendUpdatedData(routeData);
    }
  }, [routeData]);

  const sendUpdatedData = async (data: RouteData) => {
    try {
      const response = await fetch('http://localhost:8081/route-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const rawResponse = await response.text();
        console.error(`HTTP error! Status: ${response.status}, Response: ${rawResponse}`);
        return;
      }

      // Log the raw response text
      const rawResponse = await response.text();
      console.log('Raw Response from POST request:', rawResponse);

      // Check if the response is JSON
      if (response.headers.get('content-type')?.includes('application/json')) {
        try {
          const responseData = JSON.parse(rawResponse);
          console.log('Response from POST request:', responseData);
        } catch (parseError) {
          console.error('Error parsing response JSON:', parseError);
          console.log('Raw Response Text:', rawResponse);
        }
      } else {
        console.warn('Response is not JSON. Content-Type:', response.headers.get('content-type'));
        console.log('Raw Response Text:', rawResponse);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return { isPlanning, routeData, handlePlanClick };
};

export default useRoutePlanner;