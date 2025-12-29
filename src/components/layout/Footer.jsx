import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube  } from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* 3D Tour Section */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">
              Virtual Tour
            </p>
            <h3 className="text-2xl md:text-3xl font-bold uppercase">
              Explore The Space
            </h3>
          </div>
          <div className="max-w-4xl mx-auto aspect-video bg-zinc-900 overflow-hidden">
            <iframe
              src="https://unbranded.youriguide.com/ygk_lift_lab"
              title="LiftLab 3D Tour"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Ready to Start?
            </h3>
            <p className="text-zinc-400 mb-8">
              Book a free consultation and let's talk about your goals.
            </p>
            <CTAButton to="StartNow#ready" variant="primary" size="large">
              Schedule Consult
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <Link to={createPageUrl('Home')} className="flex items-center gap-3 mb-6">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/0d5329e27_LL-40-blackpng.png"
                  alt="LiftLab Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="text-lg font-black uppercase tracking-tight">
                  Lift<span className="text-blue-500">Lab</span>
                </span>
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Where serious training happens. Semi-private coaching and individualized programming in Kingston, Ontario.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4">Navigate</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Our Services', page: 'Services' },
                  { name: 'Our Members', page: 'Memberships' },
                  { name: 'Meet The Team', page: 'Team' },
                  { name: 'Start The Experiment', page: 'Schedule' },
                  { name: 'About', page: 'About' }
                ].map((item) => (
                  <li key={item.page}>
                    <Link 
                      to={createPageUrl(item.page)}
                      className="text-zinc-400 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="mailto:contact@liftlab.ca"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    contact@liftlab.ca
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+16136273054"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    (613) 627-3054
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-2 text-zinc-400 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Kingston, Ontario</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4">Follow</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/ygkliftlab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                <a
                  href="https://www.instagram.com/liftlabkingston"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                
                <a
                  href="https://www.youtube.com/@liftlab2021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} LiftLab. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <Link to={createPageUrl('AdminDashboard')} className="hover:text-white transition-colors">
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}