'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Star, Wifi, Car, Shield, Utensils } from 'lucide-react';

// Dynamically import the map to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

interface Hostel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  facilities: string[];
  coordinates: [number, number]; // [lat, lng]
}

interface MapComponentProps {
  hostels: Hostel[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showSearchResults?: boolean;
  onHostelSelect?: (hostel: Hostel) => void;
}

export function MapComponent({ 
  hostels, 
  center = [6.5244, 3.3792], // Lagos coordinates
  zoom = 13,
  height = "400px",
  showSearchResults = false,
  onHostelSelect
}: MapComponentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const facilityIcons = {
    'WiFi': Wifi,
    'Parking': Car,
    'Security': Shield,
    'Kitchen': Utensils,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  if (!isClient) {
    return (
      <div 
        className="bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {hostels.map((hostel) => (
          <Marker key={hostel.id} position={hostel.coordinates}>
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center space-x-2 mb-2">
                  <img 
                    src={hostel.image} 
                    alt={hostel.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{hostel.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{hostel.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">{hostel.location}</p>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {hostel.facilities.slice(0, 3).map((facility, index) => {
                    const IconComponent = facilityIcons[facility as keyof typeof facilityIcons];
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full"
                      >
                        {IconComponent && <IconComponent className="h-2 w-2 text-gray-600" />}
                        <span className="text-xs text-gray-600">{facility}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between">
                  {hostel.price > 0 &&
                    <span className="text-lg font-bold text-blue-600">{formatPrice(hostel.price)}</span>
                  }
                  {onHostelSelect && (
                    <button
                      onClick={() => onHostelSelect(hostel)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
