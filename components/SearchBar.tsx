'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, Home, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location Search */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="School, City, Area..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none">
            <option>Any Price</option>
            <option>₦50,000 - ₦100,000</option>
            <option>₦100,000 - ₦200,000</option>
            <option>₦200,000+</option>
          </select>
        </div>

        {/* Room Type */}
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none">
            <option>Room Type</option>
            <option>Single Room</option>
            <option>Double Room</option>
            <option>Shared Room</option>
            <option>Self-Contain</option>
          </select>
        </div>

        {/* Search Button */}
        <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Popular filters:</span>
        {['WiFi', 'Kitchen', 'Parking', 'Security', '24/7 Power'].map((filter) => (
          <button
            key={filter}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}