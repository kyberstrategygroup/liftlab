import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import CTAButton from '@/components/ui/CTAButton';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';

// Placeholder data - replace with actual trainer data from entity
const trainers = [
    {
    id: 'coach-1',
    first_name: 'Stephen',
    title: 'Senior Coach',
    headshot_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/255370ca0_profileStephenIG2.png',
    instagram: 'liftlab',
    linkedin: '#'
  },
  {
    id: 'coach-2',
    first_name: 'Colin',
    title: 'Senior Coach',
    headshot_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/c0dfd19a0_profileColinIG.png',
    instagram: 'liftlab',
    linkedin: '#'
  },
  {
    id: 'coach-3',
    first_name: 'Ashley',
    title: 'Junior Coach',
    headshot_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/681641156_profileAshleyIG.png',
    instagram: 'liftlab',
    linkedin: '#'
  }
];

export default function Team() {
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
              The Coaches
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
              Meet The Team
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Experienced coaches who've dedicated their careers to helping people get stronger.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link 
                  to={createPageUrl(`TrainerDetail?id=${trainer.id}`)}
                  className="block"
                >
                  {/* Photo */}
                  <div className="relative overflow-hidden bg-zinc-100 mb-6 flex justify-center">
                    <img 
                      src={trainer.headshot_url}
                      alt={trainer.first_name}
                      className="max-w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-bold text-sm flex items-center gap-2">
                        View Profile <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="text-xl font-black text-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                      {trainer.first_name}
                    </h3>
                    <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">
                      {trainer.title}
                    </p>
                  </div>
                </Link>

                {/* Social Links */}
                <div className="flex gap-3">
                  {trainer.instagram && (
                    <a 
                      href={`https://instagram.com/${trainer.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-zinc-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {trainer.linkedin && (
                    <a 
                      href={trainer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-zinc-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-zinc-100">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-4">
                Want to Coach With Us?
              </h2>
              <p className="text-zinc-600 mb-6">
                We're always looking for passionate coaches who share our values. Reach out to learn about opportunities.
              </p>
              <a 
                href="mailto:contact@liftlab.ca?subject=Coaching Opportunity"
                className="text-blue-600 hover:text-blue-500 font-bold uppercase tracking-wider text-sm"
              >
                contact@liftlab.ca
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              Ready to Train With Us?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Book a consultation and meet the coaches in person.
            </p>
            <CTAButton to="StartNow#ready" variant="primary" size="large">
              Schedule Consult
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}