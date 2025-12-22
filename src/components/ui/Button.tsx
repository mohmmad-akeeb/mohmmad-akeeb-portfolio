'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { ButtonProps } from '@/types';

const buttonVariants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-secondary',
  outline: 'border-border bg-background hover:bg-muted text-foreground hover:text-foreground',
};

const buttonSizes = {
  sm: 'h-10 px-3 text-sm touch-target',
  md: 'h-11 px-4 py-2 touch-target',
  lg: 'h-12 px-6 sm:px-8 text-responsive-base sm:text-responsive-lg touch-target',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    onClick, 
    disabled = false, 
    className = '', 
    type = 'button',
    ...props 
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-md border font-medium',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          className
        )}
        whileHover={!disabled ? { scale: 1.02 } : undefined}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 17,
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';