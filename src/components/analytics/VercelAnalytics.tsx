'use client';

import { Analytics } from '@vercel/analytics/react';

export function VercelAnalytics() {
  // Vercel Analytics works automatically when deployed on Vercel
  // The NEXT_PUBLIC_VERCEL_ANALYTICS_ID is optional for custom configuration
  return <Analytics debug={process.env.NODE_ENV === 'development'} />;
}