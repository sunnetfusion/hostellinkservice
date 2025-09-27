import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function SubmissionSuccess() {
  return (
    <motion.div 
      className="text-center py-12"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submission Successful!</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
        Thank you for listing your hostel with us. Our team will review your submission and you will be notified once it is approved.
      </p>
    </motion.div>
  );
}
