import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/common/Container';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { schedulingApi } from '../services/schedulingApi';

const DURATIONS = [30, 45, 60, 90];

export default function BookingPage() {
  const { slug } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [duration, setDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [details, setDetails] = useState({ name: '', email: '' });
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  const dates = useMemo(() => Array.from({ length: 14 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date;
  }), []);

  useEffect(() => {
    schedulingApi.getPublicAvailability(slug)
      .then((data) => setTherapist(data.therapist))
      .catch((error) => setStatus({ type: 'error', message: `${error.message}. Start MongoDB and the UNFAZZED API to load real availability.` }));
  }, [slug]);

  useEffect(() => {
    if (!therapist) return;
    setStatus({ type: 'loading', message: 'Finding available times...' });
    schedulingApi.getSlots(slug, { date: selectedDate, duration, timezone })
      .then((data) => {
        setSlots(data.slots);
        setSelectedSlot(null);
        setStatus({ type: 'idle', message: '' });
      })
      .catch((error) => setStatus({ type: 'error', message: error.message }));
  }, [slug, therapist, selectedDate, duration, timezone]);

  async function confirmBooking(event) {
    event.preventDefault();
    if (!selectedSlot || !details.name || !details.email) {
      setStatus({ type: 'error', message: 'Select a time and enter your name and email.' });
      return;
    }
    setStatus({ type: 'loading', message: 'Confirming your appointment...' });
    try {
      const data = await schedulingApi.createBooking({
        therapistId: therapist._id,
        start: selectedSlot.start,
        duration,
        clientName: details.name,
        clientEmail: details.email,
        timezone
      });
      setStep(3);
      setStatus({ type: 'success', message: `Appointment confirmed for ${new Date(data.booking.start).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}.` });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <main className="py-8 md:py-14">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#52644F]">Private appointment</p>
                <h1 className="mt-2 text-4xl md:text-5xl">{step === 3 ? 'You are booked.' : `Book with ${therapist?.name || 'Dr. Meera Iyer'}`}</h1>
              </div>
              {step !== 3 && <p className="hidden text-sm text-[var(--ink-muted)] sm:block">Step {step} of 2</p>}
            </div>

            {step === 3 ? (
              <div className="grid min-h-[420px] place-items-center rounded-[14px] border border-[var(--border-hairline)] bg-white p-8 text-center">
                <div className="max-w-md">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#52644F] text-xl text-white">✓</div>
                  <h2 className="mt-6 text-3xl">Appointment confirmed</h2>
                  <p className="mt-3 text-[var(--ink-secondary)]">{status.message}</p>
                  <Button to="/dr-meera-iyer" variant="secondary" size="lg" className="mt-7">Return to profile</Button>
                </div>
              </div>
            ) : (
              <div className="grid overflow-hidden rounded-[14px] border border-[var(--border-hairline)] bg-white lg:grid-cols-[220px_minmax(0,1fr)]">
                <aside className="border-b border-[var(--border-hairline)] p-5 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-[10px] bg-[#52644F] text-sm font-bold text-white">MI</div>
                    <div><p className="font-bold">{therapist?.name || 'Dr. Meera Iyer'}</p><p className="text-xs text-[var(--ink-muted)]">Clinical psychologist</p></div>
                  </div>
                  <div className="mt-7 space-y-5 text-sm">
                    <div><p className="text-xs uppercase tracking-wide text-[var(--ink-muted)]">Duration</p><p className="mt-1 font-semibold">{duration} minutes</p></div>
                    <div><p className="text-xs uppercase tracking-wide text-[var(--ink-muted)]">Timezone</p><p className="mt-1 font-semibold">{timezone}</p></div>
                    <div><p className="text-xs uppercase tracking-wide text-[var(--ink-muted)]">Format</p><p className="mt-1 font-semibold">Online or in-person</p></div>
                  </div>
                </aside>

                {step === 1 ? (
                  <div className="p-5 md:p-8">
                    <p className="text-sm font-bold">Choose a duration</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {DURATIONS.map((value) => (
                        <button key={value} type="button" onClick={() => setDuration(value)} className={`rounded-[8px] border px-4 py-2.5 text-sm font-semibold ${duration === value ? 'border-[#52644F] bg-[#52644F] text-white' : 'border-[var(--border-hairline-strong)] bg-white hover:border-[#52644F]'}`}>{value} min</button>
                      ))}
                    </div>
                    <div className="mt-8">
                      <p className="text-sm font-bold">Select a date</p>
                      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2">
                        {dates.map((date) => {
                          const key = date.toISOString().slice(0, 10);
                          return (
                            <button key={key} type="button" onClick={() => setSelectedDate(key)} className={`min-w-[72px] rounded-[9px] border px-3 py-3 text-center ${selectedDate === key ? 'border-[#52644F] bg-[#52644F] text-white' : 'border-[var(--border-hairline)] hover:border-[#52644F]'}`}>
                              <span className="block text-[10px] uppercase tracking-wide">{date.toLocaleDateString([], { weekday: 'short' })}</span>
                              <span className="mt-1 block text-lg font-bold">{date.getDate()}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="mt-8">
                      <p className="text-sm font-bold">Available times</p>
                      {status.type === 'loading' ? (
                        <p className="mt-4 text-sm text-[var(--ink-muted)]">{status.message}</p>
                      ) : slots.length ? (
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                          {slots.map((slot) => (
                            <button key={slot.start} type="button" onClick={() => setSelectedSlot(slot)} className={`rounded-[8px] border px-3 py-3 text-sm font-semibold ${selectedSlot?.start === slot.start ? 'border-[#52644F] bg-[#52644F] text-white' : 'border-[var(--border-hairline-strong)] hover:border-[#52644F]'}`}>
                              {new Date(slot.start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 rounded-[8px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-5 text-sm text-[var(--ink-secondary)]">{status.type === 'error' ? status.message : 'No available times for this date.'}</p>
                      )}
                    </div>
                    <div className="mt-8 flex justify-end"><Button variant="dark" size="lg" disabled={!selectedSlot} onClick={() => setStep(2)}>Continue</Button></div>
                  </div>
                ) : (
                  <form className="p-5 md:p-8" onSubmit={confirmBooking}>
                    <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-[#52644F]">← Change time</button>
                    <h2 className="mt-5 text-2xl">Your details</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <label className="text-sm font-semibold">Name<input required value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} className="mt-2 h-12 w-full rounded-[8px] border border-[var(--border-hairline-strong)] px-3 font-normal" /></label>
                      <label className="text-sm font-semibold">Email<input required type="email" value={details.email} onChange={(event) => setDetails({ ...details, email: event.target.value })} className="mt-2 h-12 w-full rounded-[8px] border border-[var(--border-hairline-strong)] px-3 font-normal" /></label>
                    </div>
                    <div className="mt-6 rounded-[10px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink-muted)]">Booking summary</p>
                      <p className="mt-2 font-bold">{selectedSlot && new Date(selectedSlot.start).toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })}</p>
                      <p className="mt-1 text-sm text-[var(--ink-secondary)]">{duration} minutes · {timezone}</p>
                    </div>
                    {status.type === 'error' && <p className="mt-4 text-sm text-[#9A4E3D]">{status.message}</p>}
                    <div className="mt-8 flex justify-end"><Button type="submit" variant="dark" size="lg" disabled={status.type === 'loading'}>Confirm appointment</Button></div>
                  </form>
                )}
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
