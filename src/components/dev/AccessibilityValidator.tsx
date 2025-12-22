'use client';

import { useEffect, useState } from 'react';
import { validateThemeContrast, validateFormAccessibility, prefersReducedMotion, prefersHighContrast } from '@/lib/accessibility';

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  element?: string;
}

export function AccessibilityValidator() {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const validateAccessibility = () => {
      const newIssues: AccessibilityIssue[] = [];

      // Validate color contrast
      const contrastResults = validateThemeContrast();
      contrastResults.forEach(result => {
        if (!result.passesAA) {
          newIssues.push({
            type: 'error',
            message: `${result.name} fails WCAG AA contrast (${result.ratio.toFixed(2)}:1)`,
          });
        } else if (!result.passesAAA) {
          newIssues.push({
            type: 'warning',
            message: `${result.name} fails WCAG AAA contrast (${result.ratio.toFixed(2)}:1)`,
          });
        }
      });

      // Check for missing alt text on images
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt && !img.getAttribute('aria-hidden')) {
          newIssues.push({
            type: 'error',
            message: `Image missing alt text`,
            element: `img[${index}]`,
          });
        }
      });

      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let lastLevel = 0;
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > lastLevel + 1) {
          newIssues.push({
            type: 'warning',
            message: `Heading level skipped: ${heading.tagName} after h${lastLevel}`,
            element: `${heading.tagName.toLowerCase()}[${index}]`,
          });
        }
        lastLevel = level;
      });

      // Check for forms without proper labels
      const forms = document.querySelectorAll('form');
      forms.forEach((form, index) => {
        const formIssues = validateFormAccessibility(form);
        formIssues.forEach(issue => {
          newIssues.push({
            type: 'error',
            message: issue,
            element: `form[${index}]`,
          });
        });
      });

      // Check for buttons without accessible names
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button, index) => {
        const hasText = button.textContent?.trim();
        const hasAriaLabel = button.getAttribute('aria-label');
        const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
        
        if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
          newIssues.push({
            type: 'error',
            message: `Button missing accessible name`,
            element: `button[${index}]`,
          });
        }
      });

      // Check for links without accessible names
      const links = document.querySelectorAll('a');
      links.forEach((link, index) => {
        const hasText = link.textContent?.trim();
        const hasAriaLabel = link.getAttribute('aria-label');
        const hasAriaLabelledBy = link.getAttribute('aria-labelledby');
        
        if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
          newIssues.push({
            type: 'error',
            message: `Link missing accessible name`,
            element: `a[${index}]`,
          });
        }
      });

      // Check user preferences
      if (prefersReducedMotion()) {
        newIssues.push({
          type: 'info',
          message: 'User prefers reduced motion - animations should be minimal',
        });
      }

      if (prefersHighContrast()) {
        newIssues.push({
          type: 'info',
          message: 'User prefers high contrast - ensure enhanced contrast ratios',
        });
      }

      setIssues(newIssues);
    };

    // Initial validation
    validateAccessibility();

    // Re-validate on DOM changes
    const observer = new MutationObserver(validateAccessibility);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['alt', 'aria-label', 'aria-labelledby'],
    });

    return () => observer.disconnect();
  }, []);

  if (process.env.NODE_ENV !== 'development' || issues.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`
          px-3 py-2 rounded-lg text-sm font-medium transition-colors
          ${issues.some(i => i.type === 'error') 
            ? 'bg-red-500 text-white' 
            : issues.some(i => i.type === 'warning')
            ? 'bg-yellow-500 text-black'
            : 'bg-blue-500 text-white'
          }
        `}
        aria-label={`Accessibility issues: ${issues.length} found`}
      >
        A11y ({issues.length})
      </button>

      {isVisible && (
        <div className="absolute bottom-12 right-0 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Accessibility Issues
          </h3>
          
          <div className="space-y-2">
            {issues.map((issue, index) => (
              <div
                key={index}
                className={`
                  p-2 rounded text-sm
                  ${issue.type === 'error' 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200' 
                    : issue.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                  }
                `}
              >
                <div className="font-medium capitalize">{issue.type}</div>
                <div>{issue.message}</div>
                {issue.element && (
                  <div className="text-xs opacity-75 mt-1">{issue.element}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}