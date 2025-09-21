'use client';

import { motion } from 'framer-motion';
import {
  UserCheck,
  BarChart3,
  CreditCard,
  Bell,
  Shield,
  TrendingUp,
  Users,
  Star,
  Plus,
  CheckCircle2,
  Loader2,
  X,
} from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { MapLocationPicker } from '@/components/MapLocationPicker';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/button';
import React, { useState, useRef } from 'react';

// --- Caretaker Onboarding Modal ---
function CaretakerOnboardingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    price: '',
    roomType: '',
    facilities: [] as string[],
    description: '',
    photos: [] as File[],
    coordinates: [6.5244, 3.3792] as [number, number],
  });
  const [loading, setLoading] = useState(false);

  const facilitiesList = [
    'Water',
    'Electricity',
    'WiFi',
    'Security',
    'Parking',
    'Laundry',
  ];
  const roomTypes = [
    'Single',
    'Shared',
    'Self-contained',
    'Studio',
  ];

  const price = Number(form.price) || 0;
  const commission = Math.round(price * 0.1);
  const payout = price - commission;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    if (name === 'facilities') {
      setForm((prev) => ({
        ...prev,
        facilities: checked
          ? [...prev.facilities, value]
          : prev.facilities.filter((f) => f !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationSelect = (coordinates: [number, number], address: string) => {
    setForm((prev) => ({
      ...prev,
      coordinates,
      location: address,
    }));
  };

  const handleFilesChange = (files: File[]) => {
    setForm((prev) => ({ ...prev, photos: files }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setForm({
        name: '',
        location: '',
        price: '',
        roomType: '',
        facilities: [],
        description: '',
        photos: [],
        coordinates: [6.5244, 3.3792],
      });
      setLoading(false);
      onClose();
      alert('Apartment submitted!');
    }, 1200);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
          type="button"
          title="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Caretaker Onboarding
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Apartment Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 rounded border dark:bg-gray-900"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              className="w-full px-3 py-2 rounded border dark:bg-gray-900"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Selected location will appear here"
            />
            <div className="mt-2">
              <MapLocationPicker 
                onLocationSelect={handleLocationSelect}
                initialLocation={form.coordinates}
                height="200px"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Price (₦)</label>
            <input
              type="number"
              name="price"
              className="w-full px-3 py-2 rounded border dark:bg-gray-900"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Room Type</label>
            <select
              name="roomType"
              className="w-full px-3 py-2 rounded border dark:bg-gray-900"
              value={form.roomType}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              {roomTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Facilities</label>
            <div className="flex flex-wrap gap-3">
              {facilitiesList.map((fac) => (
                <label key={fac} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="facilities"
                    value={fac}
                    checked={form.facilities.includes(fac)}
                    onChange={handleChange}
                    className="accent-green-600"
                  />
                  {fac}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              className="w-full px-3 py-2 rounded border dark:bg-gray-900"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Upload Photos</label>
            <FileUpload
              onFilesChange={handleFilesChange}
              maxFiles={10}
              maxSize={5}
              acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
            />
          </div>
          {/* Enhanced Commission Display */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              Commission Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₦{price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Price</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  -₦{commission.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">HostelLink Fee (10%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₦{payout.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Your Earnings</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-300 text-center">
              Commission is automatically deducted from each booking payment
            </div>
          </div>
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center py-3 px-6 font-semibold"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              Submit Apartment
            </Button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function Caretakers() {
  const features = [
    {
      icon: UserCheck,
      title: 'Easy KYC Onboarding',
      description:
        'Quick and secure verification process to get your property listed on our platform within 24 hours.',
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Dashboard',
      description:
        'Monitor bookings, track earnings, manage properties, and view detailed analytics all in one place.',
    },
    {
      icon: CreditCard,
      title: 'Automated Payouts',
      description:
        'Receive payments automatically with our secure, reliable payment system supporting multiple banks.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description:
        'Get instant alerts for new bookings, payment confirmations, and maintenance requests via SMS and email.',
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Occupancy',
      description:
        'Reach thousands of verified students actively searching for accommodation',
      stat: '85% Average Occupancy',
    },
    {
      icon: Users,
      title: 'Quality Tenants',
      description:
        'All students go through our verification process before they can book',
      stat: '95% Tenant Satisfaction',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted payments with fraud protection',
      stat: '100% Payment Security',
    },
    {
      icon: Star,
      title: 'Build Reputation',
      description:
        'Earn reviews and ratings to attract more quality tenants',
      stat: '4.8 Average Rating',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Register & Verify',
      description: 'Complete our simple KYC process with your documents',
    },
    {
      number: '02',
      title: 'List Your Property',
      description: 'Upload photos and details of your hostel accommodation',
    },
    {
      number: '03',
      title: 'Receive Bookings',
      description: 'Students discover and book inspections for your property',
    },
    {
      number: '04',
      title: 'Get Paid',
      description: 'Receive automatic payments directly to your bank account',
    },
  ];

  const [showOnboarding, setShowOnboarding] = useState(false);

  // Ref for onboarding section
  const onboardingRef = useRef<HTMLDivElement | null>(null);

  // Scroll to onboarding form
  const scrollToOnboarding = () => {
    onboardingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                For <span className="text-green-600 dark:text-green-400">Caretakers</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Maximize your hostel's potential with our platform. Connect with verified students, automate your operations, and increase your revenue effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Join as Caretaker
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-3">
                  Schedule Demo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Property management dashboard"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
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
              Powerful Tools for Caretakers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your student accommodation business efficiently
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

      {/* Benefits Section */}
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
              Why Partner with HostelLink?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join successful caretakers who are growing their business with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-fit mx-auto mb-4">
                  {React.createElement(benefit.icon, { className: "h-8 w-8 text-green-600 dark:text-green-400" })}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {benefit.description}
                </p>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {benefit.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From registration to receiving your first payment
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
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
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

      {/* Success Stories */}
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
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Hear from caretakers who have transformed their business with HostelLink
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "HostelLink has completely transformed my business. I've seen a 70% increase in occupancy and automated payments have saved me so much time."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Mrs. Johnson</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Lagos State</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 dark:bg-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join hundreds of successful caretakers who are maximizing their hostel potential with HostelLink
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3"
                onClick={scrollToOnboarding}
                type="button"
              >
                Register Now
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-green-600">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Register Now Section */}
      <section ref={onboardingRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Register Now
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start your journey as a HostelLink caretaker. Complete your onboarding to list your apartments.
          </p>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            onClick={() => setShowOnboarding(true)}
            type="button"
          >
            Go to Caretaker Onboarding
          </Button>
        </div>
      </section>

      {/* Onboarding Modal */}
      <CaretakerOnboardingModal open={showOnboarding} onClose={() => setShowOnboarding(false)} />
    </div>
  );
}