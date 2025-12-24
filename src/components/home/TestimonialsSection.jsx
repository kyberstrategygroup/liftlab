import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import VideoEmbed from '@/components/ui/VideoEmbed';

const testimonialVideos = [
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Member Story #1"
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Member Story #2"
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Member Story #3"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading 
            subtitle="Real People. Real Results."
            title="Member Stories"
            className="mb-16"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialVideos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-zinc-100 overflow-hidden">
                <VideoEmbed 
                  url={video.url} 
                  title={video.name}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-bold text-sm uppercase tracking-wider text-zinc-600">
                {video.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-zinc-500 mt-12 text-sm"
        >
          Replace with actual LiftLab testimonial playlist videos
        </motion.p>
      </div>
    </section>
  );
}