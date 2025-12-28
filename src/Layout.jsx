import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({ children, currentPageName }) {
  const isAdminPage = currentPageName === 'AdminDashboard' || currentPageName === 'AdminSetup';
  
  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageName]);
  
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
        
        /* Hide Base44 edit popup - all possible selectors */
        [data-base44-edit-button],
        .base44-edit-button,
        #base44-edit-button,
        [class*="base44"],
        [id*="base44"],
        iframe[src*="base44"],
        div[style*="position: fixed"][style*="bottom"],
        button[aria-label*="Edit"],
        button[aria-label*="base44"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
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