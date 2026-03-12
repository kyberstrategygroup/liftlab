import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackMetaEvent } from '@/components/utils/metaPixel';

export default function LeadForm({ 
  sourcePage = "unknown",
  dark = true,
  onSuccess,
  className = "",
  showLabTechDropdown = false
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commitment: '',
    preferred_lab_tech: ''
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

    // Send email notification
    await base44.functions.invoke('sendLeadEmail', {
      ...formData,
      source_page: sourcePage
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Track Meta Pixel Lead event
    trackMetaEvent('Lead', {
      content_name: 'Lead Form Submission',
      content_category: sourcePage
    });
    
    if (onSuccess) {
      onSuccess(formData);
    }
  };

  const inputClasses = dark 
    ? "bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 h-12 sm:h-14 text-sm sm:text-base"
    : "bg-white border-zinc-300 text-black placeholder:text-zinc-400 focus:border-blue-500 focus:ring-blue-500/20 h-12 sm:h-14 text-sm sm:text-base";

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-8 ${dark ? 'text-white' : 'text-black'}`}
          >
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">You're In.</h3>
            <p className={`text-sm sm:text-base ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
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
            {showLabTechDropdown && (
             <Select
               value={formData.preferred_lab_tech}
               onValueChange={(value) => setFormData({ ...formData, preferred_lab_tech: value })}
             >
               <SelectTrigger className={inputClasses}>
                 <SelectValue placeholder="Preferred Lab Tech (optional)" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="Ashley M">Ashley M</SelectItem>
                 <SelectItem value="Ashley H">Ashley H</SelectItem>
                 <SelectItem value="Colin">Colin</SelectItem>
                 <SelectItem value="Stephen">Stephen</SelectItem>
                 <SelectItem value="Unsure">Unsure</SelectItem>
               </SelectContent>
             </Select>
            )}
            <Input
             type="text"
             placeholder="I'm committed to achieving... (optional)"
             value={formData.commitment}
             onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
             className={inputClasses}
            />            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 sm:h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/25"
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