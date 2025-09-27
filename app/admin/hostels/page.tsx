'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Hostel {
  id: string;
  name: string;
  price: number;
  description: string;
  approved: boolean;
}

const HostelsForApprovalPage: NextPage = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);

  const fetchHostels = async () => {
    try {
      const response = await fetch('/api/admin/hostels');
      if (response.ok) {
        const data = await response.json();
        setHostels(data);
      }
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleApproval = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/admin/hostels/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ approved }),
        }
      );

      if (response.ok) {
        // Refresh the list of hostels after an update
        fetchHostels();
      }
    } catch (error) {
      console.error('Error updating hostel:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hostels for Approval</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel) => (
              <tr key={hostel.id}>
                <td className="py-2 px-4 border-b">{hostel.name}</td>
                <td className="py-2 px-4 border-b">{hostel.price}</td>
                <td className="py-2 px-4 border-b">{hostel.description}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                    onClick={() => handleApproval(hostel.id, true)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded"
                    onClick={() => handleApproval(hostel.id, false)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostelsForApprovalPage;
