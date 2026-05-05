import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import CTAButton from '@/components/ui/CTAButton';
import { Users, User, Check, Activity, Key, Clock } from 'lucide-react';
import { trackMetaEvent } from '@/components/utils/metaPixel';

const services = [
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
    pricing: '$5.99 biweekly membership, $65-$75 per 1 hr session',
    pricingNote: 'Fully personalized, one-on-one coaching',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/0d3da6853_unnamed1.jpg',
    popular: false,
    outbound_link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/6132273789a6d431294e39be'
  },
  {
    id: 'semi-private',
    icon: Users,
    title: 'Semi-Private Training',
    description: "Small group sessions (max 4 people) with individualized programming. You get personal attention while training alongside others who push you to be better.",
    features: [
      '2 week money-back guarantee',
      'Personalized program within a group setting of up to 4',
      'Flexible scheduling with multiple time slots, and training levels',
      'Progress tracking',
      '24/hour facility access',
      'Exclusive members-only fitness and health video tutorials',
      '1-4 weeks of private training upfront at no extra cost'
    ],
    pricing: '2 sessions per week — $80/week',
    pricingNote: 'Best value option for coached training in a small-group setting',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/cf46b6628_sptopt.jpg',
    popular: true,
    outbound_link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/695820fa29c17ae187c8e4b8',
    pricing_2: '3 sessions per week — $115/week',
    outbound_link_2: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/695f3356de70e103e4b27af3'
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
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/0bb90df39_coveroptimized.jpg',
    popular: false,
    outbound_link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/66049a21f7a31a735a8857ee'
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
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/694b80b3d28da37df32ecb33/fbeff4021_basictrainingopt.jpg',
    popular: false,
    outbound_link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/6132272689a6d431294e39bd'
  },
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

      {/* Semi-Private — Standalone Hero Section */}
      {(() => {
        const sp = services.find(s => s.id === 'semi-private');
        const semiPrivateGrid = [
          {
            row: 'Annual Contract Early Bird Rate',
            rowNote: '*$500 Early Termination Fee',
            options: [
              { label: '2x / Week', wasPrice: '$89.99', price: '$80/week', link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/info?selectedFacilityID=610d0c1db463aa70bd213b91&selectedPlanIDs=69f3f9a8dde69d208886b2aa' },
              { label: 'Unlimited', wasPrice: '$129.99', price: '$120/week', link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/info?selectedFacilityID=610d0c1db463aa70bd213b91&selectedPlanIDs=69f3f973dde69d208886b060' },
            ]
          },
          {
            row: 'Weekly',
            rowNote: '+Freezable',
            options: [
              { label: '2x / Week', wasPrice: null, price: '$112.50/week', link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/69e78af5b22376a45f4cdee4' },
              { label: 'Unlimited', wasPrice: null, price: '$162.50/week', link: 'https://kinectmp.ca/clients/YGK-Lift%20Lab-1/plan/69e78b4cb22376a45f4ce243' },
            ]
          },
        ];
        return (
          <section className="py-20 md:py-28 bg-white border-b border-zinc-100">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-start"
              >
                {/* Image */}
                <div className="relative">
                  <div className="bg-zinc-100">
                    <img src={sp.image} alt={sp.title} className="w-full" />
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="w-14 h-14 flex items-center justify-center mb-6 bg-blue-600">
                    <sp.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-4 klavika-header">
                    {sp.title}
                  </h2>
                  <p className="text-zinc-600 text-lg mb-1">{sp.description}</p>
                  <p className="text-zinc-500 text-sm italic mb-6">Stackable with weekly private sessions for bonus support.</p>

                  <ul className="space-y-3 mb-10">
                    {sp.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pricing Grid */}
                  <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-zinc-500 mb-4">Choose Your Plan</h3>
                  <div className="border border-zinc-200 overflow-hidden">
                    {/* Header row */}
                    <div className="grid grid-cols-3 bg-zinc-950">
                      <div className="p-3" />
                      <div className="p-3 text-center border-l border-zinc-700">
                        <p className="text-white font-black uppercase tracking-tight text-sm">2x/Week</p>
                      </div>
                      <div className="p-3 text-center border-l border-zinc-700">
                        <p className="text-white font-black uppercase tracking-tight text-sm">Unlimited</p>
                      </div>
                    </div>
                    {/* Data rows */}
                    {semiPrivateGrid.map((row, ri) => (
                      <div key={ri} className={`grid grid-cols-3 ${ri % 2 === 0 ? 'bg-zinc-100' : 'bg-white'} border-t border-zinc-200`}>
                        <div className="p-4 flex flex-col justify-center">
                          <p className="font-black text-black uppercase text-xs tracking-tight">{row.row}</p>
                          {row.rowNote && <p className="text-zinc-500 text-xs mt-1">{row.rowNote}</p>}
                        </div>
                        {row.options.map((opt, oi) => (
                          <a
                            key={oi}
                            href={opt.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackMetaEvent('ViewContent', { content_name: `Semi-Private ${opt.label} ${row.row}`, content_category: 'Service' })}
                            className="p-4 text-center border-l border-zinc-200 hover:bg-blue-50 transition-colors group"
                          >
                            {opt.wasPrice && (
                              <p className="text-zinc-400 text-xs line-through">{opt.wasPrice}</p>
                            )}
                            <p className="font-black text-blue-600 text-lg group-hover:text-blue-700">{opt.price}</p>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        );
      })()}

      {/* Other Services */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {services.filter(s => s.id !== 'semi-private').map((service, index) => (
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
                    <img src={service.image} alt={service.title} className="w-full" />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className={`w-14 h-14 flex items-center justify-center mb-6 ${service.featured ? 'bg-blue-600 animate-pulse' : 'bg-blue-600'}`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-4 klavika-header">
                    {service.title}
                  </h2>
                  <p className="text-zinc-600 text-lg mb-8">{service.description}</p>
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
                      <p className="text-2xl font-black text-black uppercase tracking-tight">{service.pricing}</p>
                      {service.pricingNote && <p className="text-sm text-zinc-500 mt-2">{service.pricingNote}</p>}
                    </div>
                  )}
                  {service.guarantee && (
                    <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-600">
                      <p className="text-sm font-bold text-blue-900 uppercase tracking-wider">{service.guarantee}</p>
                    </div>
                  )}
                  {service.outbound_link ? (
                    <CTAButton to={service.outbound_link} variant="primary" external={true}
                      onClick={() => trackMetaEvent('ViewContent', { content_name: service.title, content_category: 'Service', content_type: 'service' })}>
                      {service.pricing ? 'Start Now' : 'Get Started'}
                    </CTAButton>
                  ) : (
                    <CTAButton to={service.pricing ? "StartNow#ready" : "StartNow"} variant="primary">
                      {service.pricing ? 'Start Now' : 'Get Started'}
                    </CTAButton>
                  )}
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