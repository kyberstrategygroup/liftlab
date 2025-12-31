import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SoloMembershipsSection from '@/components/home/SoloMembershipsSection';
import WhyLiftLabSection from '@/components/home/WhyLiftLabSection';
import ChallengeModal from '@/components/challenge/ChallengeModal';

export default function Home() {
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

  return (
    <div>
      <HeroSection onOpenChallenge={() => setIsChallengeModalOpen(true)} />
      <WhyLiftLabSection />
      <TestimonialsSection />
      <SoloMembershipsSection />
      <ChallengeModal 
        isOpen={isChallengeModalOpen} 
        onClose={() => setIsChallengeModalOpen(false)} 
      />
    </div>
  );
}