import React from 'react';
import ChallengeForm from '@/components/challenge/ChallengeForm';

export default function ChallengeApplication() {

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop)',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Form Card */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-black/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-zinc-800">
          <ChallengeForm />
        </div>
      </div>
    </div>
  );
}