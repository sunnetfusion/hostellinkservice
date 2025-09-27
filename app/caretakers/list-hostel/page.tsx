'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Stepper } from '@/components/Stepper';
import { KycForm } from '@/components/list-hostel/KycForm';
import { PayoutDetailsForm } from '@/components/list-hostel/PayoutDetailsForm';
import { HostelInfoForm } from '@/components/list-hostel/HostelInfoForm';
import { PhotoUploadForm } from '@/components/list-hostel/PhotoUploadForm';
import { SubmissionSuccess } from '@/components/list-hostel/SubmissionSuccess';
import { Loader2 } from 'lucide-react';

const steps = [
  { id: '01', name: 'KYC', fields: ['fullName', 'profilePicture'] },
  { id: '02', name: 'Payout Details', fields: ['bankName', 'accountNumber', 'accountName'] },
  { id: '03', name: 'Hostel Information', fields: ['name', 'price', 'facilities', 'description', 'distance'] },
  { id: '04', name: 'Photo Uploads', fields: ['photos'] },
];

export default function ListHostelPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleNext = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (currentStep === steps.length - 1) {
      submitForm({ ...formData, ...data });
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };

  const submitForm = async (finalFormData: any) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const response = await fetch('/api/hostels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong during submission');
      }

      setCurrentStep(prev => prev + 1);
    } catch (error: any) {
      setSubmissionError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <KycForm onNext={handleNext} />;
      case 1:
        return <PayoutDetailsForm onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return <HostelInfoForm onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <PhotoUploadForm onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <SubmissionSuccess />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="mt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSubmitting ? (
                    <div className="text-center py-12">
                      <Loader2 className="w-12 h-12 text-blue-600 mx-auto animate-spin mb-4" />
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Submitting your listing...</p>
                    </div>
                  ) : submissionError ? (
                    <div className="text-center py-12">
                      <p className="text-lg font-medium text-red-600">{submissionError}</p>
                    </div>
                  ) : (
                    renderStep()
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
