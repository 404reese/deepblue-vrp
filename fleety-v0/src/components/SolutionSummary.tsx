// src/components/SolutionSummary.tsx
import React from 'react';

interface SolutionSummary {
  totalDrivingTime: string;
}

interface SolutionSummaryProps {
  summary: SolutionSummary;
}

const SolutionSummaryComponent: React.FC<SolutionSummaryProps> = ({ summary }) => {
  return (
    <div>
      <h2>Solution Summary</h2>
      <p>Total driving time: {summary.totalDrivingTime}</p>
    </div>
  );
};

export default SolutionSummaryComponent;