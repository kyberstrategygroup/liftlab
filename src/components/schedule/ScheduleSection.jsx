import React from 'react';
import { motion } from 'framer-motion';

const schedules = [
  {
    label: 'Semi-Private+ (AM)',
    src: 'https://media.base44.com/images/public/694b80b3d28da37df32ecb33/8e5ee7e0a_SPAM.png',
    alt: 'Semi-Private+ AM weekly schedule'
  },
  {
    label: 'Semi-Private+ (PM)',
    src: 'https://media.base44.com/images/public/694b80b3d28da37df32ecb33/23ceb801c_SPPM.png',
    alt: 'Semi-Private+ PM weekly schedule'
  }
];

export default function ScheduleSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
            Weekly Schedule
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight klavika-header">
            Semi-Private+ Schedule
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {schedules.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white"
            >
              <img src={s.src} alt={s.alt} className="w-full h-auto block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}