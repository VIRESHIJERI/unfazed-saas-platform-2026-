import Container from '../common/Container';
import Reveal from '../common/Reveal';
import Button from '../common/Button';

export default function PlatformIntroSection() {
  return (
    <section id="intro" className="bg-[#F0EEE7] py-20 md:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="rounded-[12px] border border-[var(--border-hairline)] bg-white p-5 shadow-[var(--shadow-soft)]">
              <div className="grid grid-cols-12 gap-3 border-b border-[var(--border-hairline)] pb-4">
                <div className="col-span-4 rounded-[10px] bg-[var(--bg-surface-alt)] p-3">
                  <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Today</p>
                  <p className="mt-2 text-xl font-bold tabular-nums">4</p>
                </div>
                <div className="col-span-4 rounded-[10px] border border-[var(--border-hairline)] p-3">
                  <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Clients</p>
                  <p className="mt-2 text-xl font-bold tabular-nums">18</p>
                </div>
                <div className="col-span-4 rounded-[10px] border border-[var(--border-hairline)] p-3">
                  <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">Revenue</p>
                  <p className="mt-2 text-xl font-bold tabular-nums">₹72k</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  ['10:30', 'Aarav S.', 'Intake complete'],
                  ['12:00', 'Neha R.', 'Payment received'],
                  ['16:00', 'Vikram M.', 'Confirmed'],
                ].map(([time, name, status]) => (
                  <div key={time} className="grid grid-cols-12 items-center gap-3 rounded-[8px] border border-[var(--border-hairline)] px-3 py-3 text-xs">
                    <span className="col-span-2 font-semibold tabular-nums">{time}</span>
                    <span className="col-span-5 font-medium">{name}</span>
                    <span className="col-span-5 text-right text-[var(--ink-muted)]">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#52644F]">
              Why UNFAZZED
            </p>
            <h2 className="mt-4 text-[var(--text-section)] leading-[1.08] text-[var(--ink-primary)]">
              A practice that works as beautifully as you do.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#4C4B46] md:text-lg">
              Most therapists piece together their day across generic calendar links, manual bank
              transfers, scattered spreadsheets, and unencrypted chat threads. UNFAZZED replaces that
              quiet operational tax with one coherent rhythm.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#4C4B46]">
              From the moment a client opens your branded URL to intake, Razorpay checkout,
              confidential clinical notes, and multi-session packages, every workflow feels calm,
              intentional, and respectful of the therapeutic relationship.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 border-t border-[#242522]/12 pt-7 sm:grid-cols-2">
              <div>
                <h3 className="font-sans text-sm font-semibold text-[#242522]">
                  Designed for Indian workflows
                </h3>
                <p className="mt-1.5 text-sm text-[#4C4B46]">
                  INR session &amp; package pricing, GST-ready PDF invoices, and IST-first slot
                  conversion for NRI or cross-city clients.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-[#242522]">
                  Zero clinical clutter
                </h3>
                <p className="mt-1.5 text-sm text-[#4C4B46]">
                  Warm editorial surfaces for clients paired with a quiet, structured workspace for
                  your clinical day.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Button href="#product" variant="dark" size="md">
                See all capabilities
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
