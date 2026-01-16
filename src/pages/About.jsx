import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import CTAButton from '@/components/ui/CTAButton';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400 mb-4">
              Our Story
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4 sm:mb-6 klavika-header px-4">
              About LiftLab
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto px-4">
              Built by coaches who got tired of watching people spin their wheels in commercial gyms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                subtitle="Our Mission"
                title="Why We Exist"
                alignment="left"
                className="mb-8"
              />

              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <p className="text-sm sm:text-base text-zinc-600">
                  LiftLab was founded on a simple observation: most people fail at fitness not because they lack motivation, but because they lack proper support. Commercial gyms offer equipment, not guidance. Personal training is often unaffordable. And group fitness rarely accounts for individual needs.
                </p>
                <p className="text-sm sm:text-base text-zinc-600">
                  We built something different. Semi-private coaching combines the accountability of personal training with the energy of group fitness—at a price point that makes long-term commitment possible.
                </p>
                <p className="text-sm sm:text-base text-zinc-600">
                  Every member gets an individualized program. Every session is coached. Progress is tracked, form is corrected, and no one falls through the cracks.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-zinc-100 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                  alt="LiftLab Gym"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              subtitle="What We Believe"
              title="Our Values"
              className="mb-16"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "No Shortcuts",
                description: "Real results come from consistent effort over time. We don't promise quick fixes because they don't exist."
              },
              {
                title: "Community Matters",
                description: "Training alongside others who share your values creates accountability that no app can replicate."
              },
              {
                title: "Coaching Is Essential",
                description: "Information is everywhere. What people need is someone who knows them, watches their form, and adjusts their program."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border border-zinc-200"
              >
                <div className="w-12 h-12 bg-blue-600 flex items-center justify-center mb-6">
                  <span className="text-2xl font-black text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-black uppercase tracking-tight mb-3 klavika-header">
                  {value.title}
                </h3>
                <p className="text-zinc-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              subtitle="Get In Touch"
              title="Contact & Location"
              className="mb-16"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider mb-2">Address</h3>
                    <p className="text-sm sm:text-base text-zinc-600">
                      Kingston, Ontario<br />
                      Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider mb-2">Email</h3>
                    <a
                      href="mailto:contact@liftlab.ca"
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      contact@liftlab.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider mb-2">Phone</h3>
                    <a
                      href="tel:+16136273054"
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      (613) 627-3054
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-black uppercase tracking-wider mb-2">Hours</h3>
                    <div className="text-sm sm:text-base text-zinc-600 space-y-1">
                      <p>Open 24/7</p>
                      <p>Monday - Sunday: 24 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square bg-zinc-100 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2858.033049802744!2d-76.56923689999999!3d44.247562599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd2ade099a80859%3A0x77d23c616b55bc53!2sLift%20Lab!5e0!3m2!1sen!2sca!4v1766884161435!5m2!1sen!2sca"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LiftLab Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 klavika-header px-4">
              Come See The Space
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mb-6 sm:mb-8 max-w-xl mx-auto px-4">
              Book a tour and consultation. No pressure, just conversation.
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