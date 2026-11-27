import Container from '../common/Container';
import Reveal from '../common/Reveal';

const cards = [
  {
    eyebrow: '01 / Public presence',
    title: 'A profile that is ready to share.',
    description: 'Present credentials, specialties, languages and session details through a clear branded practice page.',
    size: 'lg',
  },
  {
    eyebrow: '02 / Scheduling',
    title: 'Make time visible.',
    description: 'Use availability, durations and timezone context to help clients choose without back-and-forth.',
    size: 'sm',
  },
  {
    eyebrow: '03 / Practice operations',
    title: 'Keep the details in context.',
    description: 'Bring client records, intake, packages and notes into a single organized practice view.',
    size: 'sm',
  },
];

export default function ProductDiscovery() {
  return (
    <section id="product-discovery" className="bg-white py-20 md:py-28" aria-labelledby="discovery-heading">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3F6454]">
                Discover UNFAZZED
              </p>
              <h2 id="discovery-heading" className="mt-4 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-[var(--ink-primary)] md:text-6xl">
                Built around the full practice experience.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[var(--ink-secondary)] lg:col-span-4 lg:col-start-9">
              Move from a public profile to a scheduled session, organized record and confident follow-up
              without switching systems.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <a
              href="/dr-meera-iyer"
              className="group block border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5 transition-colors duration-200 hover:border-[var(--border-hairline-strong)] md:p-7"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                  {cards[0].eyebrow}
                </p>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
              <h3 className="mt-8 max-w-lg text-3xl font-bold leading-[1.08] tracking-[-0.035em] md:text-4xl">
                {cards[0].title}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--ink-secondary)]">
                {cards[0].description}
              </p>

              <div className="mt-10 overflow-hidden border border-[var(--border-hairline)] bg-white">
                <div className="grid grid-cols-12 border-b border-[var(--border-hairline)]">
                  <div className="col-span-8 px-5 py-4">
                    <p className="text-sm font-bold">Dr. Meera Iyer</p>
                    <p className="mt-1 text-[11px] text-[var(--ink-muted)]">Clinical Psychologist · Bengaluru</p>
                  </div>
                  <div className="col-span-4 border-l border-[var(--border-hairline)] p-3">
                    <span className="block rounded-[4px] bg-[var(--ink-primary)] px-3 py-2 text-center text-[10px] font-bold text-white">View times</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-5">
                  <div className="col-span-4">
                    <div className="aspect-[4/5] rounded-[4px] bg-[var(--bg-surface-alt)] p-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[var(--border-hairline)] bg-white text-xs font-bold text-[#3F6454]">MI</span>
                    </div>
                  </div>
                  <div className="col-span-8 pt-1">
                    <span className="block h-2 w-24 rounded-sm bg-[var(--ink-primary)]/20" />
                    <span className="mt-3 block h-1.5 w-full rounded-sm bg-[var(--ink-primary)]/10" />
                    <span className="mt-2 block h-1.5 w-11/12 rounded-sm bg-[var(--ink-primary)]/10" />
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <span className="border-l-2 border-[#A6B39A] pl-2 text-[10px] text-[var(--ink-muted)]">CBT</span>
                      <span className="border-l-2 border-[#A6B39A] pl-2 text-[10px] text-[var(--ink-muted)]">Anxiety</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-5">
            <a
              href="#experience"
              className="group block h-full border border-[var(--border-hairline)] bg-[#EEF1ED] p-5 transition-colors duration-200 hover:border-[var(--border-hairline-strong)] md:p-7"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                  {cards[1].eyebrow}
                </p>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </div>
              <h3 className="mt-8 max-w-md text-3xl font-bold leading-[1.08] tracking-[-0.035em] md:text-4xl">
                {cards[1].title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--ink-secondary)]">
                {cards[1].description}
              </p>

              <div className="mt-10 border border-[var(--border-hairline)] bg-white p-4">
                <div className="grid grid-cols-7 border-b border-[var(--border-hairline)] pb-3">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <span key={`${day}-${index}`} className={`text-center text-[10px] font-bold ${index === 3 ? 'text-[#3F6454]' : 'text-[var(--ink-muted)]'}`}>{day}</span>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[
                    ['10:30', 'Booked'],
                    ['11:30', 'Available'],
                    ['14:30', 'Available'],
                    ['17:00', 'Unavailable'],
                  ].map(([time, status]) => (
                    <div key={time} className={`rounded-[4px] border p-3 ${status === 'Available' ? 'border-[#3F6454]/30 bg-[#3F6454]/[0.06]' : 'border-[var(--border-hairline)]'}`}>
                      <p className="text-xs font-bold tabular-nums">{time}</p>
                      <p className="mt-1 text-[9px] font-semibold text-[var(--ink-muted)]">{status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>

          <Reveal className="lg:col-span-12">
            <a
              href="#experience"
              className="group grid grid-cols-1 border border-[var(--border-hairline)] bg-[var(--bg-surface-alt)] transition-colors duration-200 hover:border-[var(--border-hairline-strong)] md:grid-cols-12"
            >
              <div className="p-5 md:col-span-5 md:p-7">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                    {cards[2].eyebrow}
                  </p>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
                <h3 className="mt-8 max-w-md text-3xl font-bold leading-[1.08] tracking-[-0.035em] md:text-4xl">
                  {cards[2].title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--ink-secondary)]">
                  {cards[2].description}
                </p>
              </div>

              <div className="border-t border-[var(--border-hairline)] p-5 md:col-span-7 md:border-l md:border-t-0 md:p-7">
                <div className="overflow-hidden border border-[var(--border-hairline)] bg-white">
                  <div className="grid grid-cols-12 border-b border-[var(--border-hairline)] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                    <span className="col-span-4 px-4 py-3">Client</span>
                    <span className="col-span-4 px-4 py-3">Status</span>
                    <span className="col-span-4 px-4 py-3">Next action</span>
                  </div>
                  {[
                    ['Aarav S.', 'Intake complete', 'Session note'],
                    ['Neha R.', 'Package active', 'Renewal review'],
                    ['Vikram M.', 'Consultation', 'Confirm session'],
                  ].map((row) => (
                    <div key={row[0]} className="grid grid-cols-12 border-b border-[var(--border-hairline)] text-xs last:border-b-0">
                      {row.map((value, index) => (
                        <span key={value} className={`col-span-4 px-4 py-4 ${index === 0 ? 'font-bold' : 'text-[var(--ink-secondary)]'}`}>{value}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
