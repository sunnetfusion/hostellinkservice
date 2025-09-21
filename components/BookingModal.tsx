'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MapPin, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentModal } from './PaymentModal';
import { validateBookingForm, ValidationError } from '@/lib/validation';

interface Hostel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  image: string;
  facilities: string[];
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  hostel: Hostel | null;
  onBookingSuccess: (bookingData: any) => void;
}

export function BookingModal({ isOpen, onClose, hostel, onBookingSuccess }: BookingModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [bookingData, setBookingData] = useState({
    inspectionDate: '',
    inspectionTime: '',
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors([]);
    
    // Validate form
    const validation = validateBookingForm(bookingData);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate form processing
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('payment');
      setShowPayment(true);
    }, 1000);
  };

  const handlePaymentSuccess = (paymentData: any) => {
    const completeBookingData = {
      ...bookingData,
      hostel,
      payment: paymentData,
      bookingId: `BOOK_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    
    onBookingSuccess(completeBookingData);
    setStep('confirmation');
    setShowPayment(false);
  };

  const handleClose = () => {
    setStep('details');
    setBookingData({
      inspectionDate: '',
      inspectionTime: '',
      fullName: '',
      email: '',
      phone: '',
      message: '',
    });
    setShowPayment(false);
    setValidationErrors([]);
    onClose();
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors.find(error => error.field === fieldName)?.message;
  };

  if (!isOpen || !hostel) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-fit mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Book Inspection
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Schedule your visit to {hostel.name}
              </p>
            </div>

            {/* Hostel Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={hostel.image} 
                  alt={hostel.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{hostel.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4" />
                    <span>{hostel.location}</span>
                  </div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {hostel.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Please fix the following errors:
                  </h4>
                </div>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error.message}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Booking Form */}
            {step === 'details' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Inspection Date
                    </label>
                    <input
                      type="date"
                      name="inspectionDate"
                      value={bookingData.inspectionDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                        getFieldError('inspectionDate') 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {getFieldError('inspectionDate') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('inspectionDate')}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="inspectionTime"
                      value={bookingData.inspectionTime}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                        getFieldError('inspectionTime') 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {getFieldError('inspectionTime') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('inspectionTime')}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={bookingData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                        getFieldError('fullName') 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {getFieldError('fullName') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('fullName')}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                        getFieldError('phone') 
                          ? 'border-red-500 dark:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {getFieldError('phone') && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                      getFieldError('email') 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {getFieldError('email') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={bookingData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none ${
                      getFieldError('message') 
                        ? 'border-red-500 dark:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Any specific questions or requirements..."
                  />
                  {getFieldError('message') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('message')}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1 py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 mr-2" />
                        Continue to Payment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* Confirmation Step */}
            {step === 'confirmation' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 w-fit mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your inspection has been scheduled successfully. You'll receive a confirmation email shortly.
                </p>
                <Button
                  onClick={handleClose}
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  Close
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={5000} // Inspection fee
        description={`Inspection booking for ${hostel.name}`}
        onSuccess={handlePaymentSuccess}
        paymentType="inspection"
      />
    </>
  );
}
