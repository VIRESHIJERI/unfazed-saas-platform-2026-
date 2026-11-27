type BrandMarkProps = {
  className?: string;
  stroke?: string;
};

type BrandLogoProps = {
  className?: string;
  inverse?: boolean;
  variant?: 'full' | 'icon';
  tagline?: string;
};

export function BrandMark({ className = '', stroke = 'currentColor' }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 31V15.5M14.4 31h11.2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 23C13.1 23 9.2 18.9 9.2 13.1c6 0 10.1 3.2 10.8 9.3M20 18C26.4 18 30.8 14.4 30.8 8.5c-6 0-10 3.1-10.8 9.1"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m19.1 21.2-6.2-6.4m8-1.6 6.1-5.4" stroke={stroke} strokeWidth="0.9" strokeLinecap="round" opacity="0.72" />
    </svg>
  );
}

export function BrandLogo({
  className = '',
  inverse = false,
  variant = 'full',
  tagline,
}: BrandLogoProps) {
  const ink = inverse ? '#F7F4EE' : '#123B32';
  const iconOnly = variant === 'icon';
  return (
    <span className={`inline-flex shrink-0 flex-col items-start ${className}`} style={{ color: ink }}>
      <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
        <BrandMark className={iconOnly ? 'h-8 w-8 shrink-0' : 'h-9 w-9 shrink-0'} stroke={ink} />
        {!iconOnly && (
          <span className="font-display text-[0.88rem] font-semibold leading-none tracking-[0.17em]">
            UNFAZZED
          </span>
        )}
      </span>
      {!iconOnly && tagline && (
        <span className="ml-[46px] mt-1.5 font-mono text-[8px] font-medium uppercase leading-none tracking-[0.16em] opacity-75">
          {tagline}
        </span>
      )}
    </span>
  );
}

