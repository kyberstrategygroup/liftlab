import React from 'react';
import { motion } from 'framer-motion';
import VideoEmbed from '@/components/ui/VideoEmbed';
import LeadForm from '@/components/forms/LeadForm';
import SectionHeading from '@/components/ui/SectionHeading';
import { Target, Dumbbell, Flame } from 'lucide-react';
import { createPageUrl } from '@/utils';

const archetypes = [
  {
    id: 'health',
    icon: Target,
    title: 'Health',
    subtitle: 'Foundation First',
    description: "You want to look good, feel good and support your lifestyle through movement.\n\nYou're not after extreme transformations or performance. You're after longevity, balance & benefits.\n\nYour training is a fun, inclusive, energizing and challenging reprieve from the stresses of life.\n\nIf this is you, we recommend working with Ashley or Stephen",
    color: 'bg-emerald-600',
    borderColor: 'border-emerald-500',
    href: 'https://www.youtube.com/watch?v=ugvmec8eZ5k'
  },
  {
    id: 'fitness',
    icon: Dumbbell,
    title: 'Fitness',
    subtitle: 'Balanced Performance',
    description: "Your training is more than just maintenance. You have goals that require programming and process.\n\nIf you're looking to change your body shape and composition, become resilient to life's challenges, or to prepare for your next adventure - we've got you covered.\n\nIf this is you, we recommend working with: Ashley, Colin, Stephen",
    color: 'bg-blue-600',
    borderColor: 'border-blue-500',
    href: 'https://www.youtube.com/watch?v=s5Q-ylXcHgM'
  },
  {
    id: 'train',
    icon: Flame,
    title: 'Train',
    subtitle: 'Performance Driven',
    description: "Training is central to who you are. Your lifestyle is organized around planning, eating and recovering with intention - making sacrifices in order to take your performance to the next level.\n\nYou're not in it for fun. Every single workout is executed with a purpose.\n\nYou expect results and you entrust an experienced coach to take you there.\n\nIf this is you, we recommend working with: Colin, Stephen",
    color: 'bg-orange-600',
    borderColor: 'border-orange-500',
    href: 'https://www.youtube.com/watch?v=BdPh4ZZQpyE'
  }
];

export default function StartNow() {
  // Handle scroll to hash on page load
  React.useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <VideoEmbed
                url="https://www.youtube.com/watch?v=6EAayVxCe38"
                title="Welcome to LiftLab"
                className="shadow-2xl"
              />
            </motion.div>

            {/* Form */}
            <motion.div
              id="ready"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-6">
                Ready<span className="text-blue-500">.</span>
              </h1>
              <p className="text-lg text-zinc-400 mb-8 max-w-md">
                Fill out the form below and a coach will reach out within 24 hours to schedule your consultation.
              </p>

              <LeadForm sourcePage="start-now" dark={true} />

              <p className="mt-6 text-sm text-zinc-500">
                Questions? Email us at{' '}
                <a
                  href="mailto:contact@liftlab.ca"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  contact@liftlab.ca
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Training Archetypes */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionHeading
              subtitle="Find Your Path"
              title="Training Archetypes"
            />
            <p className="text-zinc-600 max-w-2xl mx-auto mt-6">
              Everyone starts somewhere different. We identify where you are and build a program that meets you there—then takes you where you want to go.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {archetypes.map((archetype, index) => (
              <a
                key={archetype.id}
                href={archetype.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <motion.div
                  key={archetype.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group bg-zinc-50 border-2 border-zinc-200 hover:${archetype.borderColor} p-8 transition-all duration-300 hover:shadow-xl h-full flex gap-6`}
                >
                  <div className={`w-16 h-16 flex-shrink-0 ${archetype.color} flex items-center justify-center`}>
                    <archetype.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">
                      {archetype.subtitle}
                    </p>

                    <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-4">
                      {archetype.title}
                    </h3>

                    <p className="text-zinc-600 leading-relaxed whitespace-pre-line">
                      {archetype.description}
                    </p>
                  </div>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Not sure which path is right?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              That's what the consultation is for. We'll assess where you're at and map out the best approach together.
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors"
            >
              Back to Form
              <span className="text-xl">↑</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}