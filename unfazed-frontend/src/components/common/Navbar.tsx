import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';

const LINKS = [
  { label: 'Platform', href: '/#platform' },
  { label: 'How it works', href: '/#getting-started' },
  { label: 'For therapists', href: '/#showcase' },
  { label: 'FAQ', href: '/#faq' },
];

type NavbarProps = {
  transparentOverHero?: boolean;
};

function ScrollProgressRule() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.18 });
  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#4E6E5D]"
      style={{ scaleX }}
    />
  );
}

export default function Navbar({ transparentOverHero = false }: NavbarProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const settled = !transparentOverHero || scrolled;

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 40));

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileOpen]);

  return (
    <motion.header
      className={`z-50 w-full transition-[background-color,border-color,backdrop-filter,color] duration-300 ${
        transparentOverHero ? 'fixed inset-x-0 top-0' : 'sticky top-0'
      } ${
        settled
          ? 'border-b border-[#1A1D1B]/10 bg-[#F7F4EE]/95 text-[#1A1D1B] backdrop-blur-md'
          : 'border-b border-transparent bg-[#0D100E]/20 text-[#FAF8F4] backdrop-blur-[2px]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <Link
          to="/"
          aria-label="UNFAZZED home"
          className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9BEAD]"
        >
          <BrandLogo inverse={!settled} />
        </Link>

        <nav className="hidden min-w-0 items-center justify-center gap-6 lg:flex xl:gap-9" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              className="sq-link-underline relative whitespace-nowrap py-3 text-[13px] font-medium tracking-[0.01em] opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9BEAD]"
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="sq-link-underline relative whitespace-nowrap py-3 text-[13px] font-medium tracking-[0.01em] opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9BEAD]"
            to="/dr-meera-iyer"
          >
            Therapist profile
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/register"
            className={`hidden min-h-11 items-center justify-center px-5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9BEAD] sm:inline-flex ${
              settled
                ? 'bg-[#123B32] text-[#F7F4EE] hover:bg-[#0D3029]'
                : 'bg-[#FAF8F4] text-[#111312] hover:bg-[#E9E4DA]'
            }`}
          >
            Get started
          </Link>
          <button
            type="button"
            className="grid min-h-11 min-w-11 place-items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A9BEAD] lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
              <span className={`h-px w-full bg-current transition-transform ${mobileOpen ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`h-px w-full bg-current transition-transform ${mobileOpen ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      <ScrollProgressRule />

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile primary"
          className="absolute inset-x-0 top-16 border-b border-[#1A1D1B]/10 bg-[#F7F4EE] px-5 pb-6 pt-3 text-[#1A1D1B] shadow-[0_20px_40px_rgba(13,16,14,0.12)] lg:hidden"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-12 items-center border-b border-[#1A1D1B]/10 text-base focus-visible:outline-2 focus-visible:outline-[#4E6E5D]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/dr-meera-iyer"
            onClick={() => setMobileOpen(false)}
            className="flex min-h-12 items-center border-b border-[#1A1D1B]/10 text-base"
          >
            Therapist profile
          </Link>
          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="mt-5 flex min-h-12 items-center justify-center bg-[#123B32] px-5 text-sm font-semibold text-[#F7F4EE]"
          >
            Get started
          </Link>
        </nav>
      )}
    </motion.header>
  );
}
