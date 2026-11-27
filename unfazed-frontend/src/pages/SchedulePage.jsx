import { useEffect, useState } from 'react';
import Container from '../components/common/Container';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { schedulingApi } from '../services/schedulingApi';

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function SchedulePage() {
  const [therapist, setTherapist] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [view, setView] = useState('Week');
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    schedulingApi.getPublicAvailability('dr-meera-iyer')
      .then(async (data) => {
        setTherapist(data.therapist);
        setAvailability(data.availability);
        const sessionData = await schedulingApi.getTherapistSessions(data.therapist._id);
        setSessions(sessionData);
      })
      .catch((error) => setStatus({ type: 'error', message: error.message }));
  }, []);

  async function saveAvailability() {
    if (!therapist || !availability) return;
    setStatus({ type: 'loading', message: 'Saving availability...' });
    try {
      const saved = await schedulingApi.saveAvailability(therapist._id, availability);
      setAvailability(saved);
      setStatus({ type: 'success', message: 'Availability saved.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  }

  function addWindow(day) {
    setAvailability((current) => ({
      ...current,
      weekly: {
        ...(current?.weekly || {}),
        [day]: [...((current?.weekly || {})[day] || []), { start: '09:00', end: '17:00' }]
      }
    }));
  }

  function updateWindow(day, index, field, value) {
    setAvailability((current) => {
      const windows = [...((current?.weekly || {})[day] || [])];
      windows[index] = { ...windows[index], [field]: value };
      return { ...current, weekly: { ...(current.weekly || {}), [day]: windows } };
    });
  }

  function removeWindow(day, index) {
    setAvailability((current) => {
      const windows = [...((current?.weekly || {})[day] || [])];
      windows.splice(index, 1);
      return { ...current, weekly: { ...(current.weekly || {}), [day]: windows } };
    });
  }

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + 1 + index);
    return date;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <main className="py-8 md:py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#52644F]">{new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</p>
              <h1 className="mt-2 text-4xl md:text-5xl">Schedule</h1>
            </div>
            <div className="flex gap-2">
              {['Month', 'Week', 'Day'].map((option) => (
                <button key={option} type="button" onClick={() => setView(option)} className={`rounded-[8px] border px-4 py-2 text-sm font-semibold ${view === option ? 'border-[#242522] bg-[#242522] text-white' : 'border-[var(--border-hairline)] bg-white'}`}>{option}</button>
              ))}
            </div>
          </div>

          {status.type === 'error' && (
            <div className="mt-6 rounded-[10px] border border-[#9A4E3D]/20 bg-[#FFF7F4] px-4 py-3 text-sm text-[#9A4E3D]">{status.message}. Using the availability editor will require the API.</div>
          )}

          <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <section className="overflow-hidden rounded-[12px] border border-[var(--border-hairline)] bg-white">
              <div className="grid grid-cols-7 border-b border-[var(--border-hairline)]">
                {weekDates.map((date) => (
                  <div key={date.toISOString()} className="border-r border-[var(--border-hairline)] px-2 py-4 text-center last:border-r-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--ink-muted)]">{date.toLocaleDateString([], { weekday: 'short' })}</p>
                    <p className="mt-1 text-lg font-bold">{date.getDate()}</p>
                  </div>
                ))}
              </div>
              <div className="grid min-h-[430px] grid-cols-7">
                {weekDates.map((date, index) => {
                  const day = WEEKDAYS[index];
                  const windows = availability?.weekly?.[day] || [];
                  return (
                    <div key={date.toISOString()} className="relative border-r border-[var(--border-hairline)] p-2 last:border-r-0">
                      {windows.map((window, windowIndex) => (
                        <div key={`${window.start}-${windowIndex}`} className="mb-2 rounded-[7px] border border-[#A6B39A]/40 bg-[#EDF1E8] px-2 py-3 text-[11px] leading-tight">
                          <p className="font-bold text-[#52644F]">Available</p><p className="mt-1 text-[var(--ink-secondary)]">{window.start}–{window.end}</p>
                        </div>
                      ))}
                      {sessions.filter((session) => new Date(session.start).toDateString() === date.toDateString()).map((session) => (
                        <div key={session._id} className="mb-2 rounded-[7px] border border-[#8A694A]/30 bg-[#F4ECE2] px-2 py-3 text-[11px]">
                          <p className="font-bold">{new Date(session.start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
                          <p className="mt-1 text-[var(--ink-secondary)]">{session.clientName}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="space-y-6">
              <section className="rounded-[12px] border border-[var(--border-hairline)] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div><p className="text-xs font-bold uppercase tracking-wide text-[var(--ink-muted)]">Weekly availability</p><p className="mt-1 text-sm text-[var(--ink-secondary)]">{availability?.timezone || 'Asia/Kolkata'}</p></div>
                  <span className="rounded-full bg-[#EDF1E8] px-2.5 py-1 text-xs font-bold text-[#52644F]">Buffer {availability?.bufferMinutes ?? 15}m</span>
                </div>
                <div className="mt-5 space-y-3">
                  {WEEKDAYS.map((day) => (
                    <div key={day} className="border-t border-[var(--border-hairline)] pt-3">
                      <div className="flex items-center justify-between"><p className="text-sm font-bold capitalize">{day}</p><button type="button" onClick={() => addWindow(day)} className="text-xs font-bold text-[#52644F]">+ Add</button></div>
                      {(availability?.weekly?.[day] || []).length ? availability.weekly[day].map((window, index) => (
                        <div key={index} className="mt-2 flex items-center gap-2">
                          <input type="time" value={window.start} onChange={(event) => updateWindow(day, index, 'start', event.target.value)} className="h-9 min-w-0 flex-1 rounded-[7px] border border-[var(--border-hairline)] px-2 text-xs" />
                          <span className="text-xs">–</span>
                          <input type="time" value={window.end} onChange={(event) => updateWindow(day, index, 'end', event.target.value)} className="h-9 min-w-0 flex-1 rounded-[7px] border border-[var(--border-hairline)] px-2 text-xs" />
                          <button type="button" aria-label={`Remove ${day} window`} onClick={() => removeWindow(day, index)} className="grid h-9 w-7 place-items-center text-[var(--ink-muted)]">×</button>
                        </div>
                      )) : <p className="mt-2 text-xs text-[var(--ink-muted)]">Unavailable</p>}
                    </div>
                  ))}
                </div>
                <Button variant="dark" size="lg" className="mt-5 w-full" disabled={!availability || status.type === 'loading'} onClick={saveAvailability}>
                  {status.type === 'loading' ? 'Saving...' : 'Save availability'}
                </Button>
                {status.type === 'success' && <p className="mt-3 text-xs font-semibold text-[#52644F]">{status.message}</p>}
              </section>
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
