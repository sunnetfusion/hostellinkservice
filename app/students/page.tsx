'use client';

import { motion } from 'framer-motion';
import { Search, Shield, Calendar, BarChart3, Users, Star, MapPin } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { HostelCard } from '@/components/HostelCard';
import { MapComponent } from '@/components/MapComponent';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Students() {
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  const [showMap, setShowMap] = useState(false);

  const features = [
    {
      icon: Search,
      title: "Smart Search & Filters",
      description: "Find your perfect accommodation with advanced search filters by location, price, facilities, and proximity to your university."
    },
    {
      icon: Shield,
      title: "Verified Listings Only",
      description: "Every hostel on our platform goes through rigorous verification including safety checks, facility inspections, and document validation."
    },
    {
      icon: Calendar,
      title: "Easy Booking Process",
      description: "Book inspections and reserve your preferred accommodation with our simple, secure booking system that takes just minutes."
    },
    {
      icon: BarChart3,
      title: "Personal Dashboard",
      description: "Track your bookings, manage inspections, save favorites, and monitor your accommodation search progress all in one place."
    }
  ];

  const sampleHostels = [
    {
      id: "1",
      name: "Crown Heights Residence",
      location: "2km from University of Lagos",
      price: "₦180,000",
      rating: 4.9,
      image: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Security", "Kitchen", "Parking"],
      coordinates: [6.5244, 3.3792] as [number, number]
    },
    {
      id: "2",
      name: "Scholar's Paradise",
      location: "Walking distance to OAU",
      price: "₦140,000",
      rating: 4.7,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Kitchen", "Security"],
      coordinates: [7.4951, 4.5169] as [number, number]
    },
    {
      id: "3",
      name: "Elite Student Lodge",
      location: "Near Covenant University",
      price: "₦220,000",
      rating: 4.8,
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Parking", "Kitchen", "Security"],
      coordinates: [6.5244, 3.3792] as [number, number]
    },
    {
      id: "4",
      name: "Comfort Inn Hostel",
      location: "5 mins from UNILAG",
      price: "₦160,000",
      rating: 4.6,
      image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Security", "Kitchen"],
      coordinates: [6.5244, 3.3792] as [number, number]
    },
    {
      id: "5",
      name: "Golden Gate Residence",
      location: "University of Ibadan Area",
      price: "₦130,000",
      rating: 4.5,
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Parking", "Security"],
      coordinates: [7.3956, 3.8962] as [number, number]
    },
    {
      id: "6",
      name: "Royal Student Suites",
      location: "Close to Babcock University",
      price: "₦190,000",
      rating: 4.8,
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Kitchen", "Parking", "Security"],
      coordinates: [6.5244, 3.3792] as [number, number]
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Search & Discover",
      description: "Browse verified hostels using our smart filters"
    },
    {
      number: "02",
      title: "Book Inspection",
      description: "Schedule a visit to see your chosen accommodation"
    },
    {
      number: "03",
      title: "Secure Your Space",
      description: "Reserve your room with our secure payment system"
    },
    {
      number: "04",
      title: "Move In",
      description: "Get your keys and start your academic journey"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              For <span className="text-blue-600 dark:text-blue-400">Students</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Find your perfect student accommodation with verified listings, easy booking, and comprehensive support throughout your journey.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Your Search
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Students Choose HostelLink
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We've built features specifically designed to make your accommodation search stress-free and successful
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your path to perfect student accommodation in 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Hostels */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Student Accommodations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover highly-rated hostels chosen by thousands of students
            </p>
          </motion.div>

          {/* Toggle between List and Map View */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setShowMap(false)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  !showMap 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setShowMap(true)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  showMap 
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <MapPin className="inline h-4 w-4 mr-1" />
                Map View
              </button>
            </div>
          </div>

          {showMap ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <MapComponent 
                hostels={sampleHostels}
                center={[6.5244, 3.3792]}
                zoom={10}
                height="500px"
                onHostelSelect={setSelectedHostel}
              />
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleHostels.map((hostel, index) => (
                <HostelCard
                  key={hostel.id}
                  {...hostel}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" className="px-8 py-3">
              View All Hostels
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have found their ideal accommodation through HostelLink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Searching Now
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                Book a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}