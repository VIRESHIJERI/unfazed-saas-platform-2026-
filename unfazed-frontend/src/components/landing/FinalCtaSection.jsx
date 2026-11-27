import Container from '../common/Container';
import Reveal from '../common/Reveal';
import Button from '../common/Button';

export default function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-dark)] py-24 text-[var(--ink-on-dark)] md:py-32">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A6B39A]">
                Begin with UNFAZZED
              </p>
              <h2 className="mt-5 max-w-4xl text-5xl leading-[0.98] tracking-[-0.055em] text-[var(--ink-on-dark)] md:text-7xl">
                Build a better practice. Deliver better care.
              </h2>
            </div>
            <div className="lg:col-span-3 lg:text-right">
              <Button to="/register" variant="light" size="lg" className="group w-full lg:w-auto">
                Get Started
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Button>
              <p className="mt-4 text-xs text-[var(--ink-on-dark-muted)]">
                Registration is coming in Module 1
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
      <div className="absolute -bottom-20 right-[-80px] h-48 w-48 border border-white/10" aria-hidden="true" />
    </section>
  );
}
