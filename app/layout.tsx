import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HostelLink - Making Student Housing Simple, Secure & Smart',
  description: 'Find verified student hostels, book inspections, and secure your accommodation with HostelLink. Trusted by students and caretakers across Nigeria.',
  keywords: 'student hostel, accommodation, booking, university, college, verified listings',
  openGraph: {
    title: 'HostelLink - Student Housing Platform',
    description: 'Making Student Housing Simple, Secure & Smart',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}