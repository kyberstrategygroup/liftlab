import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SoloMembershipsSection from '@/components/home/SoloMembershipsSection';
import WhyLiftLabSection from '@/components/home/WhyLiftLabSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhyLiftLabSection />
      <TestimonialsSection />
      <SoloMembershipsSection />
    </div>
  );
}