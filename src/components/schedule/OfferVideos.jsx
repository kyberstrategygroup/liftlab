import React from 'react';
import { motion } from 'framer-motion';
import VideoEmbed from '@/components/ui/VideoEmbed';

const videos = [
  { label: 'The Offer', url: 'https://youtu.be/OLyexPJw_-U', ratio: '16/9' },
  { label: 'The Experience', url: 'https://youtu.be/BpCv0NS396M', ratio: '16/9' },
  { label: '2 Week Money-Back Guarantee', url: 'https://youtube.com/shorts/t24heq0Oja0', ratio: '9/16' },
  { label: 'Regret', url: 'https://youtube.com/shorts/VdCKO4QUNq8', ratio: '9/16' },
  { label: 'Value', url: 'https://youtube.com/shorts/RM7rDuewk9c', ratio: '9/16' },
  { label: 'Results', url: 'https://youtube.com/shorts/q81ymnEYO14', ratio: '9/16' },
  { label: 'Community', url: 'https://youtube.com/shorts/zL6kowPFjrM', ratio: '9/16' },
  { label: 'Reputation', url: 'https://youtube.com/shorts/oh7xKivuvUg', ratio: '9/16' },
  { label: 'No Judgement', url: 'https://youtube.com/shorts/bF7bgTPsZL0', ratio: '9/16' },
  { label: 'Confidence', url: 'https://youtube.com/shorts/XOfnXJS1AsE', ratio: '9/16' },
  { label: 'Parenthood', url: 'https://youtube.com/shorts/JSTddGUQ1W4', ratio: '9/16' },
  { label: 'Mental Health', url: 'https://youtube.com/shorts/vUe4lFKyclM', ratio: '9/16' },
];

export default function OfferVideos() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">
            Learn More
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight klavika-header">
            Why LiftLab
          </h2>
        </motion.div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-5 max-w-6xl mx-auto">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              className="break-inside-avoid mb-5"
            >
              <p className="font-black text-black uppercase tracking-tight text-sm mb-2 klavika-header">
                {v.label}
              </p>
              <div className="bg-black">
                <VideoEmbed url={v.url} title={v.label} aspectRatio={v.ratio} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}