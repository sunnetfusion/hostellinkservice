'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Car, Shield, Utensils, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HostelCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  facilities: string[];
  isVerified?: boolean;
  delay?: number;
}

export function HostelCard({ id, name, location, price, rating, image, facilities, isVerified = true, delay = 0 }: HostelCardProps) {
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

  return (
    <Link href={`/hostels/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {isVerified && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified</span>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {name}
          </h3>
          
          <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {facilities.map((facility, index) => {
              const IconComponent = facilityIcons[facility as keyof typeof facilityIcons];
              return (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                >
                  {IconComponent && <IconComponent className="h-3 w-3 text-gray-600 dark:text-gray-300" />}
                  <span className="text-xs text-gray-600 dark:text-gray-300">{facility}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(price)}
              <span className="text-sm font-normal text-gray-600 dark:text-gray-300">/year</span>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Details
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
