'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { MapComponent } from '@/components/MapComponent';

export default function Contact() {
  // HostelLink office locations for the map
  const officeLocations = [
    {
      id: "1",
      name: "HostelLink HQ - Lagos",
      location: "123 Victoria Island, Lagos State",
      price: "Main Office",
      rating: 5.0,
      image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["Customer Service", "Sales", "Support"],
      coordinates: [6.4281, 3.4219] as [number, number]
    },
    {
      id: "2", 
      name: "HostelLink Abuja",
      location: "456 Central Business District, FCT",
      price: "Branch Office",
      rating: 5.0,
      image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["Customer Service", "Sales"],
      coordinates: [9.0765, 7.3986] as [number, number]
    },
    {
      id: "3",
      name: "HostelLink Ibadan", 
      location: "789 University Road, Oyo State",
      price: "Branch Office",
      rating: 5.0,
      image: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=400",
      facilities: ["Customer Service", "Support"],
      coordinates: [7.3956, 3.8962] as [number, number]
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Business District", "Lagos, Nigeria"],
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+234 800 123 4567", "+234 900 987 6543"],
      color: "green"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["contact@hostellink.ng", "support@hostellink.ng"],
      color: "purple"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9AM - 6PM", "Sat: 10AM - 4PM"],
      color: "orange"
    }
  ];

  const offices = [
    {
      city: "Lagos",
      address: "123 Victoria Island, Lagos State",
      phone: "+234 800 123 4567",
      isMain: true
    },
    {
      city: "Abuja",
      address: "456 Central Business District, FCT",
      phone: "+234 900 987 6543",
      isMain: false
    },
    {
      city: "Ibadan",
      address: "789 University Road, Oyo State",
      phone: "+234 700 555 0123",
      isMain: false
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're here to help you with any questions about student accommodation, our platform, or partnership opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700"
              >
                <div className={`bg-${info.color}-100 dark:bg-${info.color}-900 rounded-full p-4 w-fit mx-auto mb-4`}>
                  <info.icon className={`h-8 w-8 text-${info.color}-600 dark:text-${info.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-300">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Find Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Visit our offices or schedule a meeting with our team
                </p>
              </div>
              
              {/* Interactive Map */}
              <div className="h-64">
                <MapComponent 
                  hostels={officeLocations}
                  center={[6.4281, 3.4219]}
                  zoom={6}
                  height="256px"
                />
              </div>

              {/* Office Locations */}
              <div className="p-6 space-y-4">
                {offices.map((office, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      office.isMain
                        ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30'
                        : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {office.city}
                        {office.isMain && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                            HQ
                          </span>
                        )}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                      {office.address}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {office.phone}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quick answers to common questions about HostelLink
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do I book a hostel inspection?",
                answer: "Simply browse our listings, select your preferred hostel, and click 'Book Inspection'. Choose your preferred date and time, and we'll coordinate with the caretaker."
              },
              {
                question: "Are all hostels verified?",
                answer: "Yes! Every hostel on our platform goes through a comprehensive verification process including safety checks, facility inspections, and document validation."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept bank transfers, debit cards, and mobile payments. All transactions are secured with end-to-end encryption."
              },
              {
                question: "Can I cancel my booking?",
                answer: "Yes, you can cancel your booking according to our cancellation policy. Full refunds are available for cancellations made 48 hours before the inspection date."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}