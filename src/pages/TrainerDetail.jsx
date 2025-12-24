import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SectionHeading from '@/components/ui/SectionHeading';
import VideoEmbed from '@/components/ui/VideoEmbed';
import CTAButton from '@/components/ui/CTAButton';
import { ArrowLeft, Instagram, Linkedin, Award } from 'lucide-react';

// Placeholder trainer data - in production, fetch from entity based on URL param
const trainersData = {
  'coach-1': {
    first_name: 'Alex',
    title: 'Founder',
    headshot_url: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80',
    bio: "Alex founded LiftLab after 10+ years of coaching athletes and everyday people who want to get stronger. With a background in competitive powerlifting and a degree in exercise science, Alex built LiftLab to be the gym he wished existed—no nonsense, quality coaching, and a community that holds each other accountable.\n\nBefore LiftLab, Alex worked with Division I athletes and corporate clients alike. The common thread? Everyone responds to consistent, progressive training when they have the right support system.",
    credentials: [
      'CSCS - Certified Strength & Conditioning Specialist',
      'BS Exercise Science',
      'Precision Nutrition Level 2',
      'Former Competitive Powerlifter'
    ],
    why_story_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mission_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagram: 'liftlab',
    linkedin: '#'
  },
  'coach-2': {
    first_name: 'Jordan',
    title: 'Senior Coach',
    headshot_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    bio: "Jordan brings 8 years of coaching experience with a specialty in movement quality and injury prevention. Known for an eye for detail and the patience to work through movement limitations, Jordan helps members build strength on a foundation of proper mechanics.\n\nWhether you're recovering from an injury or just want to move better, Jordan's approach ensures you're building capacity that lasts.",
    credentials: [
      'CSCS - Certified Strength & Conditioning Specialist',
      'FMS Level 2',
      'SFMA Certified',
      'BS Kinesiology'
    ],
    why_story_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mission_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagram: 'liftlab',
    linkedin: '#'
  },
  'coach-3': {
    first_name: 'Taylor',
    title: 'Senior Coach',
    headshot_url: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=800&q=80',
    bio: "Taylor's background as a competitive athlete translates directly into coaching that understands what it takes to perform. With experience training everyone from weekend warriors to regional competitors, Taylor knows how to push people to their potential without burning them out.\n\nExpect honest feedback, smart programming, and someone who genuinely invests in your progress.",
    credentials: [
      'CSCS - Certified Strength & Conditioning Specialist',
      'USAW Level 1',
      'CrossFit Level 2',
      'Former Collegiate Athlete'
    ],
    why_story_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mission_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagram: 'liftlab',
    linkedin: '#'
  },
  'coach-4': {
    first_name: 'Casey',
    title: 'Junior Coach',
    headshot_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    bio: "Casey came up through the LiftLab system as a member before transitioning to coaching. That experience means Casey understands exactly what new members are going through—the learning curve, the doubts, the breakthroughs.\n\nWith a focus on beginners and those returning to training after a break, Casey creates a welcoming environment where questions are encouraged.",
    credentials: [
      'NASM-CPT',
      'Currently pursuing CSCS',
      'First Aid & CPR Certified'
    ],
    why_story_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    mission_video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    instagram: 'liftlab',
    linkedin: '#'
  }
};

export default function TrainerDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const trainerId = urlParams.get('id') || 'coach-1';
  const trainer = trainersData[trainerId] || trainersData['coach-1'];

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-zinc-950">
        <div className="container mx-auto px-6">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link 
              to={createPageUrl('Team')}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                <img 
                  src={trainer.headshot_url}
                  alt={trainer.first_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">
                {trainer.title}
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                {trainer.first_name}
              </h1>

              <div className="prose prose-invert prose-lg max-w-none mb-8">
                {trainer.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-zinc-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Credentials */}
              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  Credentials
                </h3>
                <ul className="space-y-2">
                  {trainer.credentials.map((credential, index) => (
                    <li key={index} className="text-zinc-400 text-sm">
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {trainer.instagram && (
                  <a 
                    href={`https://instagram.com/${trainer.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-zinc-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                )}
                {trainer.linkedin && (
                  <a 
                    href={trainer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-zinc-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Why Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
                My Story
              </h3>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                Why I Coach
              </h2>
              <VideoEmbed 
                url={trainer.why_story_video_url}
                title={`${trainer.first_name} - Why I Coach`}
                className="shadow-xl"
              />
              <p className="text-zinc-500 text-sm mt-4 italic">
                Replace with actual Why Story video
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">
                My Approach
              </h3>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
                Mission Statement
              </h2>
              <VideoEmbed 
                url={trainer.mission_video_url}
                title={`${trainer.first_name} - Mission Statement`}
                className="shadow-xl"
              />
              <p className="text-zinc-500 text-sm mt-4 italic">
                Replace with actual Mission Statement video
              </p>
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
              Train With {trainer.first_name}
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Book a consultation to discuss your goals and find the right training program.
            </p>
            <CTAButton to="StartNow" variant="primary" size="large">
              Schedule Consult
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}