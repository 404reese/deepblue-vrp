export interface SolutionData {
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
  
  // Include your existing Vehicle and Visit interfaces here