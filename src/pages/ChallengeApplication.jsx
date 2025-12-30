import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChallengeApplication() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    goal: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      console.log('Submitting form data:', formData);
      const response = await base44.functions.invoke('sendChallengeEmail', formData);
      console.log('Response:', response);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop)',
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Form Card */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-black/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-zinc-800"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
                <p className="text-zinc-300 text-lg">
                  We'll review your application and reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
                    8-Week LiftLab Strength & Energy Challenge
                  </h1>
                  <p className="text-xl font-bold italic text-blue-400 mb-4">
                    (Hit Your Goal And Win Your Money Back)
                  </p>
                  <p className="text-zinc-300 mb-6">
                    For busy Kingston professionals who want coaching in a quieter space
                  </p>
                  
                  {/* Bullets */}
                  <ul className="text-left max-w-xl mx-auto space-y-2 text-zinc-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>2x/week coached sessions at LiftLab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Simple nutrition + weekly accountability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Win-Your-Money-Back guarantee if you follow the plan</span>
                    </li>
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: First Name & Last Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 h-12"
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 h-12"
                    />
                  </div>

                  {/* Row 2: Mobile & Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      type="tel"
                      placeholder="Mobile"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 h-12"
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 h-12"
                    />
                  </div>

                  {/* Row 3: Goal */}
                  <Textarea
                    placeholder="What's your biggest goal in 8 weeks?"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    required
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 min-h-[100px]"
                  />

                  {/* Row 4: Preferred Time */}
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                    required
                  >
                    <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 h-12">
                      <SelectValue placeholder="Select a timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Early">Early</SelectItem>
                      <SelectItem value="Midday">Midday</SelectItem>
                      <SelectItem value="Evening">Evening</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Error Message */}
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider text-xs lg:text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Apply for the 8-Week Challenge'
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}