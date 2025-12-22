'use client';

import { ReactNode } from 'react';

interface ScreenReaderOnlyProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

export function ScreenReaderOnly({ 
  children, 
  as: Component = 'span',
  className = '' 
}: ScreenReaderOnlyProps) {
  return (
    <Component 
      className={`sr-only ${className}`}
      aria-hidden="false"
    >
      {children}
    </Component>
  );
}

interface LiveRegionProps {
  children: ReactNode;
  politeness?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text';
  className?: string;
}

export function LiveRegion({
  children,
  politeness = 'polite',
  atomic = false,
  relevant = 'additions text',
  className = ''
}: LiveRegionProps) {
  return (
    <div
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className={`sr-only ${className}`}
    >
      {children}
    </div>
  );
}