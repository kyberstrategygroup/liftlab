import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({ children, currentPageName }) {
  const isAdminPage = currentPageName === 'AdminDashboard' || currentPageName === 'AdminSetup';
  
  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        :root {
          --liftlab-blue: #2563eb;
          --liftlab-blue-light: #3b82f6;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        ::selection {
          background-color: var(--liftlab-blue);
          color: white;
        }
        
        /* Hide Base44 edit popup */
        [data-base44-edit-button],
        .base44-edit-button,
        #base44-edit-button {
          display: none !important;
        }
      `}</style>
      
      {!isAdminPage && <Header />}
      
      <main>
        {children}
      </main>
      
      {!isAdminPage && <Footer />}
    </div>
  );
}