import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

const FOOTER_LINKS = [
  {
    title: 'Platform',
    links: [
      { label: 'Overview', href: '/#platform' },
      { label: 'Scheduling', href: '/#platform' },
      { label: 'Therapist profile', href: '/dr-meera-iyer' },
      { label: 'Book a session', href: '/book/dr-meera-iyer' },
    ],
  },
  {
    title: 'Practice',
    links: [
      { label: 'Getting started', href: '/#getting-started' },
      { label: 'For therapists', href: '/#showcase' },
      { label: 'Log in', href: '/login' },
      { label: 'Create a workspace', href: '/register' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Frequently asked questions', href: '/#faq' },
      { label: 'Contact', href: 'mailto:hello@unfazzed.in' },
      { label: 'Privacy', href: '/#footer' },
      { label: 'Terms', href: '/#footer' },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#0D100E] text-[#FAF8F4]">
      <div className="bg-editorial-grain pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 md:pt-20 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-[#FAF8F4]/15 pb-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 lg:col-span-4">
            <Link to="/" aria-label="UNFAZZED home" className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A9BEAD]">
              <BrandLogo inverse tagline="Heal · Reflect · Thrive" />
            </Link>
            <p className="mt-6 max-w-[38ch] text-sm leading-7 text-[#D8E2DC]">
              A considered workspace for independent therapists: keep the practice in order, and make more room for care.
            </p>
            <p className="mt-5 font-mono text-[11px] tracking-wide text-[#D8E2DC]/70">
              Built for thoughtful practices across India
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#A9BEAD]">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith('mailto:') ? (
                        <a className="text-sm text-[#D8E2DC]/80 transition-colors hover:text-[#FAF8F4] focus-visible:outline-2 focus-visible:outline-[#A9BEAD]" href={item.href}>
                          {item.label}
                        </a>
                      ) : (
                        <Link className="text-sm text-[#D8E2DC]/80 transition-colors hover:text-[#FAF8F4] focus-visible:outline-2 focus-visible:outline-[#A9BEAD]" to={item.href}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[11px] text-[#D8E2DC]/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} UNFAZZED. Made for more thoughtful practice.</p>
          <p>Profiles and schedules shown are examples.</p>
        </div>
      </div>
    </footer>
  );
}
