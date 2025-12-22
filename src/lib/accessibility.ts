// Accessibility utilities and validation

// Convert hex color to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Calculate relative luminance
export const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio between two colors
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

// Check if contrast ratio meets WCAG guidelines
export const meetsWCAGContrast = (
  foreground: string, 
  background: string, 
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  
  if (level === 'AAA') {
    return size === 'large' ? ratio >= 4.5 : ratio >= 7;
  } else {
    return size === 'large' ? ratio >= 3 : ratio >= 4.5;
  }
};

// Validate color combinations used in the theme
export const validateThemeContrast = () => {
  const validations = [
    {
      name: 'Primary text on background',
      foreground: '#171717', // --foreground light
      background: '#ffffff', // --background light
    },
    {
      name: 'Primary text on background (dark)',
      foreground: '#ededed', // --foreground dark
      background: '#0a0a0a', // --background dark
    },
    {
      name: 'Muted text on background',
      foreground: '#737373', // --muted-foreground light
      background: '#ffffff', // --background light
    },
    {
      name: 'Muted text on background (dark)',
      foreground: '#a3a3a3', // --muted-foreground dark
      background: '#0a0a0a', // --background dark
    },
    {
      name: 'Primary button text',
      foreground: '#ffffff', // --primary-foreground light
      background: '#171717', // --primary light
    },
    {
      name: 'Primary button text (dark)',
      foreground: '#0a0a0a', // --primary-foreground dark
      background: '#ededed', // --primary dark
    },
  ];

  const results = validations.map(({ name, foreground, background }) => ({
    name,
    ratio: getContrastRatio(foreground, background),
    passesAA: meetsWCAGContrast(foreground, background, 'AA'),
    passesAAA: meetsWCAGContrast(foreground, background, 'AAA'),
  }));

  if (process.env.NODE_ENV === 'development') {
    console.table(results);
  }

  return results;
};

// Keyboard navigation helpers
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

// Screen reader announcements
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if user prefers high contrast
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
};

// Validate form accessibility
export const validateFormAccessibility = (form: HTMLFormElement) => {
  const issues: string[] = [];
  
  // Check for labels
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!id || (!ariaLabel && !ariaLabelledBy)) {
      const label = form.querySelector(`label[for="${id}"]`);
      if (!label) {
        issues.push(`Input missing proper label: ${input.tagName}`);
      }
    }
  });
  
  // Check for required field indicators
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach((input) => {
    const ariaRequired = input.getAttribute('aria-required');
    if (ariaRequired !== 'true') {
      issues.push(`Required field missing aria-required: ${input.getAttribute('name') || 'unnamed'}`);
    }
  });
  
  return issues;
};

// Generate accessible color palette
export const generateAccessiblePalette = (baseColor: string) => {
  // This is a simplified version - in practice, you'd use a more sophisticated algorithm
  const rgb = hexToRgb(baseColor);
  if (!rgb) return null;
  
  const variations = [];
  for (let i = 0; i < 10; i++) {
    const factor = i / 9; // 0 to 1
    const r = Math.round(rgb.r * (1 - factor) + 255 * factor);
    const g = Math.round(rgb.g * (1 - factor) + 255 * factor);
    const b = Math.round(rgb.b * (1 - factor) + 255 * factor);
    
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    variations.push(hex);
  }
  
  return variations;
};