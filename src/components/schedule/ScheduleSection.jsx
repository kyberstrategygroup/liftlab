import React from 'react';
import { motion } from 'framer-motion';

const schedules = [
  {
    label: 'Semi-Private+ (AM 1)',
    src: 'https://base44.app/api/apps/694b80b3d28da37df32ecb33/files/mp/public/694b80b3d28da37df32ecb33/2dc5f2dfd_sp-pm.png',
    alt: 'Semi-Private+ AM 1 weekly schedule'
  },
  {
    label: 'Semi-Private+ (AM 2)',
    src: 'https://base44.app/api/apps/694b80b3d28da37df32ecb33/files/mp/public/694b80b3d28da37df32ecb33/9509f6aad_sp-am2.png',
    alt: 'Semi-Private+ AM 2 weekly schedule'
  },
  {
    label: 'Semi-Private+ (PM)',
    src: 'https://base44.app/api/apps/694b80b3d28da37df32ecb33/files/mp/public/694b80b3d28da37df32ecb33/46a37cba1_sp-am1.png',
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

        <div className="space-y-8 max-w-4xl mx-auto">
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