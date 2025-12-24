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
            title="Solo Memberships"
            dark={true}
            className="mb-16"
          />
        </motion.div>

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