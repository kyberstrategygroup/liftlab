import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export default function MemberLoginModal({ isOpen, onClose }) {
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const LOGIN_URL = 'https://kinectmp.ca/clients/YGK-LiftLab-1/login';

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Handle ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleIframeError = () => {
    setIframeBlocked(true);
  };

  const handleOpenInNewTab = () => {
    window.open(LOGIN_URL, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white w-full max-w-6xl h-[90vh] md:h-[85vh] rounded-none md:rounded-lg shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-200 bg-zinc-50">
                <h2 className="text-lg md:text-xl font-black uppercase text-black klavika-header">
                  Member Login
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-200 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-zinc-700" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 relative overflow-hidden">
                {!iframeBlocked ? (
                  <iframe
                    src={LOGIN_URL}
                    className="w-full h-full border-0"
                    title="Member Login"
                    onError={handleIframeError}
                    allow="fullscreen"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="max-w-md space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <ExternalLink className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-black uppercase text-black klavika-header">
                        Secure Login Opens in a New Tab
                      </h3>
                      <p className="text-zinc-600">
                        For security reasons, the login page needs to open in a separate window.
                      </p>
                      <button
                        onClick={handleOpenInNewTab}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider hover:bg-blue-500 transition-all duration-300"
                      >
                        Open Member Login
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}