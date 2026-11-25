import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import Button from './Button';

const NAV_LINKS = [
  { label: 'Product', href: '/#product' },
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Resources', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[var(--bg-canvas)]/95 backdrop-blur-md border-b border-[var(--border-hairline)]'
          : 'bg-[var(--bg-canvas)]/95 border-b border-[var(--border-hairline)]'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Left: Wordmark */}
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-[#242522] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#52644F]"
            aria-label="UNFAZZED Home"
          >
            <span className="inline-block h-2 w-2 rounded-sm bg-[#3F6454]" aria-hidden="true" />
            <span className="font-sans text-[14px] font-bold tracking-[0.18em] uppercase">
              UNFAZZED
            </span>
          </Link>

          {/* Center: Minimal Navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-normal text-[#4C4B46] transition-colors duration-150 hover:text-[#242522]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-3 py-2 text-sm font-medium text-[#242522] transition-opacity duration-150 hover:opacity-70"
            >
              Log in
            </Link>
            <Button to="/register" variant="dark" size="sm" className="px-5 py-2.5 text-sm">
              Get started
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-hairline-strong)] text-[var(--ink-primary)]"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 6H15M3 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#242522]/10 bg-[#F8F7F3] px-6 pb-8 pt-6">
          <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-xl font-semibold text-[var(--ink-primary)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3 border-t border-[#242522]/10 pt-6">
            <Button to="/register" variant="dark" size="lg" onClick={() => setMobileOpen(false)}>
              Get started
            </Button>
            <Button to="/login" variant="secondary" size="lg" onClick={() => setMobileOpen(false)}>
              Log in
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
