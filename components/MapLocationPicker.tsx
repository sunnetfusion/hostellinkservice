'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMapEvents } from 'react-leaflet';
import { MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMapEvents } from 'react-leaflet'; // <-- Import the hook directly

// Dynamically import the map components
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });

interface MapLocationPickerProps {
  onLocationSelect: (coordinates: [number, number], address: string) => void;
  initialLocation?: [number, number];
  height?: string;
}

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (coordinates: [number, number], address: string) => void }) {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      const coordinates: [number, number] = [lat, lng];
      setSelectedLocation(coordinates);
      
      // Reverse geocoding to get address
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        onLocationSelect(coordinates, address);
      } catch (error) {
        console.error('Error getting address:', error);
        onLocationSelect(coordinates, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    },
  });

  return selectedLocation ? (
    <Marker position={selectedLocation}>
      <div className="bg-green-600 text-white p-1 rounded-full">
        <Check className="h-4 w-4" />
      </div>
    </Marker>
  ) : null;
}

export function MapLocationPicker({ 
  onLocationSelect, 
  initialLocation = [6.5244, 3.3792], // Lagos coordinates
  height = "300px"
}: MapLocationPickerProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(initialLocation);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocationSelect = (coordinates: [number, number], address: string) => {
    setSelectedLocation(coordinates);
    setSelectedAddress(address);
    onLocationSelect(coordinates, address);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation, selectedAddress);
    }
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
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Select Apartment Location
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Click on the map to mark your apartment location
        </p>
      </div>

      <div className="w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-lg" style={{ height }}>
        <MapContainer
          center={initialLocation}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapClickHandler onLocationSelect={handleLocationSelect} />
        </MapContainer>
      </div>

      {selectedAddress && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Selected Location:</span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">{selectedAddress}</p>
          <div className="mt-2">
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleConfirmLocation}
            >
              <Check className="h-4 w-4 mr-1" />
              Confirm Location
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
