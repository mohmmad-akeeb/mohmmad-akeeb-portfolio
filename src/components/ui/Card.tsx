'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', hover = true, onClick, as: Component = 'div', role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props }, ref) => {

    if (Component === 'article') {
      return (
        <motion.article
          ref={ref}
          onClick={onClick}
          className={cn(
            // Base styles
            'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
            'transition-all duration-200 ease-in-out',
            // Interactive styles
            onClick && 'cursor-pointer',
            hover && 'hover:shadow-md hover:border-border/80',
            className
          )}
          whileHover={hover ? {
            y: -2,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }
          } : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          role={role}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          {...props}
        >
          {children}
        </motion.article>
      );
    }

    if (Component === 'section') {
      return (
        <motion.section
          ref={ref}
          onClick={onClick}
          className={cn(
            // Base styles
            'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
            'transition-all duration-200 ease-in-out',
            // Interactive styles
            onClick && 'cursor-pointer',
            hover && 'hover:shadow-md hover:border-border/80',
            className
          )}
          whileHover={hover ? {
            y: -2,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }
          } : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          role={role}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          {...props}
        >
          {children}
        </motion.section>
      );
    }

    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        className={cn(
          // Base styles
          'rounded-lg border border-border bg-card text-card-foreground shadow-sm',
          'transition-all duration-200 ease-in-out',
          // Interactive styles
          onClick && 'cursor-pointer',
          hover && 'hover:shadow-md hover:border-border/80',
          className
        )}
        whileHover={hover ? {
          y: -2,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }
        } : undefined}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-4 sm:p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = '', as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = '', ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 sm:p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-4 sm:p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';