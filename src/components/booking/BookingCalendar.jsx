import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, CheckCircle2, Download, ChevronLeft, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackMetaEvent } from '@/components/utils/metaPixel';

const COACHES = ['No preference', 'Stephen Radecki', 'Ashley Howatt'];

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    clientEmail: '',
    clientPhone: '',
    preferredCoach: 'No preference',
    notes: ''
  });
  const [confirmation, setConfirmation] = useState(null);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadAvailableSlots = async (date) => {
    setLoading(true);
    setSlotsError('');
    setSelectedSlot(null);
    try {
      const dateStr = date.toISOString().split('T')[0];
      const { data } = await base44.functions.invoke('bookingCalendar', {
        action: 'getAvailability',
        date: dateStr
      });
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error('Failed to load slots:', error);
      setSlotsError('Could not load available times. Please try again.');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBookingError('');

    try {
      const { data } = await base44.functions.invoke('bookingCalendar', {
        action: 'createBooking',
        firstName: formData.firstName,
        lastName: formData.lastName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        preferredCoach: formData.preferredCoach === 'No preference' ? '' : formData.preferredCoach,
        appointmentDate: selectedSlot.start,
        slotEnd: selectedSlot.end,
        calendarId: selectedSlot.calendarId,
        notes: formData.notes
      });

      setConfirmation(data);
      trackMetaEvent('Schedule', {
        content_name: 'LiftLab Consultation Booking'
      });
      setStep(4);
    } catch (error) {
      setBookingError(error.message || 'Booking failed. This slot may no longer be available. Please go back and choose another time.');
    } finally {
      setLoading(false);
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

  const formatSlotTime = (isoStr) => {
    return new Date(isoStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Toronto'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Group slots by coach
  const slotsByCoach = availableSlots.reduce((acc, slot) => {
    const key = slot.coach || 'Available';
    if (!acc[key]) acc[key] = [];
    acc[key].push(slot);
    return acc;
  }, {});

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
            <div className="bg-zinc-50 p-6 space-y-2 text-sm text-zinc-600">
              <p><strong className="text-black">Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p>
                <strong className="text-black">Date & Time:</strong>{' '}
                {formatDate(selectedDate)} at {formatSlotTime(selectedSlot.start)} EST
              </p>
              {selectedSlot.coach && (
                <p><strong className="text-black">Coach:</strong> {selectedSlot.coach}</p>
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
          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {['Select Date', 'Choose Time', 'Your Details'].map((label, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step > i + 1 ? 'bg-green-500 text-white' :
                    step === i + 1 ? 'bg-blue-600 text-white' :
                    'bg-zinc-200 text-zinc-500'
                  }`}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${
                    step === i + 1 ? 'text-blue-600' : 'text-zinc-400'
                  }`}>{label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 ${step > i + 1 ? 'bg-green-500' : 'bg-zinc-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {/* STEP 1: Date picker */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <Label className="text-sm font-bold uppercase tracking-wider mb-4 block">
                    Select a Date
                  </Label>
                  <div className="flex justify-center">
                    <CalendarUI
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                      }}
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
                </div>

                {selectedDate && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Selected: <strong>{formatDate(selectedDate)}</strong></span>
                  </div>
                )}

                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate}
                  className="w-full bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
                >
                  View Available Times
                </Button>
              </motion.div>
            )}

            {/* STEP 2: Time slots */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold uppercase tracking-wider">
                    Available Times
                  </Label>
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-sm text-zinc-500 hover:text-black transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {selectedDate && formatDate(selectedDate)}
                  </button>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12 text-zinc-500 gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading available times from Google Calendar...</span>
                  </div>
                ) : slotsError ? (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-bold">Unable to load times</p>
                      <p>{slotsError}</p>
                      <button onClick={() => loadAvailableSlots(selectedDate)} className="underline mt-1">Try again</button>
                    </div>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                    <p className="text-zinc-500 font-medium">No available times on this date.</p>
                    <p className="text-zinc-400 text-sm mt-1">Please select a different date.</p>
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="mt-4 font-bold uppercase tracking-wider"
                    >
                      Choose Another Date
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(slotsByCoach).map(([coach, slots]) => (
                      <div key={coach}>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 pb-1 border-b border-zinc-100">
                          {coach}
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {slots.map((slot) => (
                            <button
                              key={slot.start}
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-2 py-2.5 border-2 font-bold text-sm transition-colors rounded-sm ${
                                selectedSlot?.start === slot.start
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-zinc-200 hover:border-blue-600 text-zinc-700'
                              }`}
                            >
                              {formatSlotTime(slot.start)}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedSlot && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Selected: <strong>{formatSlotTime(selectedSlot.start)}</strong>
                      {selectedSlot.coach && <> with <strong>{selectedSlot.coach}</strong></>}
                    </span>
                  </div>
                )}

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
                    disabled={!selectedSlot}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
                  >
                    Continue
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Contact details */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Summary bar */}
                <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200 text-sm text-zinc-600 mb-6">
                  <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>
                    <strong className="text-black">{formatDate(selectedDate)}</strong>
                    {' at '}
                    <strong className="text-black">{formatSlotTime(selectedSlot.start)}</strong>
                    {selectedSlot.coach && <> · {selectedSlot.coach}</>}
                    {' EST'}
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider mb-1.5 block">
                        First Name *
                      </Label>
                      <Input
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-bold uppercase tracking-wider mb-1.5 block">
                        Last Name *
                      </Label>
                      <Input
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider mb-1.5 block">
                      Email *
                    </Label>
                    <Input
                      required
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider mb-1.5 block">
                      Phone *
                    </Label>
                    <Input
                      required
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="(613) 555-0123"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider mb-1.5 block">
                      Preferred Lab Tech
                    </Label>
                    <Select
                      value={formData.preferredCoach}
                      onValueChange={(v) => setFormData({ ...formData, preferredCoach: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="No preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {COACHES.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-bold uppercase tracking-wider mb-1.5 block">
                      Notes / Goals
                    </Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Tell us about your fitness goals or any questions..."
                      rows={3}
                    />
                  </div>

                  {bookingError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Booking Failed</p>
                        <p>{bookingError}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={() => { setBookingError(''); setStep(2); }}
                      variant="outline"
                      className="flex-1 font-bold uppercase tracking-wider"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Booking...
                        </span>
                      ) : 'Confirm Booking'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}