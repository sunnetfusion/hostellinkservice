
'use client';

import { motion } from 'framer-motion';
import HostelSearch from '@/components/HostelSearch'; // Corrected import

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Making Student Housing{' '}
              <span className="text-blue-600 dark:text-blue-400">Simple</span>,{' '}
              <span className="text-green-600 dark:text-green-400">Secure</span> &{' '}
              <span className="text-purple-600 dark:text-purple-400">Smart</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Find verified student hostels, book inspections, and secure your perfect accommodation with confidence. Trusted by thousands of students across Nigeria.
            </p>

            {/* Search Bar */}
            <HostelSearch />
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern student accommodation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">500+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Verified Hostels</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">5,000+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Happy Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Universities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
