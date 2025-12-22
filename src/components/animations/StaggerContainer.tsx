'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  role,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: StaggerContainerProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      className={className}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}