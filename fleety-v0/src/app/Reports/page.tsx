'use client'; // This makes the component a Client Component

import Link from 'next/link';
import { FC } from 'react';

const ReportsPage: FC = () => {
  const openPDF = (pdf: string) => {
    window.open(`/${pdf}`, '_blank');  // PDF paths are relative to the 'public' folder
  };

  return (
    <div className='p-5'>
      <div className="flex items-center text-3xl text-primary text-semibold mb-4">
      All Reports
      </div>
      <div
        className="p-5 border mb-5 border-gray-300 rounded-lg bg-gray-100 cursor-pointer"
        onClick={() => openPDF('1.pdf')}
      >
        <h2 className="text-xl font-semibold">Delivery_Report_777a2f5d</h2>
        <p className="text-gray-600">Date : 2025-03-01</p>
      </div>
      <div
        className="p-5 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer"
        onClick={() => openPDF('1.pdf')}
      >
        <h2 className="text-xl font-semibold">Delivery_Report_ab762f5d</h2>
        <p className="text-gray-600">Date : 2025-02-27</p>
      </div>
      <Link href="http://localhost:8501" target='_blank'>
        <p className="text-xs text-primary underline mt-5">Dev Reports</p>
      </Link>
    </div>
  );
};

export default ReportsPage;

