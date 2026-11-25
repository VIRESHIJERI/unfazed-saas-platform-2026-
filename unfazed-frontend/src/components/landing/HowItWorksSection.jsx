import Container from '../common/Container';
import Reveal from '../common/Reveal';

const STEPS = [
  {
    number: '01',
    title: 'Set up your therapist profile',
    description:
      'Add your credentials, therapeutic approach, spoken languages, and session fees in minutes.',
  },
  {
    number: '02',
    title: 'Share your branded practice link',
    description:
      'Place your unique unfazed.in link in your Instagram bio, WhatsApp greeting, or personal website.',
  },
  {
    number: '03',
    title: 'Let clients book appointments',
    description:
      'Clients pick an open slot in their local timezone, complete intake & digital consent, and pay upfront.',
  },
  {
    number: '04',
    title: 'Manage your practice from one dashboard',
    description:
      'Run sessions, write private or shared clinical notes, track packages, message clients, and view analytics.',
  },
];

const TIERS_PREVIEW = [
  {
    name: 'Starter',
    audience: 'For therapists launching their private practice',
    highlights: [
      'Branded public profile link (/:slug)',
      'Weekly availability & booking calendar',
      'Client intake & timestamped digital consent',
      'Core client cap managed by platform config',
    ],
  },
  {
    name: 'Growth',
    audience: 'For established independent practices',
    highlights: [
      'Expanded active client capacity',
      '3, 6 & 12-session Razorpay packages + PDF invoices',
      'Structured SOAP / DAP clinical note templates',
      'Full MongoDB-backed practice analytics depth',
    ],
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#F8F7F3] py-20 md:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#52644F]">
              How It Works
            </p>
            <h2 className="mt-3 text-[var(--text-section)] leading-[1.08] text-[var(--ink-primary)]">
              From scattered tools to a settled practice in four steps.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 80}>
              <div className="border-t border-[#242522]/15 pt-6">
                <span className="text-3xl font-bold text-[var(--ink-subtle)] tabular-nums">
                  {step.number}
                </span>
                <h3 className="mt-4 text-[var(--text-card)] leading-tight text-[var(--ink-primary)]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4C4B46]">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Config-Driven Plans Preview (Anchor: #pricing) */}
        <div id="pricing" className="mt-24 border-t border-[#242522]/12 pt-16 md:pt-20">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#52644F]">
                  Flexible Practice Plans
                </p>
                <h2 className="mt-3 text-3xl leading-[1.12] text-[var(--ink-primary)] md:text-4xl">
                  Plans that grow alongside your caseload.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#4C4B46] md:text-base">
                  Subscription tiers and limits are centrally configured so therapists can start lean
                  and unlock structured note templates, higher client caps, and deeper analytics
                  when ready.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
                {TIERS_PREVIEW.map((tier, idx) => (
                  <div
                    key={tier.name}
                    className={`rounded-[12px] border p-7 ${
                      idx === 1
                        ? 'border-[#52644F]/35 bg-[#F0EEE7]'
                        : 'border-[#242522]/12 bg-white'
                    }`}
                  >
                    <p className="text-2xl font-bold text-[var(--ink-primary)]">{tier.name}</p>
                    <p className="mt-1.5 text-xs text-[#67655E]">{tier.audience}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-[#242522]/10 pt-5 text-sm text-[#4C4B46]">
                      {tier.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-[#52644F]"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
