import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import VideoEmbed from '@/components/ui/VideoEmbed';
import CTAButton from '@/components/ui/CTAButton';
import { Quote } from 'lucide-react';

const testimonialVideos = [
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Sarah",
    duration: "Member for 2 years",
    quote: "The community here is unlike any gym I've been to. Everyone genuinely wants to see you succeed."
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Mike",
    duration: "Member for 3 years",
    quote: "I came for the training, but I stayed for the people. This place became a second family."
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Jennifer",
    duration: "Member for 1 year",
    quote: "After years of program-hopping, I finally found something I can stick with long-term."
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "David",
    duration: "Member for 4 years",
    quote: "The coaches actually know my name, my history, my goals. That makes all the difference."
  }
];

const stats = [
  { value: "92%", label: "Member Retention Rate" },
  { value: "4.2", label: "Average Years as Member" },
  { value: "500+", label: "Active Members" },
  { value: "15+", label: "Years Coaching Experience" }
];

export default function Memberships() {
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
              Our Community
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
              Memberships
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              More than a gym. A community built on consistency, accountability, and showing up for each other.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-blue-100 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Stories */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading 
              subtitle="Real Stories"
              title="Member Testimonials"
              className="mb-16"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {testimonialVideos.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-zinc-50 overflow-hidden"
              >
                <VideoEmbed 
                  url={testimonial.url}
                  title={`${testimonial.name}'s Story`}
                />
                <div className="p-6">
                  <Quote className="w-8 h-8 text-blue-600 mb-4" />
                  <p className="text-zinc-700 text-lg italic mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-black">{testimonial.name}</p>
                    <p className="text-sm text-zinc-500">{testimonial.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-zinc-500 mt-12 text-sm"
          >
            Replace with actual LiftLab membership testimonial videos
          </motion.p>
        </div>
      </section>

      {/* Community Values */}
      <section className="py-24 md:py-32 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading 
                subtitle="What We Value"
                title="The LiftLab Way"
                dark={true}
                className="mb-12"
              />
              
              <div className="space-y-8 text-left">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">Consistency Over Intensity</h3>
                  <p className="text-zinc-400">
                    We're not here for 6-week transformations. We're building habits that last years, not weeks.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">Community Accountability</h3>
                  <p className="text-zinc-400">
                    Your training partners notice when you're not there. That social fabric is part of the program.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-white mb-2">Process Over Outcome</h3>
                  <p className="text-zinc-400">
                    Results come from showing up and trusting the process. We focus on the work, not the scale.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-4">
              Ready to Join?
            </h2>
            <p className="text-zinc-600 mb-8 max-w-xl mx-auto">
              Start with a consultation. We'll make sure we're the right fit for each other.
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