'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star, 
  Filter,
  Search,
  Bell,
  Settings,
  User,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Booking {
  id: string;
  hostelName: string;
  location: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  image: string;
}

interface StudentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudentDashboard({ isOpen, onClose }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'profile' | 'payments'>('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  // Mock data
  const bookings: Booking[] = [
    {
      id: '1',
      hostelName: 'Crown Heights Residence',
      location: '2km from University of Lagos',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      amount: 5000,
      image: 'https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      hostelName: 'Scholar\'s Paradise',
      location: 'Walking distance to OAU',
      date: '2024-01-20',
      time: '02:00 PM',
      status: 'pending',
      amount: 5000,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      hostelName: 'Elite Student Lodge',
      location: 'Near Covenant University',
      date: '2024-01-10',
      time: '11:00 AM',
      status: 'completed',
      amount: 5000,
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const favorites = [
    {
      id: '1',
      name: 'Royal Student Suites',
      location: 'Close to Babcock University',
      price: '₦190,000',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Golden Gate Residence',
      location: 'University of Ibadan Area',
      price: '₦130,000',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.hostelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'completed':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Student Dashboard</h2>
              <p className="text-blue-100">Manage your bookings and preferences</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white transition-colors"
              title="Close Dashboard"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <nav className="p-4 space-y-2">
              {[
                { id: 'bookings', label: 'My Bookings', icon: Calendar },
                { id: 'favorites', label: 'Favorites', icon: Star },
                { id: 'payments', label: 'Payments', icon: CreditCard },
                { id: 'profile', label: 'Profile', icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      My Bookings
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search bookings..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={booking.image}
                            alt={booking.hostelName}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {booking.hostelName}
                            </h4>
                            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300 mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.location}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="capitalize">{booking.status}</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                              ₦{booking.amount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    My Favorites
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((hostel) => (
                      <motion.div
                        key={hostel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img
                          src={hostel.image}
                          alt={hostel.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {hostel.name}
                          </h4>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300 mb-2">
                            <MapPin className="h-4 w-4" />
                            <span>{hostel.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{hostel.rating}</span>
                            </div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {hostel.price}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Payment History
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Payment history will be displayed here
                    </p>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Profile Settings
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Profile settings will be displayed here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
