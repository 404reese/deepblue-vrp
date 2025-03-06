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
  const [jobId, setJobId] = useState<string | null>(null);
  const [hasSentData, setHasSentData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePlanClick = async () => {
    if (!isPlanning) {
      try {
        const response = await fetch('http://localhost:8080/vehiclerouteplan/2');
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

        console.log('Updated Route Data:', updatedData);
        setRouteData(updatedData); // Store the updated data in state
        setHasSentData(false); // Reset the flag when new data is set
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setRouteData(null); // Clear the data if stopping the planning
      setJobId(null); // Clear the jobId if stopping the planning
    }
    setIsPlanning(prevState => !prevState); // Toggle the button state
  };

  useEffect(() => {
    if (routeData && !hasSentData) {
      console.log('Route Data from useEffect:', routeData);
      sendUpdatedData(routeData);
      setHasSentData(true); // Mark data as sent
    }
  }, [routeData, hasSentData]);

  const sendUpdatedData = async (data: RouteData) => {
    try {
      setIsLoading(true); // Set loading state to true
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
        setIsLoading(false); // Reset loading state on error
        return;
      }

      const rawResponse = await response.text();
      console.log('Raw Response from POST request:', rawResponse);

      const jobId = rawResponse.trim();
      setJobId(jobId);

      // Add a 30-second delay before fetching the route plan
      setTimeout(() => {
        fetchRoutePlan(jobId);
        setIsLoading(false); // Reset loading state after fetching
      }, 30000); // 30 seconds in milliseconds
    } catch (error) {
      console.error('Error sending data:', error);
      setIsLoading(false); // Reset loading state on error
    }
  };

  const fetchRoutePlan = async (jobId: string) => {
    try {
      const response = await fetch(`http://localhost:8081/route-plans/${jobId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: RouteData = await response.json();
      console.log('Fetched Route Plan:', data);

      setRouteData(data); // Update the routeData with the fetched data
    } catch (error) {
      console.error('Error fetching route plan:', error);
    }
  };

  return { isPlanning, routeData, isLoading, jobId, handlePlanClick }; // Return jobId for use in other components
};

export default useRoutePlanner;