import { Link } from 'react-router-dom';

const VARIANTS = {
  primary:
    'bg-[#123B32] text-[#F7F4EE] hover:bg-[#0D3029] border border-[#123B32] hover:border-[#0D3029]',
  secondary:
    'bg-transparent text-[#242522] border border-[#242522]/25 hover:border-[#242522] hover:bg-[#242522]/[0.04]',
  dark:
    'bg-[#242522] text-[#F8F7F3] border border-[#242522] hover:bg-[#343631]',
  light:
    'bg-[#F8F7F3] text-[#242522] border border-[#F8F7F3] hover:bg-[#F0EEE7]',
  'ghost-light':
    'bg-transparent text-[#F8F7F3] border border-[#F8F7F3]/30 hover:border-[#F8F7F3] hover:bg-[#F8F7F3]/10',
  ghost:
    'bg-transparent text-[#242522] border border-transparent hover:bg-[#242522]/[0.05]',
};

const SIZES = {
  sm: 'px-4 py-2 text-xs tracking-wide',
  md: 'px-6 py-3 text-sm tracking-[0.01em]',
  lg: 'px-7 py-3.5 text-[15px] tracking-[0.01em]',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = [
    'inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F6454] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    className,
  ].join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
