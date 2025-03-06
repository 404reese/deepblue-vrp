import { Link } from 'lucide-react';
import React from 'react';

const DriverView = () => {
  return (
    <div className="p-6 max-w-screen-md mx-auto bg-gray-100 rounded-lg shadow-lg">
      <div className="space-y-8">
        {/* Driver Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Driver Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Name:</span> Ramesh
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Warehouse:</span> Sion
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">Vehicle:</span> BharatBenz
            </p>
          </div>
        </div>

        {/* Job Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Job ID:</span>
              <span className="text-gray-600">550e8400-e29b-41d4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Start Time:</span>
              <span className="text-gray-600">08:00 AM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">End Time:</span>
              <span className="text-gray-600">05:00 PM</span>
            </div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50">
          <a href='https://www.google.com/maps/dir/?api=1&origin=19.173808,72.8605943&destination=19.173808,72.8605943&waypoints=19.004138,72.8270133%7C19.00383204,72.85051576%7C18.98716333,72.82989199%7C19.1714,72.940339%7C19.157602,72.945243%7C19.16989,72.863761%7C19.16885607,72.87786054%7C19.1590077,72.8692711&travelmode=driving' target='_blank'>
            Start Job
          </a>
        </button>
      </div>
    </div>
  );
};

export default DriverView;