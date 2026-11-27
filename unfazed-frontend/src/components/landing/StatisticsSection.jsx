import { useEffect, useRef, useState } from 'react';
import Container from '../common/Container';

function AnimatedMetric({ value, prefix = '', suffix = '', decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let started = false;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;

      const startedAt = performance.now();
      const duration = 900;
      const update = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }, { threshold: 0.35 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  const formatted = display.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function StatisticsSection() {
  return (
    <section className="border-b border-[var(--border-hairline)] bg-white py-12 md:py-16" aria-labelledby="demo-metrics-heading">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3F6454]">
              Illustrative workspace
            </p>
            <h2 id="demo-metrics-heading" className="mt-3 text-2xl font-bold leading-tight tracking-[-0.03em] text-[var(--ink-primary)]">
              A clear view of the practice day.
            </h2>
          </div>

          <dl className="grid grid-cols-1 border-t border-[var(--border-hairline)] lg:col-span-9 lg:grid-cols-3 lg:border-l lg:border-t-0">
            <div className="border-b border-[var(--border-hairline)] py-5 lg:border-b-0 lg:border-r lg:px-8">
              <dt className="text-xs font-medium text-[var(--ink-muted)]">Sessions today</dt>
              <dd className="mt-2 text-4xl font-bold tracking-[-0.04em] text-[var(--ink-primary)] md:text-5xl">
                <AnimatedMetric value={4} />
              </dd>
              <p className="mt-2 text-[11px] text-[var(--ink-muted)]">Demo data</p>
            </div>

            <div className="border-b border-[var(--border-hairline)] py-5 lg:border-b-0 lg:border-r lg:px-8">
              <dt className="text-xs font-medium text-[var(--ink-muted)]">Active clients</dt>
              <dd className="mt-2 text-4xl font-bold tracking-[-0.04em] text-[var(--ink-primary)] md:text-5xl">
                <AnimatedMetric value={18} />
              </dd>
              <p className="mt-2 text-[11px] text-[var(--ink-muted)]">Illustrative caseload</p>
            </div>

            <div className="py-5 lg:px-8">
              <dt className="text-xs font-medium text-[var(--ink-muted)]">Monthly net revenue</dt>
              <dd className="mt-2 text-4xl font-bold tracking-[-0.04em] text-[var(--ink-primary)] md:text-5xl">
                <AnimatedMetric value={72400} prefix="₹" />
              </dd>
              <p className="mt-2 text-[11px] text-[var(--ink-muted)]">Illustrative INR total</p>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
