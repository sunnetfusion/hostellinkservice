'use client';

import { useState } from 'react';
import { Search, MapPin, DollarSign, Home, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchFilters {
  location: string;
  priceRange: string;
  roomType: string;
  facilities: string[];
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    priceRange: '',
    roomType: '',
    facilities: []
  });

  const handleSearch = () => {
    // Here you would typically trigger a search with the filters
    console.log('Searching with filters:', { searchQuery, ...filters });
    // You could emit an event or call a parent component's search function
  };

  const handleFacilityToggle = (facility: string) => {
    setFilters(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

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
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>

        {/* Price Range */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
            value={filters.priceRange}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
          >
            <option value="">Any Price</option>
            <option value="50000-100000">₦50,000 - ₦100,000</option>
            <option value="100000-200000">₦100,000 - ₦200,000</option>
            <option value="200000+">₦200,000+</option>
          </select>
        </div>

        {/* Room Type */}
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <select 
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
            value={filters.roomType}
            onChange={(e) => setFilters(prev => ({ ...prev, roomType: e.target.value }))}
          >
            <option value="">Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="shared">Shared Room</option>
            <option value="self-contained">Self-Contain</option>
          </select>
        </div>

        {/* Search Button */}
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white py-3"
          onClick={handleSearch}
        >
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
            onClick={() => handleFacilityToggle(filter)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filters.facilities.includes(filter)
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}