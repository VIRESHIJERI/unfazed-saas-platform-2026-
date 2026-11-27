import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react';
import { useEffect, useId, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { BrandMark } from './BrandLogo';

export const SQUARESPACE_EASE = [0.19, 1, 0.22, 1] as const;

type EditorialRevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
};

export function EditorialReveal({ children, delay = 0, ...props }: EditorialRevealProps) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : delay, ease: SQUARESPACE_EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AmbientBackgroundDrift({ tone = 'ivory' }: { tone?: 'ivory' | 'stone' | 'forest' | 'dark' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const firstY = useTransform(scrollYProgress, [0, 1], [36, -44]);
  const secondY = useTransform(scrollYProgress, [0, 1], [-28, 54]);
  const colors = {
    ivory: ['rgba(167, 146, 106, 0.12)', 'rgba(80, 110, 93, 0.07)'],
    stone: ['rgba(174, 145, 105, 0.16)', 'rgba(105, 126, 111, 0.09)'],
    forest: ['rgba(114, 147, 120, 0.17)', 'rgba(193, 169, 122, 0.08)'],
    dark: ['rgba(133, 154, 141, 0.12)', 'rgba(139, 120, 92, 0.07)'],
  }[tone];

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-[8%] h-[26rem] w-[26rem] rounded-full blur-[100px]"
        style={{ y: firstY, background: `radial-gradient(circle, ${colors[0]}, transparent 70%)` }}
      />
      <motion.div
        className="absolute -right-36 bottom-[-8%] h-[28rem] w-[28rem] rounded-full blur-[110px]"
        style={{ y: secondY, background: `radial-gradient(circle, ${colors[1]}, transparent 70%)` }}
      />
    </div>
  );
}

export function BrandLogoBackdrop({
  side = 'right',
  dark = false,
}: {
  side?: 'left' | 'right' | 'center';
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [42, -64]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 3]);
  const position = {
    left: 'left-[-9rem] top-1/2 -translate-y-1/2',
    right: 'right-[-9rem] top-1/2 -translate-y-1/2',
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  }[side];

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute ${position}`}
      style={{ y, rotate }}
    >
      <BrandMark
        className={`h-[min(72vw,540px)] w-[min(72vw,540px)] ${dark ? 'text-[#FAF8F4]/[0.045]' : 'text-[#1A1D1B]/[0.045]'}`}
      />
    </motion.div>
  );
}

export function ScrollScaleStage({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'center 0.55'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const smoothScale = useTransform(scale, (value) => (reducedMotion ? 1 : value));

  return <motion.div ref={ref} className={className} style={{ scale: smoothScale }}>{children}</motion.div>;
}

export function OdometerNumber({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (current) => Math.round(current).toLocaleString('en-IN'));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 1.15, ease: SQUARESPACE_EASE });
    return () => controls.stop();
  }, [inView, motionValue, reducedMotion, value]);

  return (
    <span ref={ref} className="whitespace-nowrap tabular-nums" aria-label={`${prefix}${value}${suffix}`}>
      {prefix}<motion.span aria-hidden="true">{display}</motion.span>{suffix}
    </span>
  );
}

export function AmbientSpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const [point, setPoint] = useState({ x: '50%', y: '50%', opacity: 0 });

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPoint({
      x: `${event.clientX - rect.left}px`,
      y: `${event.clientY - rect.top}px`,
      opacity: 1,
    });
  }

  return (
    <article
      className={`relative isolate overflow-hidden ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPoint((current) => ({ ...current, opacity: 0 }))}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          opacity: point.opacity,
          background: `radial-gradient(420px circle at ${point.x} ${point.y}, rgba(196, 211, 199, 0.11), transparent 68%)`,
        }}
      />
      {children}
    </article>
  );
}

export function EditorialAccordion({
  items,
  dark = false,
}: {
  items: Array<{ question: string; answer: string }>;
  dark?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefix = useId();
  const border = dark ? 'border-[#FAF8F4]/15' : 'border-[#1A1D1B]/12';

  return (
    <div className={`divide-y ${border}`}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${prefix}-panel-${index}`;
        return (
          <div key={item.question} className={`border-t ${border} first:border-t-0`}>
            <button
              type="button"
              className={`flex min-h-[68px] w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9BEAD] md:text-lg ${dark ? 'text-[#FAF8F4]' : 'text-[#1A1D1B]'}`}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span>{item.question}</span>
              <motion.span
                aria-hidden="true"
                className="grid h-8 w-8 shrink-0 place-items-center text-2xl font-light"
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25, ease: SQUARESPACE_EASE }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: SQUARESPACE_EASE }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-[65ch] pb-6 pr-10 text-sm leading-7 md:text-base ${dark ? 'text-[#D8E2DC]' : 'text-[#59605B]'}`}>
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
