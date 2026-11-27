import { useState } from 'react';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import { BrandLogo } from '../common/BrandLogo';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'clients', label: 'Clients' },
  { id: 'notes', label: 'Session Notes' },
  { id: 'payments', label: 'Payments' },
  { id: 'analytics', label: 'Analytics' },
];

export default function ProductExperienceSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDay, setSelectedDay] = useState('Thu');
  const [weekOffset, setWeekOffset] = useState(0);
  const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weekStart = 18 + weekOffset * 7;

  return (
    <section id="experience" className="bg-[#F0EEE7] py-20 md:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#52644F]">
                Product Experience
              </p>
              <h2 className="mt-3 text-[var(--text-section)] leading-[1.08] text-[var(--ink-primary)]">
                Inside the therapist workspace.
              </h2>
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-[#67655E]">
              Interactive Preview · Illustrative Sample Data
            </p>
          </div>
        </Reveal>

        {/* Interactive Dashboard Shell */}
        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-[12px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[var(--shadow-frame)]">
            {/* Top Workspace Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242522]/10 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <BrandLogo variant="icon" className="h-8 w-8" />
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#242522]">
                  UNFAZZED Workspace
                </span>
                <span className="hidden text-xs text-[#8B8982] sm:inline">
                  / Dr. Meera Iyer (Demo)
                </span>
              </div>

              {/* Section Switcher Tabs */}
              <div
                className="flex flex-wrap gap-1.5"
                role="tablist"
                aria-label="UNFAZZED Workspace Views"
              >
                {TABS.map((tab) => {
                  const selected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveTab(tab.id)}
                      className={`rounded-[var(--radius-md)] px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#242522] text-[#F8F7F3]'
                          : 'bg-[#F0EEE7] text-[#4C4B46] hover:bg-[#242522]/10 hover:text-[#242522]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Sidebar Mirror */}
              <aside className="hidden border-r border-[#242522]/10 bg-[#F0EEE7]/65 p-5 lg:col-span-3 lg:block">
                <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8B8982]">
                  Practice Menu
                </p>
                <ul className="mt-3 space-y-1">
                  {TABS.map((tab) => (
                    <li key={tab.id}>
                      <button
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                          activeTab === tab.id
                            ? 'bg-white font-medium text-[#242522] shadow-xs'
                            : 'text-[#4C4B46] hover:bg-white/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <span className="block px-3 py-2 text-sm text-[#8B8982]">Settings</span>
                  </li>
                </ul>

                <div className="mt-8 rounded-xl border border-[#242522]/10 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-wider text-[#67655E]">
                    Public Link
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#52644F]">
                    unfazed.in/dr-meera-iyer
                  </p>
                </div>
              </aside>

              {/* Main View Panel */}
              <div className="min-h-[390px] bg-[#F8F7F3] p-6 md:p-8 lg:col-span-9">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--ink-primary)]">
                          Good morning, Dr. Iyer
                        </h3>
                        <p className="text-xs text-[#67655E]">
                          Illustrative daily overview · IST (Asia/Kolkata)
                        </p>
                      </div>
                      <span className="rounded-[var(--radius-md)] bg-[#3F6454] px-3 py-2 text-xs font-semibold text-white">
                        + Share booking link
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {[
                        { label: "Today's Sessions", value: '4' },
                        { label: 'Active Clients', value: '18' },
                        { label: 'Package Renewals', value: '3 due' },
                        { label: 'Month Net Revenue', value: '₹72,400' },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl border border-[#242522]/10 bg-white p-4"
                        >
                          <p className="text-[11px] uppercase tracking-wider text-[#67655E]">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-xl font-bold text-[var(--ink-primary)] tabular-nums">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl border border-[#242522]/10 bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#67655E]">
                        Upcoming Today
                      </p>
                      <div className="mt-3 divide-y divide-[#242522]/8 text-sm">
                        {[
                          { time: '10:30 AM', client: 'Aarav S.', type: '60 min · Individual CBT', status: 'Intake & Consent Signed' },
                          { time: '12:00 PM', client: 'Neha R.', type: '45 min · Follow-up (6-pack 4/6)', status: 'Paid via Razorpay' },
                          { time: '04:00 PM', client: 'Vikram M.', type: '60 min · Initial Consultation', status: 'Confirmed' },
                        ].map((row) => (
                          <div
                            key={row.time}
                            className="flex flex-wrap items-center justify-between gap-2 py-3"
                          >
                            <div className="flex items-center gap-4">
                              <span className="font-medium text-[#242522] tabular-nums">{row.time}</span>
                              <span className="font-medium text-[#242522]">{row.client}</span>
                              <span className="text-xs text-[#67655E]">{row.type}</span>
                            </div>
                            <span className="rounded-[var(--radius-sm)] bg-[#A6B39A]/25 px-2 py-0.5 text-[11px] font-semibold text-[#41503E]">
                              {row.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'calendar' && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-2xl text-[var(--ink-primary)]">Calendar & availability</h3>
                        <p className="mt-1 text-xs text-[var(--ink-muted)]">
                          November {weekStart}–{weekStart + 6} · Asia/Kolkata (IST)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setWeekOffset((value) => value - 1)} aria-label="Previous week" className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-hairline)] hover:bg-[var(--bg-surface-alt)]">←</button>
                        <button type="button" onClick={() => setWeekOffset(0)} className="h-9 rounded-[var(--radius-md)] border border-[var(--border-hairline)] px-3 text-xs font-semibold hover:bg-[var(--bg-surface-alt)]">Today</button>
                        <button type="button" onClick={() => setWeekOffset((value) => value + 1)} aria-label="Next week" className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-hairline)] hover:bg-[var(--bg-surface-alt)]">→</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 border-y border-[var(--border-hairline)] py-2">
                      {WEEK_LABELS.map((day, index) => (
                        <button
                          type="button"
                          key={day}
                          onClick={() => setSelectedDay(day)}
                          aria-pressed={selectedDay === day}
                          className={`rounded-[var(--radius-md)] px-1 py-2 text-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3F6454] ${
                            selectedDay === day ? 'bg-[var(--ink-primary)] text-white' : 'hover:bg-[var(--bg-surface-alt)]'
                          }`}
                        >
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.08em]">{day}</span>
                          <span className="mt-1 block text-sm font-bold tabular-nums">{weekStart + index}</span>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        { time: '10:30 AM', status: 'Booked', detail: 'Aarav S. · 60 min', tone: 'border-[var(--border-hairline)] bg-[var(--bg-surface-alt)]' },
                        { time: '11:30 AM', status: 'Available', detail: '60 min session', tone: 'border-[#3F6454]/35 bg-[#3F6454]/[0.06]' },
                        { time: '1:00 PM', status: 'Buffer', detail: 'Unavailable', tone: 'border-[var(--border-hairline)] bg-white opacity-60' },
                        { time: '2:30 PM', status: 'Available', detail: '45 min session', tone: 'border-[#3F6454]/35 bg-[#3F6454]/[0.06]' },
                        { time: '4:00 PM', status: 'Booked', detail: 'Neha R. · 45 min', tone: 'border-[var(--border-hairline)] bg-[var(--bg-surface-alt)]' },
                        { time: '5:30 PM', status: 'Unavailable', detail: 'Outside hours', tone: 'border-[var(--border-hairline)] bg-white opacity-60' },
                      ].map((slot) => (
                        <button
                          type="button"
                          key={slot.time}
                          disabled={slot.status !== 'Available'}
                          className={`min-h-24 rounded-[10px] border p-4 text-left ${slot.tone} ${slot.status === 'Available' ? 'cursor-pointer hover:border-[#3F6454] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F6454]' : 'cursor-not-allowed'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold tabular-nums">{slot.time}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-[0.08em] ${slot.status === 'Available' ? 'text-[#3F6454]' : 'text-[var(--ink-muted)]'}`}>{slot.status}</span>
                          </div>
                          <p className="mt-3 text-xs text-[var(--ink-secondary)]">{slot.detail}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'clients' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--ink-primary)]">Client Directory</h3>
                      <p className="text-xs text-[#67655E]">
                        Filterable CRM with intake completion, digital consent timestamps, and tags
                      </p>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-[#242522]/10 bg-white">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b border-[#242522]/10 text-[11px] uppercase tracking-wider text-[#67655E]">
                          <tr>
                            <th className="px-4 py-3 font-medium">Client</th>
                            <th className="px-4 py-3 font-medium">Last Session</th>
                            <th className="px-4 py-3 font-medium">Tags</th>
                            <th className="px-4 py-3 font-medium">Consent</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#242522]/8">
                          {[
                            { name: 'Aarav Sharma', last: '2 days ago', tag: 'CBT · Anxiety', consent: 'Signed · Oct 12' },
                            { name: 'Neha Rao', last: 'Last week', tag: '6-Session Pack', consent: 'Signed · Sep 04' },
                            { name: 'Vikram Menon', last: 'New intake', tag: 'Consultation', consent: 'Signed · Today' },
                          ].map((c) => (
                            <tr key={c.name}>
                              <td className="px-4 py-3 font-medium text-[#242522]">{c.name}</td>
                              <td className="px-4 py-3 text-[#4C4B46]">{c.last}</td>
                              <td className="px-4 py-3">
                                <span className="rounded-[var(--radius-sm)] bg-[var(--bg-surface-alt)] px-2 py-0.5 text-xs text-[var(--ink-secondary)]">
                                  {c.tag}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs font-medium text-[#52644F]">{c.consent}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--ink-primary)]">
                          Session Documentation
                        </h3>
                        <p className="text-xs text-[#67655E]">
                          TipTap rich-text editor with backend-enforced private/shared separation
                        </p>
                      </div>
                      <span className="rounded-[var(--radius-md)] bg-[var(--ink-primary)] px-3 py-1 text-xs font-semibold text-white">
                        Private vs. Shared Scope
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-[#242522]/15 bg-white p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#242522]">
                            type: &quot;private&quot;
                          </span>
                          <span className="rounded-[var(--radius-sm)] bg-[var(--ink-primary)] px-2 py-0.5 text-[11px] text-white">
                            Therapist Only
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-[#4C4B46]">
                          Clinical observations, hypothesis tracking, and session reflection.
                          Strictly excluded from every client portal API response.
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#52644F]/30 bg-white p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#52644F]">
                            type: &quot;shared&quot;
                          </span>
                          <span className="rounded-[var(--radius-sm)] bg-[#A6B39A]/25 px-2 py-0.5 text-[11px] text-[#41503E]">
                            Client Portal Visible
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-[#4C4B46]">
                          Grounding exercises, session takeaways, and agreed weekly reflection
                          prompts shared intentionally with the client.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--ink-primary)]">
                        Payments, Packages &amp; GST Invoices
                      </h3>
                      <p className="text-xs text-[#67655E]">
                        Webhook-verified Razorpay transactions and 3 / 6 / 12-session care packages
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {[
                        { title: 'Single Session', price: '₹1,800', meta: 'Advance payment at booking' },
                        { title: '6-Session Care Pack', price: '₹9,600', meta: '₹1,600 / session · 90-day expiry' },
                        { title: '12-Session Care Pack', price: '₹18,000', meta: '₹1,500 / session · 180-day expiry' },
                      ].map((pkg) => (
                        <div key={pkg.title} className="rounded-xl border border-[#242522]/10 bg-white p-5">
                          <p className="text-xs uppercase tracking-wider text-[#67655E]">{pkg.title}</p>
                          <p className="mt-2 text-2xl font-bold text-[var(--ink-primary)] tabular-nums">
                            {pkg.price}
                          </p>
                          <p className="mt-2 text-xs text-[#4C4B46]">{pkg.meta}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--ink-primary)]">
                        Practice Analytics
                      </h3>
                      <p className="text-xs text-[#67655E]">
                        Server-side MongoDB aggregation pipelines for revenue, active clients, and
                        attendance
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#242522]/10 bg-white p-5">
                      <p className="text-xs uppercase tracking-wider text-[#67655E]">
                        Illustrative Monthly Session Revenue Trend
                      </p>
                      <div className="mt-6 flex h-36 items-end gap-4">
                        {[
                          { month: 'Jun', h: 'h-16' },
                          { month: 'Jul', h: 'h-20' },
                          { month: 'Aug', h: 'h-24' },
                          { month: 'Sep', h: 'h-28' },
                          { month: 'Oct', h: 'h-24' },
                          { month: 'Nov', h: 'h-32' },
                        ].map((bar) => (
                          <div key={bar.month} className="flex flex-1 flex-col items-center gap-2">
                            <div className={`w-full max-w-[44px] rounded-t-md bg-[#52644F] ${bar.h}`} />
                            <span className="text-[11px] text-[#67655E]">{bar.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
