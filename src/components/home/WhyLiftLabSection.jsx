import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, Shield } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const features = [
  {
    icon: Users,
    title: "Community First",
    description: "Train alongside driven individuals who push each other to be better. No egos, just effort."
  },
  {
    icon: Target,
    title: "Individualized Programming",
    description: "Your program is built for you—your goals, your schedule, your current abilities."
  },
  {
    icon: TrendingUp,
    title: "Progressive System",
    description: "Structured progressions that build real, lasting strength over time. No random workouts."
  },
  {
    icon: Shield,
    title: "Expert Coaching",
    description: "Every session is coached. Form is corrected. Progress is tracked. Nothing slips through."
  }
];

export default function WhyLiftLabSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            subtitle="The LiftLab Difference"
            title="Why Train With Us"
            className="mb-16"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 sm:p-8 bg-zinc-50 border border-zinc-200 hover:border-blue-500 transition-colors duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-500 transition-colors">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold uppercase tracking-wide mb-2 sm:mb-3 text-black">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}