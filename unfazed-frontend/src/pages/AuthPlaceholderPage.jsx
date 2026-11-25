import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Container from '../components/common/Container';
import Button from '../components/common/Button';

export default function AuthPlaceholderPage({ mode = 'login' }) {
  const isRegister = mode === 'register';

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F7F3] text-[#242522]">
      <Navbar />
      <main className="flex flex-1 items-center py-20">
        <Container>
          <div className="mx-auto max-w-lg rounded-[12px] border border-[var(--border-hairline)] bg-white p-8 shadow-[var(--shadow-soft)] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3F6454]">
              Module 1 Upcoming
            </p>
            <h1 className="mt-3 text-3xl text-[var(--ink-primary)] md:text-4xl">
              {isRegister ? 'Create your therapist workspace' : 'Sign in to UNFAZZED'}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#4C4B46]">
              {isRegister
                ? 'Therapist registration, bcrypt password hashing, JWT authentication, and custom public slug creation will be wired to the Express + MongoDB Atlas backend in Phase 2 (Module 1).'
                : 'Therapist authentication and JWT session management will be connected to the Express + MongoDB Atlas API in Phase 2 (Module 1).'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#242522]/10 pt-6">
              <Button to="/" variant="dark" size="md">
                Back to overview
              </Button>
              <Link
                to={isRegister ? '/login' : '/register'}
                className="px-3 py-2 text-sm font-medium text-[#52644F] hover:text-[#242522]"
              >
                {isRegister ? 'Already have an account? Log in' : 'New practice? Get started'}
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
