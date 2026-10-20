import React from 'react';
import { motion } from 'framer-motion';

const memberships = [
  {
    name: 'The Long Game',
    sub: 'Annual Contract',
    bestValue: true,
    features: [
      'Freezable for 4 weeks',
      'Max 2-week freeze at once',
      '7 day minimum with set-end date',
      'Freezes require 1 week notice',
      '30 day early termination notice',
      '$500 early termination fee'
    ],
    essential: '84.99',
    gold: '109.99'
  },
  {
    name: 'The Foundation',
    sub: '5-Month',
    bestValue: false,
    features: [
      'Freezable for 2 weeks',
      '7 day minimum with set-end date',
      'Freezes require 1 week notice',
      '30 day early termination notice',
      '$500 early termination fee'
    ],
    essential: '89.99',
    gold: '119.99'
  },
  {
    name: 'Flex',
    sub: '',
    bestValue: false,
    features: [
      '$100 start-up fee',
      'Freezable up to 4 months',
      '7 day minimum with set-end date',
      'Freezes require 1 week notice'
    ],
    essential: '117.50',
    gold: '149.99'
  }
];

export default function InFacility() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight klavika-header">
            Your Next Step
          </h1>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-5 text-left text-sm md:text-base font-black uppercase tracking-wider bg-zinc-900 border border-zinc-800">Membership</th>
                  <th className="px-4 py-5 text-sm md:text-base font-black uppercase tracking-wider bg-blue-600 border border-blue-700">Essential</th>
                  <th className="px-4 py-5 text-sm md:text-base font-black uppercase tracking-wider bg-zinc-900 border border-zinc-800">Gold</th>
                </tr>
              </thead>
              <tbody>
                {memberships.map((m) => (
                  <tr
                    key={m.name}
                    className={m.bestValue ? 'bg-blue-600/15 border-2 border-blue-600' : 'border-b border-zinc-800'}
                  >
                    <td className="px-4 py-6 align-top border border-zinc-800">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">{m.name}</h3>
                        {m.bestValue && (
                          <span className="text-xs font-black uppercase tracking-wider bg-blue-600 text-white px-2 py-1">
                            Best Value
                          </span>
                        )}
                      </div>
                      {m.sub && <p className="text-xs uppercase tracking-wider text-zinc-400 mb-3">{m.sub}</p>}
                      <ul className="space-y-1.5">
                        {m.features.map((f) => (
                          <li key={f} className="text-sm text-zinc-300 flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-6 text-center align-middle border border-zinc-800 bg-blue-600/5">
                      <a href="#" className="underline font-black text-xl md:text-2xl">${m.essential}<span className="text-sm font-normal text-zinc-400">/wk</span></a>
                    </td>
                    <td className="px-4 py-6 text-center align-middle border border-zinc-800">
                      <a href="#" className="underline font-black text-xl md:text-2xl">${m.gold}<span className="text-sm font-normal text-zinc-400">/wk</span></a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}