import React from 'react';
import { motion } from 'framer-motion';
import BookingCalendar from '@/components/booking/BookingCalendar';
import { Clock } from 'lucide-react';

export default function Schedule() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-zinc-950">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
              Class Times
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
              Book Training Now
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Find a time that works for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookingCalendar />

            <div className="mt-12 max-w-2xl mx-auto">
              <div className="bg-zinc-50 border border-zinc-200 p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-black uppercase tracking-wider text-sm">
                    General Hours
                  </h3>
                </div>
                <div className="text-sm text-zinc-600 space-y-1">
                  <p><strong className="text-black">Gym Hours:</strong> Monday to Sunday (Open 24 Hours)</p>
                  <p><strong className="text-black">Training Session Hours:</strong> To be determined</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}