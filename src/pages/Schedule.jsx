import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '@/components/ui/CTAButton';
import { Clock, Calendar } from 'lucide-react';

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
              Schedule
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Find a time that works for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-32 md:py-48 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar className="w-12 h-12 text-zinc-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-6">
              Schedule Coming Soon
            </h2>

            <p className="text-lg text-zinc-600 mb-8">
              We're finalizing our class schedule. In the meantime, book a consultation and we'll work around your availability.
            </p>

            <div className="bg-zinc-50 border border-zinc-200 p-8 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-black uppercase tracking-wider">General Hours</h3>
              </div>
              <div className="space-y-2 text-zinc-600">
                <p>Open 24/7</p>
                <p>Monday - Sunday: 24 Hours</p>
              </div>
            </div>

            <CTAButton to="StartNow" variant="primary" size="large">
              Schedule Consult
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}