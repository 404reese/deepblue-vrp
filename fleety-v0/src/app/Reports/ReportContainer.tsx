// components/ReportContainer.tsx

import { CSSProperties } from 'react';

interface ReportContainerProps {
  title: string;
  pdfPath: string;
}

const ReportContainer: React.FC<ReportContainerProps> = ({ title, pdfPath }) => {
  const containerStyle: CSSProperties = {
    padding: '20px',
    margin: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: '1px solid #ddd',
  };

  const containerHoverStyle: CSSProperties = {
    backgroundColor: '#e0e0e0',
  };

  const openPdf = (path: string) => {
    window.open(path, '_blank');
  };

  return (
    <div
      style={containerStyle}
      onClick={() => openPdf(pdfPath)}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = containerHoverStyle.backgroundColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = containerStyle.backgroundColor)}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default ReportContainer;