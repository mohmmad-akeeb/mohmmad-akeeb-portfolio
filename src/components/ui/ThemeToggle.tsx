'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, isLoaded } = useTheme();

  // Show loading state until mounted
  if (!isLoaded) {
    return (
      <div
        className={`
          relative p-2 rounded-lg border border-border
          bg-background
          ${className}
        `}
      >
        <div className="w-5 h-5 animate-pulse bg-muted rounded" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg border border-border
        bg-background hover:bg-muted
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        ${className}
      `}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <motion.svg
          className="absolute inset-0 w-5 h-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={false}
          animate={{
            scale: resolvedTheme === 'light' ? 1 : 0,
            rotate: resolvedTheme === 'light' ? 0 : 180,
            opacity: resolvedTheme === 'light' ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          className="absolute inset-0 w-5 h-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={false}
          animate={{
            scale: resolvedTheme === 'dark' ? 1 : 0,
            rotate: resolvedTheme === 'dark' ? 0 : -180,
            opacity: resolvedTheme === 'dark' ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      </div>
    </button>
  );
}