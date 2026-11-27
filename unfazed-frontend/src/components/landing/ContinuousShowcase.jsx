import Container from '../common/Container';

const SHOWCASE_ITEMS = [
  { number: '01', title: 'Appointments', detail: 'Calendar and availability', tone: 'bg-[#E8EEE9]' },
  { number: '02', title: 'Client records', detail: 'Intake and session history', tone: 'bg-[#ECEAE4]' },
  { number: '03', title: 'Clinical notes', detail: 'Private and shared context', tone: 'bg-[#E7EAED]' },
  { number: '04', title: 'Payments', detail: 'Packages and invoices', tone: 'bg-[#EFE8E1]' },
  { number: '05', title: 'Practice analytics', detail: 'Revenue and retention views', tone: 'bg-[#E5EBE6]' },
  { number: '06', title: 'Public profiles', detail: 'A branded therapist link', tone: 'bg-[#EEE8E4]' },
];

function ShowcaseCard({ item }) {
  return (
    <article className="showcase-card w-[300px] shrink-0 md:w-[360px]" aria-label={item.title}>
      <div className={`relative h-[220px] overflow-hidden border border-[var(--border-hairline)] ${item.tone}`}>
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.12em] text-[var(--ink-muted)]">{item.number}</span>
          <span className="h-px w-8 bg-[var(--ink-muted)]/40" />
        </div>
        <div className="absolute bottom-5 left-5 right-5 border-t border-[var(--ink-primary)]/15 pt-4">
          <p className="text-lg font-bold tracking-[-0.02em] text-[var(--ink-primary)]">{item.title}</p>
          <p className="mt-1 text-xs text-[var(--ink-secondary)]">{item.detail}</p>
        </div>

        {item.number === '01' && (
          <div className="absolute right-5 top-12 grid grid-cols-3 gap-1.5">
            {[...Array(9)].map((_, index) => (
              <span key={index} className={`h-7 w-7 rounded-[4px] border ${index === 5 ? 'border-[#3F6454] bg-[#3F6454]' : 'border-[var(--border-hairline)] bg-white/75'}`} />
            ))}
          </div>
        )}

        {item.number === '02' && (
          <div className="absolute right-5 top-14 w-[150px] space-y-2">
            {[70, 100, 82].map((width) => (
              <div key={width} className="h-8 rounded-[4px] border border-[var(--border-hairline)] bg-white/75 p-2">
                <span className="block h-1.5 rounded-sm bg-[var(--ink-muted)]/30" style={{ width: `${width}%` }} />
              </div>
            ))}
          </div>
        )}

        {item.number === '03' && (
          <div className="absolute right-5 top-12 grid grid-cols-2 gap-2">
            <div className="h-24 w-16 rounded-[4px] border border-[var(--border-hairline)] bg-white/75 p-2">
              <span className="block h-1.5 bg-[var(--ink-primary)]/25" />
              <span className="mt-2 block h-1.5 w-3/4 bg-[var(--ink-primary)]/15" />
            </div>
            <div className="h-24 w-16 rounded-[4px] border border-[#3F6454]/30 bg-[#3F6454]/10 p-2">
              <span className="block h-1.5 bg-[#3F6454]/30" />
              <span className="mt-2 block h-1.5 w-3/4 bg-[#3F6454]/20" />
            </div>
          </div>
        )}

        {item.number === '04' && (
          <div className="absolute right-5 top-14 w-[140px] rounded-[4px] border border-[var(--border-hairline)] bg-white/80 p-4">
            <span className="text-[10px] text-[var(--ink-muted)]">Package</span>
            <p className="mt-2 text-xl font-bold text-[var(--ink-primary)]">₹9,600</p>
            <span className="mt-3 block h-1.5 w-full bg-[#3F6454]/20" />
          </div>
        )}

        {item.number === '05' && (
          <div className="absolute right-5 top-12 flex h-24 items-end gap-2">
            {[42, 58, 48, 78, 68, 92].map((height, index) => (
              <span
                key={index}
                className="w-3 rounded-t-[3px] bg-[#3F6454]"
                style={{ height: `${height}%`, opacity: 0.35 + index * 0.09 }}
              />
            ))}
          </div>
        )}

        {item.number === '06' && (
          <div className="absolute right-5 top-10 w-[150px] rounded-[4px] border border-[var(--border-hairline)] bg-white/85 p-3">
            <span className="block h-6 w-6 rounded-[4px] bg-[var(--bg-surface-alt)]" />
            <span className="mt-3 block h-2 w-24 rounded-sm bg-[var(--ink-primary)]/25" />
            <span className="mt-2 block h-1.5 w-28 rounded-sm bg-[var(--ink-primary)]/10" />
          </div>
        )}
      </div>
    </article>
  );
}

export default function ContinuousShowcase() {
  const items = [...SHOWCASE_ITEMS, ...SHOWCASE_ITEMS];

  return (
    <section className="overflow-hidden border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16 md:py-24" aria-labelledby="showcase-heading">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3F6454]">
              One connected practice
            </p>
            <h2 id="showcase-heading" className="mt-3 max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-[var(--ink-primary)] md:text-5xl">
              Every workflow, in view.
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-6 text-[var(--ink-muted)] md:block">
            Explore the coordinated areas designed for a modern independent practice.
          </p>
        </div>
      </Container>

      <div className="showcase-viewport mt-10 md:mt-14">
        <div className="showcase-track flex w-max gap-4 px-4 md:gap-5 md:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
          {items.map((item, index) => (
            <ShowcaseCard key={`${item.number}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
