'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookingModal } from '@/components/BookingModal';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Wifi, Car, Shield, Utensils, MapPin } from 'lucide-react';

interface Hostel {
  id: string;
  name: string;
  price: number;
  description: string;
  photos: string[];
  facilities: string[];
  embed360: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

const facilityIcons = {
  WiFi: Wifi,
  Parking: Car,
  Security: Shield,
  Kitchen: Utensils,
};

const HostelDetailsSkeleton = () => (
  <div className="container mx-auto p-4">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded-md w-2/3 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded-md w-full mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="h-64 bg-gray-300 rounded-lg"></div>
        <div className="h-64 bg-gray-300 rounded-lg"></div>
        <div className="h-64 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="mb-8">
        <div className="h-8 bg-gray-300 rounded-md w-1/3 mb-4"></div>
        <div className="h-48 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="flex space-x-4">
        <div className="h-12 bg-gray-300 rounded-md w-32"></div>
        <div className="h-12 bg-gray-300 rounded-md w-32"></div>
      </div>
    </div>
  </div>
);

const HostelDetailsPage = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'booking' | 'inspection'>('booking');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/hostels/${id}`);
        if (response.ok) {
          const data = await response.json();
          setHostel(data);
        } else {
          setError('Hostel not found.');
        }
      } catch (error) {
        console.error('Error fetching hostel:', error);
        setError('Failed to fetch hostel data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHostel();
    }
  }, [id]);

  const openModal = (type: 'booking' | 'inspection') => {
    setBookingType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setSuccessMessage(
      `Your ${bookingType === 'booking' ? 'booking' : 'inspection'} request has been submitted successfully! We will contact you shortly.`
    );
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  if (loading) {
    return <HostelDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  if (!hostel) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50"
          >
            <CheckCircle className="h-6 w-6" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{hostel.name}</h1>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 mb-4">
            <MapPin className="h-5 w-5" />
            <span>{hostel.location.address}</span>
          </div>
          <p className="text-lg mb-6">{hostel.description}</p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hostel.photos.map((photo, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <img src={photo} alt={`${hostel.name} photo ${index + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">360° Tour</h2>
            <div className="aspect-w-16 aspect-h-9">
              <div dangerouslySetInnerHTML={{ __html: hostel.embed360 }} />
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {hostel.facilities.map((facility, index) => {
                const Icon = facilityIcons[facility as keyof typeof facilityIcons];
                return (
                  <div key={index} className="flex items-center space-x-2">
                    {Icon && <Icon className="h-6 w-6 text-blue-600" />}
                    <span className="text-lg">{facility}</span>
                  </div>
                );
              })}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Location</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://maps.google.com/maps?q=${hostel.location.latitude},${hostel.location.longitude}&hl=es&z=14&amp;output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(hostel.price)}
              <span className="text-lg font-normal text-gray-600 dark:text-gray-300">/year</span>
            </div>
            
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => openModal('booking')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Book Now
              </button>
              <button
                onClick={() => openModal('inspection')}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Book Inspection
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          hostel={hostel}
          bookingType={bookingType}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default HostelDetailsPage;
