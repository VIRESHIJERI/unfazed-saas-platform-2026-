import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Reveal from '../common/Reveal';

const DEMO_THERAPISTS = [
  {
    name: 'Dr. Meera Iyer',
    credentials: 'Clinical Psychologist',
    location: 'Bengaluru',
    specializations: ['Anxiety & Burnout', 'CBT', 'Life Transitions'],
    languages: 'English, Tamil, Hindi',
    slug: 'unfazed.in/dr-meera-iyer',
    initials: 'MI',
    fee: '₹1,800',
    next: 'Thu, 4:30 PM',
  },
  {
    name: 'Kabir Malhotra',
    credentials: 'Counselling Psychologist',
    location: 'Mumbai',
    specializations: ['Grief & Relationships', 'Psychodynamic', 'Adults'],
    languages: 'English, Hindi, Punjabi',
    slug: 'unfazed.in/kabir-malhotra',
    initials: 'KM',
    fee: '₹1,500',
    next: 'Fri, 11:00 AM',
  },
  {
    name: 'Ananya Deshmukh',
    credentials: 'Trauma-Informed Therapist',
    location: 'Pune',
    specializations: ['Somatic Work', 'Attachment', 'Young Adults'],
    languages: 'English, Marathi, Hindi',
    slug: 'unfazed.in/ananya-deshmukh',
    initials: 'AD',
    fee: '₹2,000',
    next: 'Tue, 2:30 PM',
  },
  {
    name: 'Rohan Kulkarni',
    credentials: 'Couples & Family Therapist',
    location: 'Delhi NCR',
    specializations: ['Couples Therapy', 'Workplace Stress', 'ACT'],
    languages: 'English, Hindi, Kannada',
    slug: 'unfazed.in/rohan-kulkarni',
    initials: 'RK',
    fee: '₹2,200',
    next: 'Wed, 5:00 PM',
  },
  {
    name: 'Dr. Kavita Nair',
    credentials: 'Mental Wellness Specialist',
    location: 'Kochi',
    specializations: ['Perinatal Mental Health', 'Mindfulness', 'Women'],
    languages: 'English, Malayalam',
    slug: 'unfazed.in/dr-kavita-nair',
    initials: 'KN',
    fee: '₹1,900',
    next: 'Mon, 10:30 AM',
  },
];

export default function TherapistShowcase() {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 340, behavior: 'smooth' });
  };

  return (
    <section id="solutions" className="bg-[var(--bg-canvas)] py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3F6454]">
                Built for Independent Practices
              </p>
              <h2 className="mt-3 text-[var(--text-section)] leading-[1.08] text-[var(--ink-primary)]">
                Professional profiles, organized around care.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--ink-secondary)]">
                Illustrative demo profiles show credentials, languages, and booking details in a clear, client-ready format.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() => scrollRail(-1)}
                aria-label="Scroll showcase left"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-hairline-strong)] text-[var(--ink-primary)] transition-colors hover:bg-[var(--bg-surface-alt)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F6454] cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollRail(1)}
                aria-label="Scroll showcase right"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-hairline-strong)] text-[var(--ink-primary)] transition-colors hover:bg-[var(--bg-surface-alt)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F6454] cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Horizontal Scrolling Collection */}
      <div
        ref={railRef}
        className="no-scrollbar mt-10 flex gap-5 overflow-x-auto px-5 pb-3 md:px-8 lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
      >
        {DEMO_THERAPISTS.map((therapist) => (
          <article
            key={therapist.slug}
            className="group w-[280px] shrink-0 border border-[var(--border-hairline)] bg-white p-5 rounded-[var(--radius-lg)] transition-colors hover:border-[var(--border-hairline-strong)] sm:w-[300px]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[10px] bg-[var(--bg-surface-alt)] text-sm font-bold text-[#3F6454]" aria-label={`Initials ${therapist.initials}`}>
                {therapist.initials}
              </div>
              <span className="rounded-[var(--radius-sm)] border border-[var(--border-hairline)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                Demo
              </span>
            </div>
            <h3 className="mt-5 text-[var(--text-card)] leading-tight text-[var(--ink-primary)]">{therapist.name}</h3>
            <p className="mt-1 text-sm text-[var(--ink-secondary)]">{therapist.credentials}</p>
            <p className="mt-0.5 text-xs text-[var(--ink-muted)]">{therapist.location}</p>
            <div className="mt-4 border-t border-[var(--border-hairline)] pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]">Specializations</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-secondary)]">{therapist.specializations.join(' · ')}</p>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-[var(--ink-muted)]">Languages</dt>
                <dd className="mt-1 font-medium text-[var(--ink-primary)]">{therapist.languages}</dd>
              </div>
              <div>
                <dt className="text-[var(--ink-muted)]">First session</dt>
                <dd className="mt-1 font-medium text-[var(--ink-primary)]">{therapist.fee}</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4">
              <span className="text-xs text-[var(--ink-muted)]">Next: {therapist.next}</span>
              <Link to="/dr-meera-iyer" className="rounded-[var(--radius-md)] border border-[#3F6454] px-3 py-2 text-xs font-semibold text-[#3F6454] hover:bg-[#3F6454] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F6454]">
                View profile
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
