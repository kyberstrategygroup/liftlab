import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import VideoEmbed from '@/components/ui/VideoEmbed';
import CTAButton from '@/components/ui/CTAButton';

export default function SoloMembershipsSection() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading 
            subtitle="Training Options"
            title="How You Can Train"
            dark={true}
            className="mb-16"
          />
        </motion.div>

        {/* Text-Based Training Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900 border-2 border-zinc-800 p-8"
          >
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              Solo Memberships
            </h3>
            <p className="text-zinc-300 leading-relaxed">
              24/7 facility access designed for independent training. Train at your own pace, on your own schedule, in a professional strength and conditioning environment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-zinc-900 border-2 border-blue-600 p-8"
          >
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              Semi-Private Training
            </h3>
            <p className="text-zinc-300 leading-relaxed">
              Small-group coaching (2–3 people) with customized programming and hands-on coaching. The most cost-effective way to train with expert oversight.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-900 border-2 border-zinc-800 p-8"
          >
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              Private Training
            </h3>
            <p className="text-zinc-300 leading-relaxed">
              One-on-one coaching with fully personalized programming, mindset support, and accountability. The highest level of individual attention.
            </p>
          </motion.div>
        </div>

        {/* Video Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-zinc-900 overflow-hidden">
              <VideoEmbed 
                url="https://www.youtube.com/watch?v=QROSAf8ckRk"
                title="Semi-Private Training"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">
                Semi-Private Training
              </h3>
              <p className="text-zinc-400">
                Personalized coaching in a small group setting. Get the attention you need 
                with the energy of training alongside others.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-zinc-900 overflow-hidden">
              <VideoEmbed 
                url="https://www.youtube.com/watch?v=l5En9KuB2Nw"
                title="Private Training"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">
                Private Training
              </h3>
              <p className="text-zinc-400">
                One-on-one sessions tailored entirely to your goals. Maximum focus, 
                maximum results.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <CTAButton to="Services" variant="primary" size="large">
            View All Services
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}