'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HostelCard } from '@/components/HostelCard';

interface Hostel {
  id: string;
  name: string;
  price: number;
  description: string;
  photos: string[];
  facilities: string[];
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [hostels, setHostels] = useState<Hostel[]>([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await fetch('/api/hostels');
        if (response.ok) {
          const data = await response.json();
          // Filter hostels based on the search query
          const filteredHostels = data.filter((hostel: Hostel) =>
            hostel.name.toLowerCase().includes(query?.toLowerCase() || '')
          );
          setHostels(filteredHostels);
        }
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    if (query) {
      fetchHostels();
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hostels.map((hostel) => (
          <HostelCard
            key={hostel.id}
            id={hostel.id}
            name={hostel.name}
            location={hostel.description} // Using description as location for now
            price={hostel.price}
            rating={4.5} // Placeholder rating
            image={hostel.photos[0]} // Using the first photo as the main image
            facilities={hostel.facilities}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
