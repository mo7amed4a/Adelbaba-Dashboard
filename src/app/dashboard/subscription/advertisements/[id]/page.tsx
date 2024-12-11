import React from "react";

export default function ViewAdPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">View Ad</h1>
      
      <div className="mx-auto bg-white rounded-lg shadow-lg p-10 relative">

        <div className="absolute top-4 right-4 mb-16">
          <button className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:bg-yellow-500">
            Reactivate Ad
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-gray-700 mb-6 pb-6">
              <span className="font-semibold">Ad from:</span> Tech Company
            </p>
            <p className="text-gray-700 mb-6 pb-6">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-red-500">Finished</span>
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-semibold pb-6">Ad Duration:</span> 31 July
              2024 - 31 August 2024
            </p>
          </div>

          <div>
            <p className="text-gray-700 mb-6 pb-6">
              <span className="font-semibold pb-6">Ad Name:</span> Black Friday
              Sale
            </p>
            <p className="text-gray-700 mb-6 pb-6">
              <span className="font-semibold">Ad Type:</span> Slideshow Ad
            </p>
            <p className="text-gray-700 mb-6 pb-6">
              <span className="font-semibold pb-6">Ad Location:</span> Homepage
              Header
            </p>
          </div>
        </div>

      
        <div className="mb-8">
          <p className="text-gray-700 font-semibold mb-4">
            Ad Pictures/Videos:
          </p>
          {/* <div className="flex space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Ad 1"
              className="w-20 h-20 rounded-lg border border-gray-200"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Ad 2"
              className="w-20 h-20 rounded-lg border border-gray-200"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Ad 3"
              className="w-20 h-20 rounded-lg border border-gray-200"
            />
            <img
              src="https://via.placeholder.com/100"
              alt="Ad 4"
              className="w-20 h-20 rounded-lg border border-gray-200"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
