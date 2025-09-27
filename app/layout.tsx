
'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import { useState, useEffect } from 'react';
import RegistrationPopup from '@/components/RegistrationPopup';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasRegistered = localStorage.getItem('hasRegistered');
    if (!hasRegistered) {
      setShowPopup(true);
    }
  }, []);

  const handleRegistrationComplete = () => {
    localStorage.setItem('hasRegistered', 'true');
    setShowPopup(false);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              {showPopup && <RegistrationPopup onClose={handleRegistrationComplete} />}
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
