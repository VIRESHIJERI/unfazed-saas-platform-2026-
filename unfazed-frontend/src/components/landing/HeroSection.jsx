import Container from '../common/Container';
import Button from '../common/Button';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-canvas)] pt-14 pb-16 md:pt-20 md:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#3F6454]">
              <span className="h-2 w-2 rounded-sm bg-[#3F6454]" aria-hidden="true" />
              Practice management for therapists
            </p>
            <h1 className="text-[var(--text-hero)] leading-[1.04] text-[var(--ink-primary)]">
              One place to manage your practice.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--ink-secondary)] md:text-lg">
              Organize public profiles, appointments, client records, payments, and clinical
              documentation without adding operational noise.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button to="/register" variant="dark" size="lg">
                Start your practice
              </Button>
              <Button href="#experience" variant="secondary" size="lg">
                View workspace
              </Button>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--border-hairline)] pt-5">
              <div>
                <dt className="text-xs text-[var(--ink-muted)]">Profiles</dt>
                <dd className="mt-1 text-sm font-semibold">Branded</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--ink-muted)]">Scheduling</dt>
                <dd className="mt-1 text-sm font-semibold">IST-aware</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--ink-muted)]">Documentation</dt>
                <dd className="mt-1 text-sm font-semibold">Private</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[12px] border border-[var(--border-hairline)] bg-white shadow-[var(--shadow-frame)]">
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-[#3F6454]" />
                  <span className="text-xs font-bold uppercase tracking-[0.12em]">Practice overview</span>
                </div>
                <span className="text-xs text-[var(--ink-muted)]">Thu, 21 Nov · IST</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12">
                <aside className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface-alt)] p-4 md:col-span-3 md:border-b-0 md:border-r">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ink-muted)]">Workspace</p>
                  {['Overview', 'Calendar', 'Clients', 'Notes', 'Payments'].map((item, index) => (
                    <div key={item} className={`mt-2 rounded-[var(--radius-md)] px-3 py-2 text-xs ${index === 0 ? 'bg-white font-semibold text-[var(--ink-primary)]' : 'text-[var(--ink-secondary)]'}`}>
                      {item}
                    </div>
                  ))}
                </aside>
                <div className="p-5 md:col-span-9">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[['Sessions', '4'], ['Active clients', '18'], ['Renewals', '3'], ['Net revenue', '₹72.4k']].map(([label, value]) => (
                      <div key={label} className="rounded-[10px] border border-[var(--border-hairline)] p-3">
                        <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">{label}</p>
                        <p className="mt-2 text-lg font-bold tabular-nums">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[10px] border border-[var(--border-hairline)]">
                    <div className="border-b border-[var(--border-hairline)] px-4 py-3 text-xs font-bold">Upcoming today</div>
                    {[
                      ['10:30', 'Aarav S.', '60 min'],
                      ['12:00', 'Neha R.', '45 min'],
                      ['16:00', 'Vikram M.', '60 min'],
                    ].map(([time, client, duration]) => (
                      <div key={time} className="grid grid-cols-3 items-center gap-3 border-b border-[var(--border-hairline)] px-4 py-3 text-xs last:border-b-0">
                        <span className="font-semibold tabular-nums">{time}</span>
                        <span>{client}</span>
                        <span className="text-right text-[var(--ink-muted)]">{duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
