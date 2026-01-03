import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';

export default function HeroSection({ onOpenChallenge }) {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <iframe
          src="https://www.youtube.com/embed/RMXYvhU__DE?autoplay=1&mute=1&loop=1&playlist=RMXYvhU__DE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
          allow="autoplay; fullscreen"
          className="absolute pointer-events-none"
          style={{
            top: '60%',
            left: '50%',
            width: '177.77vh',
            height: '56.25vw',
            minWidth: '100vw',
            minHeight: '100vh',
            transform: 'translate(-50%, -50%)',
            border: 'none'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo Mark */}
          <div className="mb-8">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/c7e7092e7_LL-40-dark-bckgrnd.png"
              alt="LiftLab Logo"
              className="h-40 w-auto mx-auto"
            />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-6 klavika-logo">
            Lift<span className="text-blue-500">Lab</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-4 font-light">
            Where Serious Training Happens
          </p>
          
          <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto mb-10">
            Semi-private coaching. Individualized programming. 
            A community built on accountability, not hype.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CTAButton to="StartNow" variant="primary" size="large">
              Get Started Now
            </CTAButton>
            <CTAButton to="Team" variant="outline" size="large">
              Meet The Coaches
            </CTAButton>
          </div>

          {/* 8-Week Challenge Button */}
          <div className="mt-8">
            <button
              onClick={onOpenChallenge}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25"
            >
              🔥 Apply for Win your money back special
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}