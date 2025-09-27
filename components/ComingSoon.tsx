
import React from 'react';

interface ComingSoonProps {
  serviceName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ serviceName }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🚀 {serviceName} - Coming Soon!</h1>
      <p className="text-lg text-gray-600 mb-8">We're working hard to bring this feature to you. Stay tuned!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature 1</h2>
          <p className="text-gray-600">Details about feature 1 will be here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature 2</h2>
          <p className="text-gray-600">Details about feature 2 will be here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Feature 3</h2>
          <p className="text-gray-600">Details about feature 3 will be here.</p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-lg text-gray-600 mb-4">Be the first to know when we go live!</p>
        <form className="flex flex-col md:flex-row items-center justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 border rounded-md mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600"
          >
            Notify Me When Live
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComingSoon;
