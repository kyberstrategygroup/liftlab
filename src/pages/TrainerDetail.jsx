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
    first_name: 'Stephen Radecki',
    title: 'Owner/Senior Coach',
    headshot_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/730038021_stephen2opt.jpg',
    bio: "Stephen is a seasoned strength and conditioning coach with over a decade of experience helping athletes and fitness enthusiasts reach their full potential. His coaching philosophy centers around individualized programming, ensuring that each member's unique goals and needs are met.\n\nStephen's expertise spans powerlifting, Olympic lifting, and general strength training. He is passionate about educating members on proper technique and programming to foster long-term progress and injury prevention.",
    credentials: [
      { name: 'Diploma, Fitness and Health Promotion', location: 'St. Lawrence College' },
      { name: 'Certified Personal Trainer', location: 'American College of Sports Medicine' },
      { name: 'Certified Fitness Leader SILVER (Group Fitness)', location: 'Ontario Fitness Council' },
      { name: 'Certified Glute Specialist', location: 'International Sports Sciences Association' }
    ],
    why_story_video_url: 'https://www.youtube.com/watch?v=6dVPks3ZBEQ',
    mission_video_url: 'https://www.youtube.com/watch?v=C6FtECaAIuk',
    instagram: 'liftlab',
    linkedin: '#'
  },
  'coach-2': {
    first_name: 'Colin Roberts',
    title: 'Senior Coach',
    headshot_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/2aefb96a0_colinopt.jpg',
    bio: "Colin brings a wealth of knowledge in functional movement and corrective exercise to his coaching. With a background in physical therapy, he excels at identifying and addressing movement dysfunctions that may hinder performance or lead to injury.\n\nColin's coaching style is hands-on and detail-oriented. He prioritizes teaching proper movement patterns and emphasizes the importance of mobility and stability work alongside strength training. Members appreciate his ability to break down complex concepts into understandable terms.",
    credentials: [
      { name: 'Diploma, Fitness and Health Promotion', location: 'St. Lawrence College' }
    ],
    why_story_video_url: 'https://www.youtube.com/watch?v=v96gi3kadls',
    mission_video_url: 'https://www.youtube.com/watch?v=5Uz3GoS9zl4',
    instagram: 'liftlab',
    linkedin: '#'
  },
  'coach-3': {
    first_name: 'Ashley MacDonald',
    title: 'Junior Coach',
    headshot_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/07bac34a1_ashoptimized.jpg',
    bio: "Ashley is passionate about empowering individuals to achieve their fitness goals through strength training. As a former collegiate athlete, she understands the dedication and discipline required to excel in training.\n\nAshley's coaching approach is supportive and motivational. She focuses on building confidence in the gym, especially for those new to strength training. Her enthusiasm and positive energy make her a favorite among members looking to improve their strength and overall fitness.",
    credentials: [
      { name: 'Diploma, Fitness and Health Promotion', location: 'St. Lawrence College' },
      { name: 'Certified Fitness Leader: Gold (Personal Training / Spin / Group Fitness)', location: 'Ontario Fitness Council' },
      { name: 'Certificate in General Arts and Sciences, Psychology', location: 'St. Lawrence College' },
      { name: 'Mental Health Accessibility', location: 'Enabling Minds' }
    ],
    why_story_video_url: 'https://www.youtube.com/watch?v=rumoervg8Ec',
    mission_video_url: 'https://www.youtube.com/watch?v=V419iRu5IJo',
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
              <div className={`relative overflow-hidden mb-6 flex justify-center ${trainerId === 'coach-1' || trainerId === 'coach-2' || trainerId === 'coach-3' ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
                <img 
                  src={trainer.headshot_url}
                  alt={trainer.first_name}
                  className={trainerId === 'coach-1' ? 'w-1/2' : 'w-3/4'}
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
                <ul className="space-y-3">
                  {trainer.credentials.map((credential, index) => (
                    <li key={index} className="text-zinc-400 text-sm">
                      {typeof credential === 'string' ? (
                        credential
                      ) : (
                        <>
                          <div>{credential.name}</div>
                          <div className="text-zinc-500">{credential.location}</div>
                        </>
                      )}
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
              <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-6">
                Why I Coach
              </h2>
              <VideoEmbed 
                url={trainer.why_story_video_url}
                title={`${trainer.first_name} - Why I Coach`}
                className="shadow-xl"
              />
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
              <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-6">
                Mission Statement
              </h2>
              <VideoEmbed 
                url={trainer.mission_video_url}
                title={`${trainer.first_name} - Mission Statement`}
                className="shadow-xl"
              />
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
            <CTAButton to="StartNow#ready" variant="primary" size="large">
              Schedule Consult
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}