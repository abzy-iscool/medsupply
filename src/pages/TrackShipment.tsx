import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';

export function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Shipment</h1>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleTrack} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              Track
            </button>
          </div>
        </form>

        {isTracking && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">
                Tracking Number: {trackingNumber}
              </h2>
              <span className="text-green-600 font-medium">In Transit</span>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-600"></div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <Package className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Order Processed</h3>
                    <p className="text-sm text-gray-600">
                      March 15, 2024 - 9:00 AM
                    </p>
                    <p className="text-sm text-gray-600">
                      Your order has been processed and is ready for shipping
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <Truck className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">In Transit</h3>
                    <p className="text-sm text-gray-600">
                      March 16, 2024 - 10:30 AM
                    </p>
                    <p className="text-sm text-gray-600">
                      Package is in transit to the delivery address
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-400">Delivered</h3>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}