import Container from '../common/Container';
import Reveal from '../common/Reveal';

const PLATFORM_PILLARS = [
  {
    category: 'Practice management',
    title: 'One unified workspace',
    detail: 'Branded profile, client CRM, session packages, and billing structured around solo clinicians.',
  },
  {
    category: 'Client experience',
    title: 'Calm, guided onboarding',
    detail: 'Clients discover your profile, submit intake, record consent, and book without friction.',
  },
  {
    category: 'Scheduling',
    title: 'Timezone-aware slots',
    detail: '30, 45, 60, and 90-minute durations with buffer windows and double-booking prevention.',
  },
  {
    category: 'Secure documentation',
    title: 'Strict private separation',
    detail: 'Private clinical notes stay restricted to the therapist and are excluded from client APIs.',
  },
];

export default function CapabilitiesStrip() {
  return (
    <section
      id="capabilities"
      className="border-y border-[#242522]/10 bg-[#F0EEE7] py-14 md:py-16"
      aria-label="Platform Capabilities"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {PLATFORM_PILLARS.map((item, idx) => (
            <Reveal key={item.category} delay={idx * 70}>
              <div className="border-t border-[#242522]/15 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#52644F]">
                  {item.category}
                </p>
                <h2 className="mt-2 text-lg font-bold leading-tight text-[var(--ink-primary)]">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4C4B46]">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
