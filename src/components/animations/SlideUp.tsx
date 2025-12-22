'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}: SlideUpProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: distance 
      }}
      animate={{ 
        opacity: isIntersecting ? 1 : 0,
        y: isIntersecting ? 0 : distance
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}