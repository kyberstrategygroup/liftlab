import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import CTAButton from '@/components/ui/CTAButton';
import { Users, User, Globe, Check, Activity, Key, Clock } from 'lucide-react';

const services = [
  {
    id: 'mvmt-tuneup',
    icon: Activity,
    title: 'MVMNT TUNE-UP',
    description: "A 3-session movement tune-up designed as a pit stop for your training, your sport, or your lifestyle. Focused on identifying and addressing movement limitations before they become training problems.",
    features: [
      'Posture',
      'Mobility',
      'Joint stability',
      'Gait',
      'Breath strategy',
      'Foot mechanics'
    ],
    pricing: '3 Sessions — $199.99',
    guarantee: 'Better mobility and posture — or your money back.',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/fb2be8da2_poster.png',
    popular: false,
    featured: true
  },
  {
    id: 'private',
    icon: User,
    title: 'Private Training',
    description: "One-on-one coaching for those who want maximum attention and customization. Ideal for specific goals, injury rehabilitation, or accelerated progress.",
    features: [
      'Dedicated 1:1 coaching sessions',
      'Fully customized programming',
      'Flexible scheduling',
      'Priority booking access',
      'Direct coach communication'
    ],
    pricing: '2 sessions per week — $300 biweekly',
    pricingNote: 'Fully personalized, one-on-one coaching',
    image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=800&q=80',
    popular: false
  },
  {
    id: 'semi-private',
    icon: Users,
    title: 'Semi-Private Training',
    description: "Small group sessions (max 4 people) with individualized programming. You get personal attention while training alongside others who push you to be better.",
    features: [
      'Personalized program within group setting',
      'Coach-to-athlete ratio never exceeds 1:4',
      'Flexible scheduling with multiple time slots',
      'Access to all training archetypes',
      'Progress tracking and regular assessments'
    ],
    pricing: '2 sessions per week — $160 biweekly',
    pricingNote: 'Best value option for coached training in a small-group setting',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    popular: true
  },
  {
    id: 'remote',
    icon: Globe,
    title: 'Remote Training',
    description: "Train anywhere with programming from our coaches. Perfect for those who travel, prefer their own gym, or live outside Kingston.",
    features: [
      'Custom programming delivered weekly',
      'Video form review and feedback',
      'Regular check-ins via video call',
      'Training app with exercise demos',
      'Full support via messaging'
    ],
    pricing: '$100 biweekly',
    pricingNote: 'Professional guidance for independent gym-goers',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',
    popular: false
  },
  {
    id: 'premium-solo',
    icon: Key,
    title: 'Premium Solo Membership',
    description: "24/7 fitness access for individuals who want to train at their own pace on their own schedule. Full facility access with no time restrictions. Ideal for experienced or independent gym-goers.",
    features: [
      'Full facility access',
      'No time restrictions',
      '24/7 access',
      'Ideal for experienced gym-goers',
      'Train at your own pace'
    ],
    pricing: '$29.99 (biweekly)',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    popular: false
  },
  {
    id: 'basic-solo',
    icon: Clock,
    title: 'Basic Solo Membership',
    description: "24/7 fitness access at your own pace on your own schedule, with restricted access during peak hours. Cost-effective option for flexible schedules. Ideal for off-peak training.",
    features: [
      '24/7 access with peak hour restrictions',
      'No access weekdays 7:00–10:00 AM',
      'No access weekdays 4:30–7:30 PM',
      'Full access all other times',
      'Train at your own pace'
    ],
    pricing: '$21.99 (biweekly)',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    popular: false
  }
];

export default function Services() {
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
              What We Offer
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6 klavika-header">
              Our Services
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Every option includes expert coaching, individualized programming, and access to our training community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="bg-zinc-100">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full"
                    />
                  </div>
                  {service.popular && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className={`w-14 h-14 flex items-center justify-center mb-6 ${service.featured ? 'bg-blue-600 animate-pulse' : 'bg-blue-600'}`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-4 klavika-header">
                    {service.title}
                  </h2>
                  
                  <p className="text-zinc-600 text-lg mb-8">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {service.pricing && (
                    <div className="mb-6">
                      <p className="text-2xl font-black text-black uppercase tracking-tight">
                        {service.pricing}
                      </p>
                      {service.pricingNote && (
                        <p className="text-sm text-zinc-500 mt-2">
                          {service.pricingNote}
                        </p>
                      )}
                    </div>
                  )}

                  {service.guarantee && (
                    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600">
                      <p className="text-sm font-bold text-blue-900 uppercase tracking-wider">
                        {service.guarantee}
                      </p>
                    </div>
                  )}

                  <CTAButton to={service.pricing ? "StartNow#ready" : "StartNow"} variant="primary">
                    {service.pricing ? 'Schedule Consult' : 'Get Started'}
                  </CTAButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-28 bg-zinc-950">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4 klavika-header">
              Not Sure Which Is Right For You?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Book a free consultation. We'll discuss your goals and recommend the best fit.
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