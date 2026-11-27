import Container from '../common/Container';

export default function AnnouncementStrip() {
  return (
    <aside
      className="border-y border-[var(--border-hairline)] bg-[var(--bg-surface-alt)]"
      aria-label="Platform preview announcement"
    >
      <Container>
        <a
          href="#experience"
          className="group flex min-h-[76px] items-center justify-between gap-6 py-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#3F6454]"
        >
          <div className="flex min-w-0 items-baseline gap-4 md:gap-6">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-[#3F6454]">
              Platform preview
            </span>
            <span className="truncate text-sm font-semibold text-[var(--ink-primary)] md:text-base">
              Explore appointments, clients, notes and practice analytics
            </span>
          </div>
          <span
            aria-hidden="true"
            className="shrink-0 text-lg transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </Container>
    </aside>
  );
}
