import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, CheckCircle2, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: 'Consultation',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  });
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      loadAvailableSlots(dateStr);
    }
  }, [selectedDate]);

  const loadAvailableSlots = async (date) => {
    setLoading(true);
    try {
      const { data } = await base44.functions.invoke('bookingCalendar', {
        action: 'getAvailability',
        date
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
    setLoading(true);

    try {
      const { data } = await base44.functions.invoke('bookingCalendar', {
        action: 'createBooking',
        serviceType: formData.serviceType,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        appointmentDate: selectedTime,
        notes: formData.notes
      });

      setConfirmation(data);
      setStep(4);
    } catch (error) {
      alert('Booking failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadICS = () => {
    const blob = new Blob([confirmation.icsContent], { type: 'text/calendar' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'liftlab-booking.ics';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

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
                <strong className="text-black">Service:</strong> {formData.serviceType}
              </p>
              <p className="text-sm text-zinc-600">
                <strong className="text-black">Date & Time:</strong>{' '}
                {new Date(selectedTime).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZone: 'America/Toronto'
                })}{' '}
                EST
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-bold text-black uppercase text-sm tracking-wider">
                Add to Calendar:
              </p>
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
                className={`h-1 flex-1 ${
                  step >= s ? 'bg-blue-600' : 'bg-zinc-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-4 block">
                  Select Date
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
                      maxDate.setDate(maxDate.getDate() + 14);
                      return date < today || date > maxDate;
                    }}
                    className="border rounded-md"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!selectedDate}
                className="w-full bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2">
                  Available Times
                </Label>
                {loading ? (
                  <p className="text-zinc-500">Loading available times...</p>
                ) : availableSlots.length === 0 ? (
                  <p className="text-zinc-500">No available slots for this date.</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableSlots.map((slot) => {
                      const time = new Date(slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-2 border-2 font-bold text-sm transition-colors ${
                            selectedTime === slot
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-zinc-200 hover:border-blue-600'
                          }`}
                        >
                          {time.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            timeZone: 'America/Toronto'
                          })}
                        </button>
                      );
                    })}
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

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2">
                  Full Name *
                </Label>
                <Input
                  required
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>

              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2">
                  Email *
                </Label>
                <Input
                  required
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, clientEmail: e.target.value })
                  }
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2">
                  Phone *
                </Label>
                <Input
                  required
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, clientPhone: e.target.value })
                  }
                  placeholder="(123) 456-7890"
                />
              </div>

              <div>
                <Label className="text-sm font-bold uppercase tracking-wider mb-2">
                  Additional Notes
                </Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Any specific goals or concerns?"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
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
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-wider"
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}