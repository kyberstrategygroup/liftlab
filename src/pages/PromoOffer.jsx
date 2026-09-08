import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const options = [
  {
    label: 'Lump Sum',
    description: 'Pay upfront for the full 5-month offer.',
    url: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/6a8f2d09d2ade9bc55f7f6b3',
  },
  {
    label: 'Weekly Payments',
    description: 'Spread the cost with easy weekly billing.',
    url: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/6a8f2dcbd2ade9bc55f7ff82',
  },
];

export default function PromoOffer() {
  return (
    <div className="min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 bg-zinc-950">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500 mb-4">
            Special Offer: 5mo for 4
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6 klavika-header">
            Choose Your Payment Option
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Pay upfront or go weekly — pick what works for you to claim your 5 months for the price of 4.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {options.map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white text-left p-8 flex flex-col"
            >
              <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-3 klavika-header">
                {opt.label}
              </h3>
              <p className="text-sm text-zinc-600 mb-6 flex-1">{opt.description}</p>
              <a
                href={opt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider px-6 py-4 transition-colors"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}