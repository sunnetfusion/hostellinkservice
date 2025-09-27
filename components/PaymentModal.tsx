'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  description: string;
  onSuccess: (paymentData: any) => void;
  paymentType: 'inspection' | 'deposit' | 'rent' | 'commission';
  userEmail: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  description,
  onSuccess,
  paymentType,
  userEmail,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getPaymentTypeInfo = () => {
    switch (paymentType) {
      case 'inspection':
        return {
          title: 'Book Inspection',
          subtitle: 'Secure your inspection slot',
          color: 'blue'
        };
      case 'deposit':
        return {
          title: 'Pay Deposit',
          subtitle: 'Reserve your accommodation',
          color: 'green'
        };
      case 'rent':
        return {
          title: 'Pay Rent',
          subtitle: 'Complete your payment',
          color: 'purple'
        };
      case 'commission':
        return {
          title: 'Commission Payment',
          subtitle: 'HostelLink commission',
          color: 'orange'
        };
      default:
        return {
          title: 'Payment',
          subtitle: 'Complete your transaction',
          color: 'blue'
        };
    }
  };

  const typeInfo = getPaymentTypeInfo();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const reference = urlParams.get('reference');

      if (reference) {
        setIsProcessing(true);
        setPaymentStatus('processing');

        try {
          const response = await fetch(`/api/paystack?reference=${reference}`);
          const data = await response.json();

          if (data.status === 'success') {
            setPaymentStatus('success');
            onSuccess(data);
          } else {
            setPaymentStatus('error');
            setErrorMessage('Payment verification failed.');
          }
        } catch (error) {
          setPaymentStatus('error');
          setErrorMessage('An error occurred during payment verification.');
        } finally {
          setIsProcessing(false);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    if (isOpen) {
      checkPaymentStatus();
    }
  }, [isOpen]);

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      const response = await fetch('/api/paystack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, amount }),
      });

      const data = await response.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setPaymentStatus('error');
        setErrorMessage('Failed to initialize payment.');
        setIsProcessing(false);
      }
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('An error occurred during payment initialization.');
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) return null;

  const paymentContent = (
    <div className="p-8">
      <div className="text-center mb-6">
        <div className={`bg-${typeInfo.color}-100 dark:bg-${typeInfo.color}-900 rounded-full p-3 w-fit mx-auto mb-4`}>
          <CreditCard className={`h-8 w-8 text-${typeInfo.color}-600 dark:text-${typeInfo.color}-400`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {typeInfo.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {typeInfo.subtitle}
        </p>
      </div>

      {paymentStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-green-800 dark:text-green-200 font-medium">
              Payment Successful!
            </span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            Your payment has been processed successfully.
          </p>
        </motion.div>
      )}

      {paymentStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <span className="text-red-800 dark:text-red-200 font-medium">
              Payment Failed
            </span>
          </div>
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">
            {errorMessage}
          </p>
        </motion.div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-300">Amount</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatAmount(amount)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-gray-300">Description</span>
          <span className="text-gray-900 dark:text-white">{description}</span>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-3 px-6 font-semibold bg-blue-600 hover:bg-blue-700 text-white`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Pay {formatAmount(amount)}
            </>
          )}
        </Button>
        
        <Button
          onClick={onClose}
          variant="outline"
          className="w-full py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold"
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full mx-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          disabled={isProcessing}
          title="Close"
        >
          <X size={20} />
        </button>

        {paymentContent}
      </motion.div>
    </div>
  );
}
