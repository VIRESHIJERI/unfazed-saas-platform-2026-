import { useEffect, useRef } from 'react';
import Container from '../common/Container';
import Button from '../common/Button';
import Reveal from '../common/Reveal';

export default function HeroSection() {
  const visualRef = useRef(null);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = visual.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - rect.top) / window.innerHeight));
        visual.style.setProperty('--hero-parallax', `${progress * 10}px`);
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateParallax);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg-canvas)] pb-20 pt-16 md:pb-28 md:pt-24 lg:min-h-[calc(100vh-72px)] lg:pt-20">
      <Container>
        <div className="grid min-h-[calc(100vh-150px)] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:pr-4">
            <Reveal>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-[#3F6454]">
                Practice management, thoughtfully composed
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-[680px] text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.94] tracking-[-0.065em] text-[var(--ink-primary)]">
                Transform the way you manage care.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-[520px] text-base leading-7 text-[var(--ink-secondary)] md:text-lg md:leading-8">
                One intelligent platform to simplify practice operations, empower healthcare
                professionals and create better patient experiences.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button to="/register" variant="dark" size="lg" className="group px-6">
                  Get Started
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Button>
                <Button href="#experience" variant="ghost" size="lg" className="border-b border-[var(--ink-primary)] rounded-none px-1">
                  Explore Platform
                </Button>
              </div>
            </Reveal>
          </div>

          <div ref={visualRef} className="relative lg:col-span-7">
            <Reveal delay={140} className="relative">
              <div
                className="hero-photo relative ml-auto min-h-[480px] overflow-hidden rounded-[4px] bg-[var(--bg-surface-alt)] md:min-h-[620px] lg:h-[680px]"
                style={{ transform: 'translateY(var(--hero-parallax, 0px))' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=88"
                  alt="Healthcare professional reviewing care information"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(31,41,37,0.12),transparent_55%)]" />
              </div>
            </Reveal>

            <Reveal delay={300} className="absolute bottom-[-24px] left-4 w-[240px] md:left-[-28px] md:w-[300px]">
              <div className="border border-white/60 bg-[#F7F8F6]/96 p-4 shadow-[var(--shadow-frame)] backdrop-blur-sm md:p-5">
                <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ink-muted)]">Next appointment</p>
                    <p className="mt-1 text-sm font-bold text-[var(--ink-primary)]">Thursday, 21 Nov</p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#3F6454] text-xs font-bold text-white">MI</span>
                </div>
                <div className="mt-3 grid grid-cols-[44px_1fr] gap-3 text-xs">
                  <span className="font-bold tabular-nums">4:30</span>
                  <span className="text-[var(--ink-secondary)]">Consultation · 60 min</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
