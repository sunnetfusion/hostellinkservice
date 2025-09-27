'use client';

import { motion } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { FeatureCard } from '@/components/FeatureCard';
import { HostelCard } from '@/components/HostelCard';
import { Search, Shield, Calendar, Star, Users, CreditCard } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Find hostels by location, price, facilities, and more with our intelligent search system."
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "All hostels are verified through our rigorous inspection process for your safety and comfort."
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book inspections and reserve your preferred hostel with just a few clicks."
    },
    {
      icon: Star,
      title: "Trusted Reviews",
      description: "Read genuine reviews from students who have lived in these accommodations."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of students and get support throughout your accommodation journey."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Make secure payments through our platform with multiple payment options."
    }
  ];

  const featuredHostels = [
    {
      id: "1",
      name: "Royal Student Lodge",
      location: "Near University of Lagos",
      price: 150000,
      rating: 4.8,
      image: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Security", "Kitchen", "Parking"]
    },
    {
      id: "2",
      name: "Elite Hostel Complex",
      location: "Close to Covenant University",
      price: 200000,
      rating: 4.9,
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Security", "Kitchen"]
    },
    {
      id: "3",
      name: "Golden Heights",
      location: "University of Ibadan Area",
      price: 120000,
      rating: 4.6,
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["WiFi", "Parking", "Kitchen"]
    }
  ];

  return (
    <>
      <Hero />

      {/* Why Choose HostelLink */}
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
              Why Choose HostelLink?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing student accommodation with technology, transparency, and trust
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Featured Hostels */}
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
              Featured Hostels
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover top-rated accommodations near your university
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHostels.map((hostel, index) => (
              <HostelCard
                key={hostel.id}
                {...hostel}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
