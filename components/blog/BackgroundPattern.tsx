'use client';

import { useId } from 'react';

type PatternVariant = 'dots' | 'grid' | 'waves' | 'leaves' | 'cross';

interface BackgroundPatternProps {
  variant?: PatternVariant;
  className?: string;
  opacity?: number;
}

function PatternContent({
  variant,
  id,
}: {
  variant: PatternVariant;
  id: string;
}) {
  const common = { patternUnits: 'userSpaceOnUse' as const };
  switch (variant) {
    case 'dots':
      return (
        <pattern id={id} x="0" y="0" width="24" height="24" {...common}>
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      );
    case 'grid':
      return (
        <pattern id={id} x="0" y="0" width="40" height="40" {...common}>
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      );
    case 'waves':
      return (
        <pattern id={id} x="0" y="0" width="80" height="40" {...common}>
          <path d="M0 20 Q20 0 40 20 T80 20" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0 28 Q20 8 40 28 T80 28" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      );
    case 'leaves':
      return (
        <pattern id={id} x="0" y="0" width="60" height="60" {...common}>
          <path d="M30 5 C20 15 25 30 30 55 C35 30 40 15 30 5" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <path d="M5 35 C15 25 30 30 55 35" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      );
    case 'cross':
      return (
        <pattern id={id} x="0" y="0" width="20" height="20" {...common}>
          <path d="M10 0 v20 M0 10 h20" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </pattern>
      );
  }
}

export function BackgroundPattern({
  variant = 'dots',
  className = '',
  opacity = 0.08,
}: BackgroundPatternProps) {
  const uid = useId().replace(/:/g, '');
  const patternId = `blog-pattern-${variant}-${uid}`;
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    >
      <svg className="h-full w-full text-primary-600" style={{ opacity }}>
        <defs>
          <PatternContent variant={variant} id={patternId} />
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
