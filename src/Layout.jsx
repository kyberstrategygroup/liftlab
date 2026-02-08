import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { trackPageView } from '../components/utils/metaPixel';

export default function Layout({ children, currentPageName }) {
  const isAdminPage = currentPageName === 'AdminDashboard' || currentPageName === 'AdminSetup';
  const location = useLocation();
  
  // Meta Pixel - Base Code
  useEffect(() => {
    const metaPixelScript = document.createElement('script');
    metaPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1474428567531087');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(metaPixelScript);

    const metaPixelNoscript = document.createElement('noscript');
    metaPixelNoscript.innerHTML = `
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1474428567531087&ev=PageView&noscript=1"/>
    `;
    document.head.appendChild(metaPixelNoscript);
  }, []);

  // Google Analytics
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-12ZENR1T8V';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-12ZENR1T8V');
    `;
    document.head.appendChild(script2);
  }, []);
  
  // Track PageView on route changes
  useEffect(() => {
    trackPageView();
  }, [location]);
  
  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageName]);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        @font-face {
          font-family: 'Klavika';
          src: url('https://use.typekit.net/af/4c3cd2/00000000000000007735e609/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff2'),
               url('https://use.typekit.net/af/4c3cd2/00000000000000007735e609/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff');
          font-weight: bold;
          font-style: normal;
        }

        @font-face {
          font-family: 'Klavika';
          src: url('https://use.typekit.net/af/4c6a25/00000000000000007735e60d/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3') format('woff2'),
               url('https://use.typekit.net/af/4c6a25/00000000000000007735e60d/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3') format('woff');
          font-weight: bold;
          font-style: italic;
        }

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

        .klavika-logo {
          font-family: 'Klavika', sans-serif;
          font-weight: bold;
          font-style: italic;
        }

        .klavika-header {
          font-family: 'Klavika', sans-serif;
          font-weight: bold;
          font-style: italic;
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