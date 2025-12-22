'use client';

import { motion, Easing } from 'framer-motion';
import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { getAnimationConfig } from '@/lib/performance';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}: FadeInProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  const animationConfig = getAnimationConfig();
  const finalDuration = duration ?? animationConfig.duration;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isIntersecting ? 1 : 0 }}
      transition={{
        duration: finalDuration,
        delay: animationConfig.duration === 0.01 ? 0 : delay,
        ease: animationConfig.ease as Easing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}