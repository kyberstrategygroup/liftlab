import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

const navLinks = [
  { name: 'Our Services', page: 'Services' },
  { name: 'Our Members', page: 'Memberships' },
  { name: 'Meet The Team', page: 'Team' },
  { name: 'Start The Experiment', page: 'Schedule' },
  { name: 'About', page: 'About' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/c7e7092e7_LL-40-dark-bckgrnd.png"
                alt="LiftLab Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-black text-white uppercase tracking-tight">
                Lift<span className="text-blue-500">Lab</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className="text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <CTAButton to="StartNow#ready" variant="primary" size="small">
                Schedule Consult
              </CTAButton>
            </div>

            {/* Mobile nav CTA */}
            <button
              onClick={() => window.location.href = "/StartNow#ready"}
              className="lg:hidden text-white p-2 bg-blue-600"
            >
              Schedule\\n Consult
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 lg:hidden"
          >
            <nav className="container mx-auto px-6">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold uppercase tracking-wider text-white hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-6 border-t border-zinc-800">
                  <CTAButton 
                    to="StartNow#ready" 
                    variant="primary" 
                    size="large"
                    className="w-full"
                    onClick={() => {setMobileMenuOpen(false)
                    window.location.href = "/StartNow#ready"}
                    }
                  >
                    Schedule Consult
                  </CTAButton>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}