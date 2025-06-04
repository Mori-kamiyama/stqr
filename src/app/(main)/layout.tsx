"use client";

import React, { useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar'; // Import Navbar

interface MainAppLayoutProps {
  children: ReactNode;
}

export default function MainAppLayout({ children }: MainAppLayoutProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Ensure this only runs on the client-side after hydration
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Render children only if authenticated, otherwise, render null or a loading indicator
  // to prevent flashing of content before redirection.
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex">
      <Navbar />
      <main className="flex-grow p-8 bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
