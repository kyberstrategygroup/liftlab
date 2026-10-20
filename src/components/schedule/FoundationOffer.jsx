import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const features = [
  { label: 'Weekly Rate', essential: '$89.99', gold: '$119.99' },
  { label: 'Weekly Sessions', essential: '2', gold: 'Unlimited' },
  { label: 'Progress Review', essential: '6 Months', gold: '3 Months' },
  { label: 'Bring-A-Friend Pass', essential: '1/year', gold: '1/month' },
  { label: 'Priority Booking', essential: 'Upgrade to Gold (1 week)', gold: 'Any time' },
  { label: 'Freeze', essential: '4 weeks', gold: 'N/A' }
];

const ENROLL_ESSENTIAL = 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/6a8f2d09d2ade9bc55f7f6b3';
const ENROLL_GOLD = 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/6a8f2dcbd2ade9bc55f7ff82';

export default function FoundationOffer() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-3 text-center">
            5 Month Package
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight text-center mb-10 klavika-header">
            The Foundation
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-left text-sm md:text-base font-black uppercase tracking-wider text-white bg-zinc-900 border border-zinc-800"></th>
                  <th className="px-4 py-4 text-sm md:text-base font-black uppercase tracking-wider text-white bg-blue-600 border border-blue-700">Essential</th>
                  <th className="px-4 py-4 text-sm md:text-base font-black uppercase tracking-wider text-white bg-zinc-900 border border-zinc-800">Gold</th>
                </tr>
              </thead>
              <tbody>
                {features.map((f) => (
                  <tr key={f.label} className="border-b border-zinc-200">
                    <td className="px-4 py-4 text-sm md:text-base font-bold text-black uppercase tracking-wider">{f.label}</td>
                    <td className="px-4 py-4 text-sm md:text-base text-zinc-700 text-center bg-blue-50">{f.essential}</td>
                    <td className="px-4 py-4 text-sm md:text-base text-zinc-700 text-center">{f.gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enroll links */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <a
              href={ENROLL_ESSENTIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider px-6 py-4 transition-colors"
            >
              Enroll Essential <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={ENROLL_GOLD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white font-bold uppercase tracking-wider px-6 py-4 transition-colors"
            >
              Enroll Gold <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-center text-lg md:text-xl font-black text-blue-600 uppercase tracking-tight mt-8 klavika-header">
            Earn 1 week FREE when you skip the call and enroll today
          </p>
        </motion.div>
      </div>
    </section>
  );
}