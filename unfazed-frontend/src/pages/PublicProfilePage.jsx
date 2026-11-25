import Container from '../components/common/Container';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

export default function PublicProfilePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--ink-primary)]">
      <Navbar />
      <main>
        <section className="border-b border-[var(--border-hairline)] bg-white py-10 md:py-16">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-8">
                <div className="flex items-start gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[12px] bg-[var(--bg-surface-alt)] text-xl font-bold text-[#3F6454]" aria-label="Dr. Meera Iyer initials">
                    MI
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#3F6454]">Clinical psychologist</p>
                    <h1 className="mt-2 text-3xl leading-tight md:text-4xl">Dr. Meera Iyer</h1>
                    <p className="mt-2 text-sm text-[var(--ink-secondary)]">RCI registration · Bengaluru · English, Tamil, Hindi</p>
                  </div>
                </div>
                <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--ink-secondary)]">
                  I help adults navigate anxiety, burnout, and major life transitions through structured,
                  collaborative therapy. Sessions combine practical skills with a calm, reflective pace.
                </p>
                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {['Anxiety & burnout', 'CBT', 'Life transitions'].map((item) => (
                    <div key={item} className="border-l-2 border-[#A6B39A] pl-3">
                      <p className="text-sm font-semibold text-[var(--ink-primary)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="rounded-[12px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.10em] text-[var(--ink-muted)]">First session</p>
                  <div className="mt-2 flex items-end justify-between">
                    <p className="text-2xl font-bold">₹1,800</p>
                    <p className="text-sm text-[var(--ink-muted)]">60 minutes</p>
                  </div>
                  <Button to="/register" variant="dark" size="lg" className="mt-5 w-full">
                    View available times
                  </Button>
                  <p className="mt-3 text-center text-xs text-[var(--ink-muted)]">Secure booking · INR · Asia/Kolkata</p>
                </div>
              </aside>
            </div>
          </Container>
        </section>

        <section className="py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="text-2xl">About my practice</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-secondary)]">
                  I offer individual online and in-person sessions with an approach grounded in
                  evidence-based care, informed consent, and collaborative treatment planning.
                </p>
                <div className="mt-8 border-t border-[var(--border-hairline)] pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.10em]">Approach</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--ink-secondary)]">
                    Cognitive behavioural therapy, values-based work, and practical between-session
                    exercises tailored to each client's goals.
                  </p>
                </div>
              </div>
              <aside className="lg:col-span-4">
                <div className="rounded-[12px] border border-[var(--border-hairline)] bg-white p-5">
                  <h2 className="text-sm font-bold">Practice information</h2>
                  <dl className="mt-4 space-y-4 text-sm">
                    <div>
                      <dt className="text-[var(--ink-muted)]">Formats</dt>
                      <dd className="mt-1 font-medium">In-person and online</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--ink-muted)]">Languages</dt>
                      <dd className="mt-1 font-medium">English, Tamil, Hindi</dd>
                    </div>
                    <div>
                      <dt className="text-[var(--ink-muted)]">Session length</dt>
                      <dd className="mt-1 font-medium">50–60 minutes</dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
