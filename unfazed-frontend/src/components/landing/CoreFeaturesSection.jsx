import Container from '../common/Container';
import Reveal from '../common/Reveal';
import Button from '../common/Button';

export default function CoreFeaturesSection() {
  return (
    <section id="product" className="bg-[#F8F7F3]">
      {/* Part A: Features 01 & 02 — Asymmetric Light Editorial Rows */}
      <div className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#52644F]">
                Core Capabilities
              </p>
              <h2 className="mt-3 text-[var(--text-section)] leading-[1.08] text-[var(--ink-primary)]">
                Every workflow of private practice, composed as one system.
              </h2>
            </div>
          </Reveal>

          {/* Feature 01: Branded Therapist Profile */}
          <div className="mt-16 grid grid-cols-1 items-center gap-10 border-t border-[#242522]/12 pt-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <span className="font-sans text-xs font-medium tracking-[0.18em] text-[#8B8982] tabular-nums">
                01 / BRANDED THERAPIST PROFILE
              </span>
              <h3 className="mt-3 text-2xl font-bold text-[var(--ink-primary)] md:text-3xl">
                A shareable link that reflects your clinical voice.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#4C4B46]">
                Publish a warm, credible page at your custom slug with your biography, clinical
                specializations, spoken languages, and session offerings—complete with clean Open
                Graph previews when shared on WhatsApp or LinkedIn.
              </p>
              <div className="mt-6">
                <Button to="/register" variant="secondary" size="sm">
                  Claim your practice slug
                </Button>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7">
              <div className="rounded-[12px] border border-[var(--border-hairline)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-[var(--bg-surface-alt)] text-sm font-bold text-[#3F6454]">MI</div>
                    <div>
                      <p className="text-lg font-bold">Dr. Meera Iyer</p>
                      <p className="mt-1 text-xs text-[var(--ink-muted)]">Clinical Psychologist · Bengaluru</p>
                    </div>
                  </div>
                  <a href="/dr-meera-iyer" className="rounded-[var(--radius-md)] border border-[var(--border-hairline-strong)] px-3 py-2 text-xs font-semibold hover:bg-[var(--bg-surface-alt)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F6454]">
                    Open profile
                  </a>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">Specializations</p>
                    <p className="mt-2 text-sm text-[var(--ink-secondary)]">CBT · Anxiety · Burnout</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">Languages</p>
                    <p className="mt-2 text-sm text-[var(--ink-secondary)]">English, Tamil, Hindi</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">Next available</p>
                    <p className="mt-2 text-sm font-semibold text-[#3F6454]">Thu, 4:30 PM</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Feature 02: Smart Appointment Scheduling */}
          <div className="mt-16 grid grid-cols-1 items-center gap-10 border-t border-[#242522]/12 pt-12 lg:grid-cols-12 lg:gap-14">
            <Reveal delay={80} className="order-2 lg:order-1 lg:col-span-7">
              <div className="rounded-[12px] border border-[var(--border-hairline)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
                  <div>
                    <p className="text-sm font-bold">November 18–24</p>
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">Asia/Kolkata · 15-min buffer</p>
                  </div>
                  <span className="rounded-[var(--radius-sm)] border border-[var(--border-hairline)] px-2 py-1 text-xs font-semibold">
                    60 min
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1">
                  {[
                    ['Mon', '18'], ['Tue', '19'], ['Wed', '20'], ['Thu', '21'], ['Fri', '22'], ['Sat', '23'], ['Sun', '24'],
                  ].map(([day, date], index) => (
                    <div key={day} className={`rounded-[var(--radius-md)] py-2 text-center ${index === 3 ? 'bg-[var(--ink-primary)] text-white' : 'border border-[var(--border-hairline)]'}`}>
                      <span className="block text-[9px] font-semibold uppercase">{day}</span>
                      <span className="mt-1 block text-xs font-bold tabular-nums">{date}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    ['10:30', 'Booked'],
                    ['11:30', 'Available'],
                    ['14:30', 'Available'],
                    ['17:00', 'Unavailable'],
                  ].map(([time, status]) => (
                    <div key={time} className={`rounded-[8px] border p-3 ${status === 'Available' ? 'border-[#3F6454]/35 bg-[#3F6454]/[0.06]' : 'border-[var(--border-hairline)] bg-[var(--bg-canvas)]'}`}>
                      <p className="text-xs font-bold tabular-nums">{time}</p>
                      <p className={`mt-1 text-[10px] font-semibold ${status === 'Available' ? 'text-[#3F6454]' : 'text-[var(--ink-muted)]'}`}>{status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2 lg:col-span-5">
              <span className="font-sans text-xs font-medium tracking-[0.18em] text-[#8B8982] tabular-nums">
                02 / SMART APPOINTMENT SCHEDULING
              </span>
              <h3 className="mt-3 text-2xl font-bold text-[var(--ink-primary)] md:text-3xl">
                Effortless availability across timezones, with zero double-booking.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#4C4B46]">
                Set recurring weekly hours, one-time overrides, blocked personal days, and automatic
                buffer windows between sessions. Clients see open 30, 45, 60, or 90-minute slots in
                their own timezone and lock them immediately on confirmation.
              </p>
              <div className="mt-6">
                <Button href="#experience" variant="secondary" size="sm">
                  Preview calendar view
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Part B: Features 03 & 04 — Contrasting Deep Charcoal Editorial Band */}
      <div id="security" className="bg-[#242522] py-20 text-[#F8F7F3] md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* 03: Client Management */}
            <Reveal className="lg:col-span-6">
              <div className="h-full rounded-[12px] border border-[#F8F7F3]/12 bg-[#2E302C] p-8 md:p-10">
                <span className="font-sans text-xs font-medium tracking-[0.18em] text-[#A6B39A] tabular-nums">
                  03 / CLIENT MANAGEMENT &amp; INTAKE
                </span>
                <h3 className="mt-3 text-2xl font-bold text-[#F8F7F3] md:text-3xl">
                  Every client record, intake form, and signed consent in one place.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#C5C3BA] md:text-base">
                  Filter clients by status or tags, review full session and payment history on one
                  profile, and collect demographics, presenting concerns, and auditable timestamped
                  digital consent before the very first session.
                </p>

                <div className="mt-8 space-y-3 border-t border-[#F8F7F3]/12 pt-6 text-xs">
                  <div className="flex items-center justify-between text-[#C5C3BA]">
                    <span>Intake Questionnaire</span>
                    <span className="rounded-[var(--radius-sm)] bg-[#A6B39A]/20 px-2 py-0.5 text-[#A6B39A]">
                      Completed before Session 1
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#C5C3BA]">
                    <span>Digital Consent Record</span>
                    <span className="font-mono text-[11px] text-[#F8F7F3]">
                      Auditable ISO Timestamp
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 04: Secure Clinical Documentation */}
            <Reveal delay={110} className="lg:col-span-6">
              <div className="h-full rounded-[12px] border border-[#F8F7F3]/12 bg-[#2E302C] p-8 md:p-10">
                <span className="font-sans text-xs font-medium tracking-[0.18em] text-[#A6B39A] tabular-nums">
                  04 / SECURE CLINICAL DOCUMENTATION
                </span>
                <h3 className="mt-3 text-2xl font-bold text-[#F8F7F3] md:text-3xl">
                  Rich-text clinical notes with API-enforced privacy boundaries.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#C5C3BA] md:text-base">
                  Author structured or freeform session notes with TipTap, marking each entry
                  explicitly as <code className="text-[#A6B39A]">private</code> or{' '}
                  <code className="text-[#A6B39A]">shared</code>. Client-facing routes enforce
                  visibility at the backend serializer level—private notes are never returned to
                  client portals.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[#F8F7F3]/12 pt-6 text-xs">
                  <div className="rounded-lg border border-[#F8F7F3]/12 bg-[#242522] p-3.5">
                    <p className="font-medium text-[#F8F7F3]">Private Note</p>
                    <p className="mt-1 text-[#8B8982]">Therapist-only API scope</p>
                  </div>
                  <div className="rounded-lg border border-[#A6B39A]/30 bg-[#52644F]/25 p-3.5">
                    <p className="font-medium text-[#F8F7F3]">Shared Summary</p>
                    <p className="mt-1 text-[#C5C3BA]">Visible in Client Portal</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Part C: Features 05, 06 & 07 — Clean 3-Column Architectural Band */}
      <div className="bg-[#F8F7F3] py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            <Reveal>
              <div className="border-t border-[#242522]/15 pt-6">
                <span className="font-sans text-xs font-medium tracking-[0.18em] text-[#8B8982] tabular-nums">
                  05 / PAYMENTS &amp; PACKAGES
                </span>
                <h3 className="mt-3 text-xl font-bold text-[var(--ink-primary)] md:text-2xl">
                  Advance Razorpay checkout &amp; multi-session packages.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4C4B46]">
                  Accept advance INR payments via Razorpay with webhook verification, offer 3, 6,
                  or 12-session care packages with expiry tracking, and issue GST-style PDF invoices
                  automatically.
                </p>
                <a
                  href="#experience"
                  className="mt-5 inline-block text-sm font-medium text-[#52644F] hover:text-[#242522]"
                >
                  Explore billing preview →
                </a>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="border-t border-[#242522]/15 pt-6">
                <span className="font-sans text-xs font-medium tracking-[0.18em] text-[#8B8982] tabular-nums">
                  06 / CLIENT COMMUNICATION
                </span>
                <h3 className="mt-3 text-xl font-bold text-[var(--ink-primary)] md:text-2xl">
                  Real-time practice chat &amp; event-driven reminders.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4C4B46]">
                  Keep client conversations inside an integrated Socket.IO portal instead of your
                  personal messaging apps, backed by booking confirmations, 24-hour reminders, and
                  post-session follow-ups.
                </p>
                <a
                  href="#experience"
                  className="mt-5 inline-block text-sm font-medium text-[#52644F] hover:text-[#242522]"
                >
                  See client portal flow →
                </a>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="border-t border-[#242522]/15 pt-6">
                <span className="font-sans text-xs font-medium tracking-[0.18em] text-[#8B8982] tabular-nums">
                  07 / PRACTICE ANALYTICS
                </span>
                <h3 className="mt-3 text-xl font-bold text-[var(--ink-primary)] md:text-2xl">
                  True revenue, retention &amp; no-show insights.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4C4B46]">
                  Track monthly revenue trends, active client counts, and no-show rates computed
                  directly via server-side MongoDB aggregation pipelines—so you understand practice
                  health at a glance.
                </p>
                <a
                  href="#experience"
                  className="mt-5 inline-block text-sm font-medium text-[#52644F] hover:text-[#242522]"
                >
                  View analytics preview →
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
