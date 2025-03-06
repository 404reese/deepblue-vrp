"use client";

import RouteMap from '@/components/RouteMap';
import { Wrapper } from '@googlemaps/react-wrapper';

interface SolutionData {
  name: string;
  southWestCorner: number[];
  northEastCorner: number[];
  startDateTime: string;
  endDateTime: string;
  vehicles: {
    id: string;
    capacity: number;
    homeLocation: number[];
    departureTime: string;
    visits: any[];
    arrivalTime: string;
    totalDemand: number;
    totalDrivingTimeSeconds: number;
  }[];
  visits: {
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
  }[];
  score: string;
  solverStatus: string;
  scoreExplanation: string;
  totalDrivingTimeSeconds: number;
}

interface RoutePageProps {
  solution: SolutionData;
}

export default function RoutePage({ solution }: RoutePageProps) {
  return (
    <Wrapper 
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY2} 
      version="beta" 
      libraries={["marker"]}
    >
      <RouteMap solution={solution} />
    </Wrapper>
  );
}