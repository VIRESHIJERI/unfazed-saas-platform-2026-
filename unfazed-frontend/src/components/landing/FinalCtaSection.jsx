import Container from '../common/Container';
import Reveal from '../common/Reveal';
import Button from '../common/Button';

export default function FinalCtaSection() {
  return (
    <section className="bg-[#242522] py-24 text-[#F8F7F3] md:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A6B39A]">
              Begin Your Practice Space
            </p>
            <h2 className="mt-5 text-[var(--text-section)] leading-[1.08] text-[#F8F7F3]">
              Make more room for the work that matters.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#C5C3BA] md:text-lg">
              Spend less time managing your practice and more time focusing on your clients.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button to="/register" variant="light" size="lg">
                Get started
              </Button>
              <Button href="#product" variant="ghost-light" size="lg">
                Review features
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
