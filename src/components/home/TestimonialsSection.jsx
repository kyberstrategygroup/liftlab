import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import VideoEmbed from '@/components/ui/VideoEmbed';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialVideos } from '@/components/data/testimonials';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialVideos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialVideos.length) % testimonialVideos.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading 
            subtitle="Real Stories"
            title="Testimonials"
            className="mb-16"
          />
        </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={() => { prevSlide(); handleInteraction(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-black border-2 border-black hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => { nextSlide(); handleInteraction(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-black border-2 border-black hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-50 overflow-hidden"
            >
              <VideoEmbed
                url={testimonialVideos[currentIndex].url}
                title={`${testimonialVideos[currentIndex].name}'s Story`}
                className="w-full"
              />
              <div className="p-6 md:p-8">
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-zinc-700 text-lg md:text-xl italic mb-6">
                  "{testimonialVideos[currentIndex].quote}"
                </p>
                <div>
                  <p className="font-bold text-black text-lg">
                    {testimonialVideos[currentIndex].name}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {testimonialVideos[currentIndex].duration}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>


          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonialVideos.map((_, index) => (
              <button
                key={index}
                onClick={() => { setCurrentIndex(index); handleInteraction(); }}
                className={`w-2 h-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-zinc-300 hover:bg-zinc-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <p className="text-center text-zinc-400 text-sm mt-8 md:hidden">
          Use arrows to see more stories
        </p>
      </div>
    </section>
  );
}