import { Link } from 'react-router-dom';
import Container from './Container';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#product' },
      { label: 'Scheduling', href: '/#experience' },
      { label: 'Client management', href: '/#experience' },
      { label: 'Payments', href: '/#experience' },
      { label: 'Analytics', href: '/#experience' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Independent therapists', href: '/#solutions' },
      { label: 'Counsellors', href: '/#solutions' },
      { label: 'Mental wellness professionals', href: '/#solutions' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help center', href: '/#how-it-works' },
      { label: 'Guides', href: '/#how-it-works' },
      { label: 'Platform overview', href: '/#capabilities' },
      { label: 'Contact', href: 'mailto:hello@unfazed.in' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#intro' },
      { label: 'Privacy', href: '/#security' },
      { label: 'Terms', href: '/#security' },
      { label: 'Security', href: '/#security' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#242522] text-[#F8F7F3] border-t border-[#F8F7F3]/10">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5 text-[#F8F7F3]">
              <span className="inline-block h-2 w-2 rounded-sm bg-[#A6B39A]" aria-hidden="true" />
              <span className="font-sans text-[15px] font-semibold tracking-[0.22em] uppercase">
                UNFAZZED
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-[#C5C3BA]">
              A calm, private-practice operating system designed for independent therapists,
              counsellors, and mental wellness professionals across India.
            </p>
            <p className="text-xs tracking-wide text-[#8B8982]">
              Built for INR billing, IST-first scheduling, and confidential clinical documentation.
            </p>
          </div>

          {/* 4 Organized Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#A6B39A]">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-[#C5C3BA] transition-colors duration-150 hover:text-[#F8F7F3]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#F8F7F3]/10 pt-8 text-xs text-[#8B8982] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} UNFAZZED. Designed for thoughtful therapy practices.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span>Demo profiles shown on this page are illustrative.</span>
            <Link to="/login" className="text-[#C5C3BA] hover:text-[#F8F7F3]">
              Therapist Sign In
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
