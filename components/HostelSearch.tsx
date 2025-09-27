
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type School = {
  name: string;
};

const schoolsInOyoState: School[] = [
  { name: 'Ladoke Akintola University of Technology' },
  { name: 'University of Ibadan' },
  { name: 'The Polytechnic, Ibadan' },
  { name: 'Ajayi Crowther University' },
  { name: 'Dominican University, Ibadan' },
  { name: 'Lead City University' },
  // Add more schools as needed
];

const HostelSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<School[]>([]);
  const [showNotifyMe, setShowNotifyMe] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 2) {
      const filteredSchools = schoolsInOyoState.filter(school =>
        school.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSchools);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelectSchool = (school: School) => {
    if (school.name === 'Ladoke Akintola University of Technology') {
      router.push('/hostels');
    } else {
      setSelectedSchool(school);
      setShowNotifyMe(true);
    }
    setQuery('');
    setSuggestions([]);
  };

  const handleNotifyMe = async (email: string) => {
    if (selectedSchool && email) {
      try {
        await addDoc(collection(db, 'waitlist'), {
          school: selectedSchool.name,
          email,
          createdAt: new Date(),
        });
        alert('You will be notified when we launch at your school!');
        setShowNotifyMe(false);
        setSelectedSchool(null);
      } catch (error) {
        console.error('Error adding to waitlist: ', error);
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for your school (e.g., LAUTECH)"
        className="w-full p-4 border rounded-full shadow-md"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {suggestions.map(school => (
            <li
              key={school.name}
              onClick={() => handleSelectSchool(school)}
              className="p-4 hover:bg-gray-100 cursor-pointer"
            >
              {school.name}
            </li>
          ))}
        </ul>
      )}
      {showNotifyMe && selectedSchool && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md text-center">
          <p className="mb-4">🚀 HostelLink services are launching soon at {selectedSchool.name}. Be the first to know when we go live!</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as any).elements.email.value;
            handleNotifyMe(email);
          }}>
            <input type="email" name="email" placeholder="Enter your email" className="p-2 border rounded-md" required />
            <button type="submit" className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
              Notify Me When Live
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HostelSearch;
