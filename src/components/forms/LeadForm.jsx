import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadForm({ 
  sourcePage = "unknown",
  dark = true,
  onSuccess,
  className = ""
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await base44.entities.LeadSubmission.create({
      ...formData,
      source_page: sourcePage,
      status: 'new'
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    if (onSuccess) {
      onSuccess(formData);
    }
  };

  const inputClasses = dark 
    ? "bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 h-14 text-base"
    : "bg-white border-zinc-300 text-black placeholder:text-zinc-400 focus:border-blue-500 focus:ring-blue-500/20 h-14 text-base";

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-8 ${dark ? 'text-white' : 'text-black'}`}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">You're In.</h3>
            <p className={dark ? 'text-zinc-400' : 'text-zinc-600'}>
              A coach will reach out within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={inputClasses}
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className={inputClasses}
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClasses}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Schedule Consult
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}