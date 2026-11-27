import { useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import heroImage from '../../assets/images/hero-therapy-sanctuary.jpg';
import sessionImage from '../../assets/images/editorial-practice-session.jpg';
import arjunImage from '../../assets/images/portrait-arjun-menon.jpg';
import claraImage from '../../assets/images/portrait-clara-vance.jpg';
import meeraImage from '../../assets/images/portrait-meera-iyer.jpg';
import {
  AmbientBackgroundDrift,
  AmbientSpotlightCard,
  BrandLogoBackdrop,
  EditorialAccordion,
  EditorialReveal,
  OdometerNumber,
  ScrollScaleStage,
  SQUARESPACE_EASE,
} from '../common/EditorialPrimitives';

type EditorialImageProps = {
  src: string;
  alt: string;
  className?: string;
};

function EditorialImage({ src, alt, className = '' }: EditorialImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#D9D5CB] ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.035]"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_25%,#E6DFD2_0%,#C9C4B8_46%,#A7A99D_100%)]"
        />
      )}
    </div>
  );
}

const HERO_SCENES = [
  {
    image: heroImage,
    alt: 'A serene, sunlit therapy room arranged for a private conversation',
    eyebrow: 'A little more space for care',
    first: 'Make room',
    italic: 'for the work',
    last: 'that matters.',
    body: 'A thoughtful home for the rhythm of an independent therapy practice, from first introduction to the next session.',
  },
  {
    image: sessionImage,
    alt: 'A therapist preparing a calm space for a session',
    eyebrow: 'Practice, in its proper place',
    first: 'Less time',
    italic: 'keeping up.',
    last: 'More time here.',
    body: 'Bring appointments, client details, and practice essentials into one considered workspace.',
  },
  {
    image: meeraImage,
    alt: 'Therapist Dr. Meera Iyer, shown in a natural portrait',
    eyebrow: 'A practice that feels like yours',
    first: 'A clear way',
    italic: 'to be found.',
    last: 'A calmer way to work.',
    body: 'Share a professional profile, make your availability visible, and help clients take the next step.',
  },
];

export function HeroBand() {
  const ref = useRef<HTMLElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const scene = HERO_SCENES[activeScene];

  const goToScene = (direction: number) => {
    setActiveScene((current) => (current + direction + HERO_SCENES.length) % HERO_SCENES.length);
  };

  return (
    <section ref={ref} className="relative isolate min-h-[min(900px,100svh)] overflow-hidden bg-[#0D100E] text-[#FAF8F4]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene.image}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: SQUARESPACE_EASE }}
        >
          <motion.img
            src={scene.image}
            alt={scene.alt}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
            style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,16,14,0.88)_0%,rgba(13,16,14,0.63)_42%,rgba(13,16,14,0.10)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,16,14,0.8)_0%,transparent_46%,rgba(13,16,14,0.22)_100%)]" />
      <div aria-hidden="true" className="bg-editorial-grain pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex min-h-[min(900px,100svh)] max-w-[1440px] flex-col justify-center px-5 pb-36 pt-28 sm:px-8 lg:px-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: SQUARESPACE_EASE }}
            className="max-w-[740px]"
          >
            <p className="mb-7 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D8E2DC] sm:text-xs">
              {scene.eyebrow}
            </p>
            <h1 className="max-w-[12ch] font-display text-[clamp(3.55rem,9vw,8.5rem)] font-medium leading-[0.91] tracking-[-0.035em] [text-wrap:balance]">
              {scene.first}{' '}
              <em className="font-display font-normal text-[#D8C6A7]">{scene.italic}</em>
              <br />{scene.last}
            </h1>
            <p className="mt-7 max-w-[52ch] text-sm leading-7 text-[#D8E2DC] sm:text-base sm:leading-8">
              {scene.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/register"
                className="inline-flex min-h-12 items-center justify-center bg-[#FAF8F4] px-6 text-sm font-semibold text-[#111312] transition-colors hover:bg-[#E9E4DA] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FAF8F4]"
              >
                Begin your practice <span className="ml-3" aria-hidden="true">↗</span>
              </Link>
              <a
                href="#platform"
                className="inline-flex min-h-12 items-center justify-center border border-[#FAF8F4]/45 px-6 text-sm font-medium text-[#FAF8F4] transition-colors hover:bg-[#FAF8F4]/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FAF8F4]"
              >
                Explore the platform
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-5 bottom-5 flex min-h-[76px] items-center justify-between gap-5 border border-[#FAF8F4]/25 bg-[#0D100E]/40 px-4 backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:px-6 lg:inset-x-12">
          <div className="flex items-center gap-4 sm:gap-6">
            <p className="whitespace-nowrap font-mono text-[11px] tabular-nums text-[#FAF8F4]">
              {String(activeScene + 1).padStart(2, '0')} <span className="text-[#FAF8F4]/50">/ 03</span>
            </p>
            <div className="flex gap-1.5" role="group" aria-label="Choose hero scene">
              {HERO_SCENES.map((item, index) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  aria-label={`Show scene ${index + 1}: ${item.eyebrow}`}
                  aria-pressed={activeScene === index}
                  onClick={() => setActiveScene(index)}
                  className="grid min-h-11 min-w-8 place-items-center focus-visible:outline-2 focus-visible:outline-[#FAF8F4]"
                >
                  <span className="h-px w-8 bg-[#FAF8F4]/40">
                    <motion.span
                      className="block h-px origin-left bg-[#FAF8F4]"
                      animate={{ scaleX: activeScene === index ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: SQUARESPACE_EASE }}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => goToScene(-1)} className="min-h-11 px-3 text-xs text-[#FAF8F4] transition-colors hover:bg-[#FAF8F4]/10 focus-visible:outline-2 focus-visible:outline-[#FAF8F4] sm:px-4">
              Previous
            </button>
            <button type="button" onClick={() => goToScene(1)} className="min-h-11 px-3 text-xs text-[#FAF8F4] transition-colors hover:bg-[#FAF8F4]/10 focus-visible:outline-2 focus-visible:outline-[#FAF8F4] sm:px-4">
              Next <span aria-hidden="true" className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const BENCHMARKS = [
  {
    value: 4,
    suffix: '+',
    title: 'Session lengths',
    copy: 'Offer 30, 45, 60, or 90-minute appointments to suit the work.',
  },
  {
    value: 15,
    suffix: ' min',
    title: 'Breathing room',
    copy: 'Set a buffer between appointments so the day has space to reset.',
  },
  {
    value: 240,
    suffix: '+',
    title: 'Minutes in a sample day',
    copy: 'Shape a working day around your hours, with more than one open window.',
  },
];

export function BenchmarksBand() {
  return (
    <section className="bg-architectural-grid bg-[#FAF8F4] py-20 text-[#1A1D1B] md:py-28">
      <div className="relative mx-auto grid max-w-[1440px] gap-12 overflow-hidden px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12">
        <BrandLogoBackdrop side="right" />
        <EditorialReveal className="relative z-10 lg:col-span-5">
          <p className="section-kicker">Considered by design</p>
          <h2 className="mt-5 max-w-[12ch] font-display text-5xl leading-[0.98] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
            A practice day with a little more breathing room.
          </h2>
        </EditorialReveal>
        <div className="relative z-10 grid gap-3 sm:grid-cols-3 lg:col-span-7">
          {BENCHMARKS.map((item, index) => (
            <EditorialReveal key={item.title} delay={index * 0.07} className="min-h-[236px] border border-[#1A1D1B]/10 bg-white p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#59605B]">0{index + 1}</p>
              <p className="mt-8 font-display text-5xl leading-none tracking-[-0.03em] sm:text-6xl">
                <OdometerNumber value={item.value} suffix={item.suffix} />
              </p>
              <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#59605B]">{item.copy}</p>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CAPABILITIES = [
  { title: 'A profile with a point of view', audience: 'Your public presence', image: meeraImage, alt: 'Portrait of a therapist for a professional practice profile' },
  { title: 'Availability made visible', audience: 'Your appointment rhythm', image: sessionImage, alt: 'A quiet therapy room prepared for an upcoming appointment' },
  { title: 'Room for the whole practice', audience: 'Your working day', image: heroImage, alt: 'Warm, daylight-filled therapy studio' },
  { title: 'A thoughtful first step', audience: 'Your client experience', image: claraImage, alt: 'Portrait of a therapist in natural light' },
];

export function CapabilitiesCarouselBand() {
  const railRef = useRef<HTMLDivElement>(null);
  const moveRail = (direction: number) => {
    railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * 0.78, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#F2EEE6] py-20 text-[#1A1D1B] md:py-28">
      <AmbientBackgroundDrift tone="stone" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <EditorialReveal>
            <p className="section-kicker">One practice, thoughtfully held</p>
            <h2 className="mt-5 max-w-[14ch] font-display text-5xl leading-[0.98] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
              The details of care, in one place.
            </h2>
          </EditorialReveal>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button type="button" aria-label="Scroll capabilities left" onClick={() => moveRail(-1)} className="grid min-h-12 min-w-12 place-items-center border border-[#1A1D1B]/20 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E6E5D]">←</button>
            <button type="button" aria-label="Scroll capabilities right" onClick={() => moveRail(1)} className="grid min-h-12 min-w-12 place-items-center border border-[#1A1D1B]/20 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E6E5D]">→</button>
          </div>
        </div>

        <div
          ref={railRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 md:mt-14 md:gap-5"
          aria-label="Platform capabilities"
        >
          {CAPABILITIES.map((item, index) => (
            <EditorialReveal key={item.title} delay={index * 0.05} className="group w-[82vw] max-w-[440px] shrink-0 snap-start border border-[#1A1D1B]/12 bg-white sm:w-[52vw] lg:w-[calc((100%-3.75rem)/3)]">
              <EditorialImage src={item.image} alt={item.alt} className="aspect-[4/3]" />
              <div className="flex min-h-[90px] items-center justify-between gap-5 px-5 py-4">
                <div>
                  <h3 className="font-display text-xl leading-tight tracking-[-0.015em]">{item.title}</h3>
                  <p className="mt-2 text-xs text-[#59605B]">{item.audience}</p>
                </div>
                <span aria-hidden="true" className="text-lg text-[#4E6E5D]">↗</span>
              </div>
            </EditorialReveal>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-2 sm:hidden">
          <button type="button" aria-label="Scroll capabilities left" onClick={() => moveRail(-1)} className="min-h-11 min-w-11 border border-[#1A1D1B]/20">←</button>
          <button type="button" aria-label="Scroll capabilities right" onClick={() => moveRail(1)} className="min-h-11 min-w-11 border border-[#1A1D1B]/20">→</button>
        </div>
      </div>
    </section>
  );
}

const STAGE_CAPABILITIES = [
  'Availability that reflects your real week',
  'Booking details, clearly organized',
  'Sessions and client context together',
  'Time zones made visible',
  'A shareable professional profile',
  'Practice settings in one workspace',
];

const SAMPLE_UTC = [
  new Date('2026-11-30T04:30:00.000Z'),
  new Date('2026-11-30T06:00:00.000Z'),
  new Date('2026-11-30T09:30:00.000Z'),
  new Date('2026-12-01T05:30:00.000Z'),
];

export function ProductStageBand() {
  const [mode, setMode] = useState<'week' | 'booking'>('week');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const timeFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: timezone }),
    [timezone],
  );
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', timeZone: timezone }),
    [timezone],
  );

  return (
    <section id="platform" className="bg-architectural-grid-dark relative isolate overflow-hidden bg-[#111C16] py-20 text-[#FAF8F4] md:py-28">
      <AmbientBackgroundDrift tone="forest" />
      <BrandLogoBackdrop side="left" dark />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
        <EditorialReveal className="relative z-10 lg:col-span-4">
          <p className="section-kicker section-kicker-dark">The working view</p>
          <h2 className="mt-5 max-w-[10ch] font-display text-5xl leading-[0.97] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
            A quieter way to run the day.
          </h2>
          <p className="mt-6 max-w-[48ch] text-sm leading-7 text-[#D8E2DC]">
            See the next appointments, keep availability legible, and give clients a clear route to book.
          </p>
        </EditorialReveal>

        <ScrollScaleStage className="relative z-10 lg:col-span-8">
          <div className="relative z-10 border border-[#FAF8F4]/15 bg-[#FAF8F4] p-3 text-[#1A1D1B] sm:p-5 lg:col-span-8">
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1D1B]/10 pb-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#59605B]">Practice schedule</p>
                    <p className="mt-1 font-display text-2xl">A considered week</p>
                  </div>
                  <label className="flex min-h-11 items-center gap-2 text-xs text-[#59605B]">
                    <span className="sr-only">Preview timezone</span>
                    <select
                      value={timezone}
                      onChange={(event) => setTimezone(event.target.value)}
                      className="min-h-11 max-w-[180px] border border-[#1A1D1B]/15 bg-transparent px-2 text-xs text-[#1A1D1B] focus-visible:outline-2 focus-visible:outline-[#4E6E5D]"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="Asia/Dubai">Asia/Dubai</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </label>
                </div>
                <div className="mt-4 flex gap-1 border-b border-[#1A1D1B]/10 pb-3" role="tablist" aria-label="Schedule preview">
                  {(['week', 'booking'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="tab"
                      aria-selected={mode === value}
                      onClick={() => setMode(value)}
                      className="relative min-h-11 px-4 text-xs capitalize focus-visible:outline-2 focus-visible:outline-[#4E6E5D]"
                    >
                      {mode === value && (
                        <motion.span
                          layoutId="product-stage-tab"
                          className="absolute inset-0 border border-[#1B3B2B]/15 bg-[#E8EDE7]"
                          transition={{ duration: 0.32, ease: SQUARESPACE_EASE }}
                        />
                      )}
                      <span className="relative">{value === 'week' ? 'Week view' : 'Booking view'}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4" role="tabpanel">
                  {mode === 'week' ? (
                    <div className="grid grid-cols-7 border-l border-t border-[#1A1D1B]/10">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={day} className="min-h-[160px] border-b border-r border-[#1A1D1B]/10">
                          <p className="border-b border-[#1A1D1B]/10 px-1 py-2 text-center font-mono text-[8px] uppercase text-[#59605B] sm:text-[10px]">{day}</p>
                          {index < 5 && index !== 2 && (
                            <div className="mx-1 mt-2 border border-[#4E6E5D]/20 bg-[#E6ECE5] p-1.5 sm:mx-2 sm:p-2">
                              <p className="font-mono text-[8px] text-[#1B3B2B] sm:text-[10px]">{index < 3 ? '09:00' : '10:00'}</p>
                              <p className="mt-1 hidden text-[9px] text-[#59605B] sm:block">Available</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SAMPLE_UTC.slice(0, 3).map((time, index) => (
                        <button key={time.toISOString()} type="button" className="flex min-h-[58px] items-center justify-between border border-[#1A1D1B]/12 px-3 text-left transition-colors hover:border-[#1B3B2B] hover:bg-[#E8EDE7]">
                          <span className="text-sm font-medium">{timeFormatter.format(time)}</span>
                          <span className="font-mono text-[9px] text-[#59605B]">{index === 0 ? '45 min' : '60 min'}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="mt-3 font-mono text-[9px] text-[#59605B]">
                    Preview · {dateFormatter.format(SAMPLE_UTC[0])} · {timezone}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="border-b border-[#1A1D1B]/10 pb-4 font-mono text-[9px] uppercase tracking-[0.15em] text-[#59605B]">One connected practice</p>
                <ul className="divide-y divide-[#1A1D1B]/10">
                  {STAGE_CAPABILITIES.map((item) => (
                    <li key={item} className="flex min-h-[53px] items-center gap-3 text-xs leading-5">
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-[#4E6E5D]" fill="none">
                        <path d="m3.5 8.2 2.7 2.7 6.3-6.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollScaleStage>
      </div>
    </section>
  );
}

const START_CARDS = [
  {
    number: '01',
    title: 'Make your practice yours.',
    copy: 'Shape a professional profile with your approach, credentials, languages, and ways to work together.',
    link: '/register',
    label: 'Create a workspace',
  },
  {
    number: '02',
    title: 'Let the next step be simple.',
    copy: 'Give clients a clear place to learn about your practice and find a time that works.',
    link: '/dr-meera-iyer',
    label: 'See a profile example',
  },
];

export function GettingStartedBand() {
  return (
    <section id="getting-started" className="relative overflow-hidden bg-[#FAF8F4] py-20 text-[#1A1D1B] md:py-28">
      <BrandLogoBackdrop side="right" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <EditorialReveal className="max-w-[720px]">
          <p className="section-kicker">A thoughtful beginning</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.98] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
            Built around the people in your practice.
          </h2>
        </EditorialReveal>
        <div className="relative mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
          {START_CARDS.map((card, index) => (
            <EditorialReveal key={card.number} delay={index * 0.08} className="flex min-h-[340px] flex-col border border-[#1A1D1B]/10 bg-white p-6 sm:p-9">
              <p className="font-mono text-[10px] tracking-[0.14em] text-[#59605B]">{card.number} <span className="mx-2">·</span> FOR THE PRACTICE</p>
              <h3 className="mt-12 max-w-[12ch] font-display text-4xl leading-[1.02] tracking-[-0.02em] md:text-5xl">{card.title}</h3>
              <p className="mt-4 max-w-[52ch] text-sm leading-7 text-[#59605B]">{card.copy}</p>
              <Link to={card.link} className="group mt-auto inline-flex min-h-12 items-end gap-3 self-start border-b border-[#1A1D1B]/25 pb-2 pt-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E6E5D]">
                {card.label}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HandleFinderBand() {
  const [handle, setHandle] = useState('');
  const [state, setState] = useState<{ type: 'idle' | 'loading' | 'success' | 'taken' | 'error'; message: string }>({ type: 'idle', message: '' });

  async function checkHandle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const slug = handle.trim().toLowerCase().replace(/^@/, '');
    if (!/^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/.test(slug)) {
      setState({ type: 'error', message: 'Use 3–30 letters, numbers, or hyphens. Start and end with a letter or number.' });
      return;
    }

    setState({ type: 'loading', message: 'Checking your link…' });
    try {
      const base = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api').replace(/\/$/, '');
      const response = await fetch(`${base}/scheduling/slug-availability/${encodeURIComponent(slug)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'The link could not be checked.');
      setState(result.available
        ? { type: 'success', message: `/${slug} is available to request.` }
        : { type: 'taken', message: `/${slug} is already in use. Try another name.` });
    } catch (error) {
      setState({
        type: 'error',
        message: error instanceof Error ? `${error.message} Make sure the API and database are running.` : 'The link could not be checked.',
      });
    }
  }

  return (
    <section className="bg-architectural-grid relative overflow-hidden bg-[#F2EEE6] py-20 text-[#1A1D1B] md:py-28">
      <AmbientBackgroundDrift tone="stone" />
      <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">
        <EditorialReveal>
          <p className="section-kicker">A name clients can remember</p>
          <h2 className="mx-auto mt-5 max-w-[13ch] font-display text-5xl leading-[0.98] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
            Find a home for your practice.
          </h2>
          <p className="mx-auto mt-5 max-w-[55ch] text-sm leading-7 text-[#59605B]">
            Try a practice name to check whether its public link is available.
          </p>
        </EditorialReveal>
        <form onSubmit={checkHandle} className="mx-auto mt-9 flex max-w-[660px] flex-col gap-2 border border-[#1A1D1B]/15 bg-white p-2 sm:flex-row">
          <label className="flex min-h-12 flex-1 items-center px-3 text-left">
            <span className="mr-1 text-sm text-[#59605B]">unfazzed.in/</span>
            <input
              value={handle}
              onChange={(event) => {
                setHandle(event.target.value);
                setState({ type: 'idle', message: '' });
              }}
              maxLength={30}
              autoComplete="off"
              aria-label="Desired practice link"
              aria-describedby={state.message ? 'handle-feedback' : undefined}
              placeholder="your-practice"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#59605B]/55"
            />
          </label>
          <button type="submit" disabled={state.type === 'loading'} className="min-h-12 bg-[#1B3B2B] px-6 text-sm font-semibold text-[#FAF8F4] transition-colors hover:bg-[#12291E] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4E6E5D]">
            {state.type === 'loading' ? 'Checking…' : 'Check link'}
          </button>
        </form>
        <p
          id="handle-feedback"
          aria-live="polite"
          className={`mx-auto mt-4 min-h-6 max-w-[60ch] text-sm ${
            state.type === 'success' ? 'text-[#1B3B2B]' : state.type === 'idle' ? 'text-transparent' : 'text-[#8D4638]'
          }`}
        >
          {state.message || ' '}
        </p>
      </div>
    </section>
  );
}

const GALLERY = [
  { src: meeraImage, alt: 'Therapist Meera Iyer in a calm portrait setting', title: 'A considered profile', slug: 'dr-meera-iyer' },
  { src: arjunImage, alt: 'Therapist Arjun Menon in a natural portrait', title: 'A practice in focus', slug: 'arjun-menon' },
  { src: claraImage, alt: 'Therapist Clara Vance in a bright, relaxed portrait', title: 'Space to be found', slug: 'clara-vance' },
];

function UrlMarquee() {
  const reducedMotion = useReducedMotion();
  const links = [...GALLERY, ...GALLERY];
  return (
    <div className="overflow-hidden border-t border-[#FAF8F4]/15 py-5" aria-label="Example public profile links">
      <motion.div
        className="flex w-max items-center"
        animate={reducedMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      >
        {links.map((item, index) => (
          <span key={`${item.slug}-${index}`} className="flex items-center gap-7 px-7 font-mono text-[11px] tracking-wide text-[#D8E2DC]/75 sm:px-10 sm:text-xs">
            <span>unfazzed.in/{item.slug}</span>
            <span aria-hidden="true" className="text-[#A9BEAD]">✳</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ShowcaseGalleryBand() {
  return (
    <section id="showcase" className="bg-architectural-grid-dark relative overflow-hidden bg-[#121514] py-20 text-[#FAF8F4] md:py-28">
      <AmbientBackgroundDrift tone="dark" />
      <BrandLogoBackdrop side="right" dark />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <EditorialReveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-kicker section-kicker-dark">A practice, presented with care</p>
            <h2 className="mt-5 max-w-[12ch] font-display text-5xl leading-[0.98] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
              A public presence that feels personal.
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-7 text-[#D8E2DC]">
            A clear introduction helps a new client understand your approach before they reach out.
          </p>
        </EditorialReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {GALLERY.map((item, index) => (
            <EditorialReveal key={item.slug} delay={index * 0.06}>
              <AmbientSpotlightCard className="group border border-[#FAF8F4]/15 bg-[#181C1A]">
                <Link to={item.slug === 'dr-meera-iyer' ? '/dr-meera-iyer' : '/register'} className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9BEAD]">
                  <EditorialImage src={item.src} alt={item.alt} className="aspect-[3/4]" />
                  <div className="flex min-h-[86px] items-center justify-between gap-4 px-5">
                    <div>
                      <h3 className="font-display text-2xl">{item.title}</h3>
                      <p className="mt-1 font-mono text-[10px] text-[#D8E2DC]/70">unfazzed.in/{item.slug}</p>
                    </div>
                    <span aria-hidden="true" className="text-lg text-[#A9BEAD]">↗</span>
                  </div>
                </Link>
              </AmbientSpotlightCard>
            </EditorialReveal>
          ))}
        </div>
      </div>
      <div className="relative mt-14 md:mt-20">
        <UrlMarquee />
      </div>
    </section>
  );
}

const PILLARS = [
  { index: '01', title: 'Set the foundation', copy: 'Introduce your practice, your approach, and the kinds of support you offer.' },
  { index: '02', title: 'Shape your availability', copy: 'Build a weekly rhythm with working windows, session lengths, and breathing room.' },
  { index: '03', title: 'Keep care in view', copy: 'Bring appointments and the small details of your practice into one calm place.' },
];

export function LaunchPillarsBand() {
  return (
    <section className="bg-architectural-grid relative overflow-hidden bg-[#FAF8F4] py-20 text-[#1A1D1B] md:py-28">
      <BrandLogoBackdrop side="left" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <EditorialReveal>
          <p className="section-kicker">A steady start</p>
          <h2 className="mt-5 max-w-[13ch] font-display text-5xl leading-[0.98] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
            Three steps. One more considered practice.
          </h2>
        </EditorialReveal>
        <div className="relative mt-10 grid gap-3 md:mt-14 md:grid-cols-3">
          {PILLARS.map((item, index) => (
            <EditorialReveal key={item.index} delay={index * 0.07} className="min-h-[270px] border border-[#1A1D1B]/10 bg-white p-6 sm:p-8">
              <p className="font-mono text-xs tabular-nums tracking-[0.12em] text-[#59605B]">{item.index}</p>
              <h3 className="mt-12 max-w-[12ch] font-display text-3xl leading-tight tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-4 max-w-[42ch] text-sm leading-7 text-[#59605B]">{item.copy}</p>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    question: 'Who is UNFAZZED for?',
    answer: 'UNFAZZED is designed for independent therapists and counsellors who want a more considered way to present and organize their practice.',
  },
  {
    question: 'Can clients book an appointment online?',
    answer: 'The booking experience can show available times from a therapist’s schedule. Appointments are saved by the scheduling service when the API and database are configured.',
  },
  {
    question: 'Can I choose my working hours?',
    answer: 'Yes. Weekly availability supports multiple working windows per day, with date-specific exceptions and blocked time managed separately.',
  },
  {
    question: 'Which appointment lengths are supported?',
    answer: 'The scheduling flow supports 30, 45, 60, and 90-minute sessions when enabled in the therapist’s availability settings.',
  },
  {
    question: 'Will clients see times in their own timezone?',
    answer: 'The booking interface detects the client’s browser timezone and presents appointment times with that timezone clearly identified.',
  },
];

export function FaqBand() {
  return (
    <section id="faq" className="bg-architectural-grid-dark relative overflow-hidden bg-[#131715] py-20 text-[#FAF8F4] md:py-28">
      <AmbientBackgroundDrift tone="dark" />
      <BrandLogoBackdrop side="center" dark />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <EditorialReveal className="lg:col-span-4 lg:self-start">
          <p className="section-kicker section-kicker-dark">Good to know</p>
          <h2 className="mt-5 max-w-[9ch] font-display text-5xl leading-[0.98] tracking-[-0.025em] [text-wrap:balance] md:text-7xl">
            A few things, answered.
          </h2>
          <p className="mt-5 max-w-[38ch] text-sm leading-7 text-[#D8E2DC]">
            A little more detail about how the practice experience comes together.
          </p>
        </EditorialReveal>
        <div className="lg:col-span-8">
          <EditorialAccordion items={FAQ_ITEMS} dark />
        </div>
      </div>
    </section>
  );
}

function CtaLink({ to, children, inverse = false }: { to: string; children: ReactNode; inverse?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FAF8F4] ${
        inverse
          ? 'border border-[#FAF8F4]/45 text-[#FAF8F4] hover:bg-[#FAF8F4]/10'
          : 'bg-[#FAF8F4] text-[#111312] hover:bg-[#E9E4DA]'
      }`}
    >
      {children}
    </Link>
  );
}

export function FinalCtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(130deg,#0F1B15_0%,#1B3B2B_52%,#0D100E_100%)] py-24 text-center text-[#FAF8F4] md:py-36">
      <AmbientBackgroundDrift tone="forest" />
      <div className="bg-editorial-grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1000px] px-5 sm:px-8">
        <EditorialReveal>
          <p className="section-kicker section-kicker-dark">When you’re ready</p>
          <h2 className="mx-auto mt-5 max-w-[13ch] font-display text-5xl leading-[0.96] tracking-[-0.025em] [text-wrap:balance] md:text-8xl">
            Make a little more room for care.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-sm leading-7 text-[#D8E2DC] md:text-base">
            Bring the moving parts of your independent practice into a calmer view.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaLink to="/register">Create your workspace <span aria-hidden="true" className="ml-3">↗</span></CtaLink>
            <CtaLink to="/dr-meera-iyer" inverse>Explore a therapist profile</CtaLink>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
