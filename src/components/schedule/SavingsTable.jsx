import React from 'react';
import { motion } from 'framer-motion';

const rows = [
  { freq: '2x/wk', private: '$150-$180', semi: '$89.99' },
  { freq: '3x/wk', private: '$225-$270', semi: '$119.99' },
  { freq: '4x/wk', private: '$300-$360', semi: '$119.99' },
  { freq: '5x/wk', private: '$375-$450', semi: '$119.99' },
  { freq: '6x/wk', private: '$450-$540', semi: '$119.99' }
];

export default function SavingsTable() {
  return (
    <section className="py-16 md:py-20 bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight text-center mb-8 klavika-header">
            Personal Training Weekly Savings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-4 text-sm md:text-base font-black uppercase tracking-wider border border-blue-700">Frequency</th>
                  <th className="px-4 py-4 text-sm md:text-base font-black uppercase tracking-wider border border-blue-700">Private</th>
                  <th className="px-4 py-4 text-sm md:text-base font-black uppercase tracking-wider border border-blue-700">Semi-Private+</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.freq} className="bg-zinc-900 border-b border-zinc-800">
                    <td className="px-4 py-4 text-white font-bold uppercase tracking-wider border border-zinc-800">{r.freq}</td>
                    <td className="px-4 py-4 text-zinc-300 border border-zinc-800">{r.private}</td>
                    <td className="px-4 py-4 text-white font-black border border-zinc-800">{r.semi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}