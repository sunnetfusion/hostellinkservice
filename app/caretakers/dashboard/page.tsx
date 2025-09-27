'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CaretakerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Caretaker Dashboard</h1>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for future dashboard cards */}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Ready to list a new property?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Click the button below to start the quick and easy process of listing your hostel.</p>
          <Link href="/caretakers/list-hostel">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              List Your Hostel
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
