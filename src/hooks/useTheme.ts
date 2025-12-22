'use client';

import { useEffect, useState, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(newTheme);

    // Update CSS variables for immediate effect
    root.style.colorScheme = newTheme;

    // Also update the data attribute for better CSS targeting
    root.setAttribute('data-theme', newTheme);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;

    // Check if theme is already applied by the script
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

    setTheme(currentTheme);

    // Only apply if different from what's already set
    if (currentTheme !== initialTheme) {
      applyTheme(initialTheme);
      setTheme(initialTheme);
    }

    setMounted(true);
  }, [applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme, applyTheme]);

  return {
    theme,
    resolvedTheme: theme,
    toggleTheme,
    isLoaded: mounted,
  };
}