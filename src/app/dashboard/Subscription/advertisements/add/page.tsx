import React from "react";

export default function AddNewAdPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">Add New Ad</h1>
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">


    
        <form className="space-y-6">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                placeholder="Tech Company"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                placeholder="Black Friday Sale"
              />
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400">
                <option>Slideshow Ad</option>
                <option>Banner Ad</option>
                <option>Video Ad</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Location
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400">
                <option>Homepage Header</option>
                <option>Sidebar</option>
                <option>Footer</option>
              </select>
            </div>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ad Duration
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
                placeholder="31 July 2024 - 31 August 2024"
              />
            </div>
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Attach pictures/videos of the Ads
            </label>
            <div className="flex items-center space-x-4">
          
              <div className="flex space-x-2">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Ad Media"
                  className="w-20 h-20 rounded-lg border border-gray-200"
                />
                <img
                  src="https://via.placeholder.com/80"
                  alt="Ad Media"
                  className="w-20 h-20 rounded-lg border border-gray-200"
                />
                <img
                  src="https://via.placeholder.com/80"
                  alt="Ad Media"
                  className="w-20 h-20 rounded-lg border border-gray-200"
                />
              </div>
             
            </div>
          </div>

          
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-yellow-400 text-white font-bold rounded-lg shadow hover:bg-yellow-500"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
