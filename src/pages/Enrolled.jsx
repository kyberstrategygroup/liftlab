import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Enrolled() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl text-center"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6 klavika-header">
          You're All Set
        </h1>
        <p className="text-lg text-zinc-300">
          Once enrolled, one of our coaches will be in touch ASAP to book your assessment.
        </p>
      </motion.div>
    </div>
  );
}