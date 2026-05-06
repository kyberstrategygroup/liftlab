import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, CheckCircle2, Download, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackMetaEvent } from '@/components/utils/metaPixel';

const LAB_TECHS = ['Stephen', 'Colin', 'Ashley M.', 'Ashley H.', 'No preference'];

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slotError, setSlotError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    clientEmail: '',
    clientPhone: '',
    preferredLabTech: '',
    notes: ''
  });
  const [confirmation, setConfirmation] = useState(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (selectedDate) {
      setSelectedTime('');
      setSlotError('');
      const dateStr = selectedDate.toLocaleDateString('en-CA');
      loadAvailableSlots(dateStr, formData.preferredLabTech);
    }
  }, [selectedDate, formData.preferredLabTech]);

  const loadAvailableSlots = async (date, trainer) => {
    setLoading(true);
    setAvailableSlots([]);
    try {
      const { data } = await base44.functions.invoke('bookingCalendar', {
        action: 'getAvailability',
        date,
        preferredLabTech: trainer || formData.preferredLabTech || ''
      });
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error('Failed to load slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittedRef.current || submitting) return;
    submittedRef.current = true;
    setSubmitting(true);
    setSlotError('');

    try {
      const { data } = await base44.functions.invoke('bookingCalendar', {
        action: 'createBooking',
        firstName: formData.firstName,
        lastName: formData.lastName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        preferredLabTech: formData.preferredLabTech,
        appointmentDate: selectedTime,
        notes: formData.notes
      });

      if (data.error === 'SLOT_TAKEN') {
        setSlotError(data.message);
        setSelectedTime('');
        setStep(2);
        submittedRef.current = false;
        // Refresh slots
        const dateStr = selectedDate.toLocaleDateString('en-CA');
        loadAvailableSlots(dateStr);
        return;
      }

      setConfirmation(data);
      trackMetaEvent('Schedule', {
        content_name: 'LiftLab Consultation Booking',
        preferred_lab_tech: formData.preferredLabTech
      });
      setStep(4);
    } catch (error) {
      submittedRef.current = false;
      setSlotError('Booking failed. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadICS = () => {
    const blob = new Blob([confirmation.icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'liftlab-consultation.ics';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Toronto'
    });

  const formatFullDate = (iso) =>
    new Date(iso).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Toronto'
    });

  // Confirmation screen
  if (step === 4 && confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-2 border-green-500 bg-white">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-black uppercase tracking-tight">
              Booking Confirmed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-zinc-50 p-6 space-y-3">
              <p className="text-sm text-zinc-600">
                <strong className="text-black">Name:</strong> {formData.firstName} {formData.lastName}
              </p>
              <p className="text-sm text-zinc-600">
                <strong className="text-black">Date & Time:</strong> {formatFullDate(selectedTime)} EST
              </p>
              {formData.preferredLabTech && formData.preferredLabTech !== 'No preference' && (
                <p className="text-sm text-zinc-600">
                  <strong className="text-black">Preferred Lab Tech:</strong> {formData.preferredLabTech}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <p className="font-bold text-black uppercase text-sm tracking-wider">Add to Calendar:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={confirmation.googleCalendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold uppercase text-sm tracking-wider hover:bg-blue-500 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Google Calendar
                </a>
                <Button
                  onClick={downloadICS}
                  variant="outline"
                  className="flex-1 gap-2 border-2 border-black hover:bg-black hover:text-white font-bold uppercase tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  iCal / Apple
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 text-sm text-zinc-600">
              <p className="mb-2">
                ✉️ A confirmation email has been sent to <strong>{formData.clientEmail}</strong>
              </p>
              <p>
                Questions? Email us at{' '}
                <a href="mailto:contact@liftlab.ca" className="text-blue-600 hover:underline">
                  contact@liftlab.ca
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase tracking-tight">
            Book Your Consultation
          </CardTitle>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 transition-colors ${step >= s ? 'bg-blue-600' : 'bg-zinc-200'}`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider">
            Step {step} of 3 — {step === 1 ? 'Choose Date' : step === 2 ? 'Choose Time' : 'Your Details'}
          </p>
        </CardHeader>

        <CardContent>
          {/* Slot error banner */}
          <AnimatePresence>
            {slotError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{slotError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 1: Date */}
          {step === 1 && (
            <div className="space-y-6">
              <Label className="text-sm font-bold uppercase tracking-wider mb-4 block">
                Select a Date
              </Label>
              <div className="flex justify-center">
                <CalendarUI
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const maxDate = new Date();
                    maxDate.setDate(maxDate.getDate() + 60);
                    return date < today || date > maxDate;
                  }}
                  className="border rounded-md"
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedDate}
                className="w-full bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
              >
                See Available Times
              </Button>
            </div>
          )}

          {/* Step 2: Time */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-1 block">
                  Available Times
                </Label>
                <p className="text-xs text-zinc-500 mb-4">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · All times EST
                </p>

                {loading ? (
                  <div className="flex items-center gap-3 py-8 text-zinc-500">
                    <div className="w-5 h-5 border-2 border-zinc-300 border-t-blue-600 rounded-full animate-spin" />
                    <span>Loading live availability...</span>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="py-8 text-center text-zinc-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-zinc-300" />
                    <p>No available slots for this date.</p>
                    <p className="text-sm mt-1">Try selecting a different day.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => { setSelectedTime(slot); setSlotError(''); }}
                        className={`px-2 py-2.5 border-2 font-bold text-sm transition-all ${
                          selectedTime === slot
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-zinc-200 hover:border-blue-600 hover:text-blue-600'
                        }`}
                      >
                        {formatTime(slot)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 font-bold uppercase tracking-wider"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedTime}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-4 bg-blue-50 border border-blue-200 text-sm">
                <p className="font-bold text-blue-900 uppercase tracking-wider text-xs mb-1">Selected Time</p>
                <p className="text-blue-800">{formatFullDate(selectedTime)} EST</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold uppercase tracking-wider mb-2 block">First Name *</Label>
                  <Input
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold uppercase tracking-wider mb-2 block">Last Name *</Label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2 block">Email *</Label>
                <Input
                  required
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2 block">Phone *</Label>
                <Input
                  required
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  placeholder="(613) 555-0100"
                />
              </div>

              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2 block">Preferred Lab Tech</Label>
                <Select
                  value={formData.preferredLabTech}
                  onValueChange={(val) => setFormData({ ...formData, preferredLabTech: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a coach (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {LAB_TECHS.map((tech) => (
                      <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2 block">Notes / Additional Info</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Goals, injuries, questions — anything you'd like us to know"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 font-bold uppercase tracking-wider"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking...
                    </span>
                  ) : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}