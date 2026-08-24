import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ENROLL_URL = 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/info?selectedFacilityID=610d0c1db463aa70bd213b91&selectedPlanIDs=69f3f973dde69d208886b060';

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
        <p className="text-lg text-zinc-300 mb-10">
          Once enrolled, one of our coaches will be in touch ASAP to book your assessment.
        </p>
        <a
          href={ENROLL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider px-8 py-4 transition-colors"
        >
          Complete Enrollment
        </a>
      </motion.div>
    </div>
  );
}