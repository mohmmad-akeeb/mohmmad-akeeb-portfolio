// Validation utilities for accessibility and performance

import { validateThemeContrast, validateFormAccessibility } from './accessibility';
import { prefersReducedMotion, isSlowConnection } from './performance';

export interface ValidationResult {
  category: string;
  test: string;
  passed: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

// Run comprehensive accessibility validation
export const runAccessibilityValidation = (): ValidationResult[] => {
  const results: ValidationResult[] = [];

  // Color contrast validation
  const contrastResults = validateThemeContrast();
  contrastResults.forEach(result => {
    results.push({
      category: 'Color Contrast',
      test: result.name,
      passed: result.passesAA,
      message: `Contrast ratio: ${result.ratio.toFixed(2)} ${result.passesAA ? '(WCAG AA compliant)' : '(Fails WCAG AA)'}`,
      severity: result.passesAA ? 'info' : 'error'
    });
  });

  // Form validation (if forms exist)
  const forms = document.querySelectorAll('form');
  forms.forEach((form, index) => {
    const formIssues = validateFormAccessibility(form);
    if (formIssues.length === 0) {
      results.push({
        category: 'Form Accessibility',
        test: `Form ${index + 1}`,
        passed: true,
        message: 'All accessibility requirements met',
        severity: 'info'
      });
    } else {
      formIssues.forEach(issue => {
        results.push({
          category: 'Form Accessibility',
          test: `Form ${index + 1}`,
          passed: false,
          message: issue,
          severity: 'error'
        });
      });
    }
  });

  // Image alt text validation
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    const alt = img.getAttribute('alt');
    const isDecorative = img.getAttribute('aria-hidden') === 'true';
    
    if (!alt && !isDecorative) {
      results.push({
        category: 'Image Accessibility',
        test: `Image ${index + 1}`,
        passed: false,
        message: 'Image missing alt text',
        severity: 'error'
      });
    } else {
      results.push({
        category: 'Image Accessibility',
        test: `Image ${index + 1}`,
        passed: true,
        message: alt ? `Alt text: "${alt}"` : 'Decorative image properly marked',
        severity: 'info'
      });
    }
  });

  // Heading structure validation
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  let hasH1 = false;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    
    if (level === 1) {
      if (hasH1) {
        results.push({
          category: 'Heading Structure',
          test: `Heading ${index + 1}`,
          passed: false,
          message: 'Multiple H1 elements found',
          severity: 'warning'
        });
      }
      hasH1 = true;
    }
    
    if (previousLevel > 0 && level > previousLevel + 1) {
      results.push({
        category: 'Heading Structure',
        test: `Heading ${index + 1}`,
        passed: false,
        message: `Heading level skipped (H${previousLevel} to H${level})`,
        severity: 'warning'
      });
    }
    
    previousLevel = level;
  });

  if (!hasH1) {
    results.push({
      category: 'Heading Structure',
      test: 'Page structure',
      passed: false,
      message: 'No H1 element found',
      severity: 'error'
    });
  }

  // Keyboard navigation validation
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  results.push({
    category: 'Keyboard Navigation',
    test: 'Focusable elements',
    passed: focusableElements.length > 0,
    message: `${focusableElements.length} focusable elements found`,
    severity: focusableElements.length > 0 ? 'info' : 'warning'
  });

  return results;
};

// Run performance validation
export const runPerformanceValidation = (): ValidationResult[] => {
  const results: ValidationResult[] = [];

  // Check for reduced motion preference
  const reducedMotion = prefersReducedMotion();
  results.push({
    category: 'Performance',
    test: 'Reduced motion preference',
    passed: true,
    message: reducedMotion ? 'User prefers reduced motion - animations disabled' : 'Animations enabled',
    severity: 'info'
  });

  // Check connection speed
  const slowConnection = isSlowConnection();
  results.push({
    category: 'Performance',
    test: 'Connection speed',
    passed: true,
    message: slowConnection ? 'Slow connection detected - optimizations applied' : 'Normal connection speed',
    severity: 'info'
  });

  // Check for lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const totalImages = document.querySelectorAll('img').length;
  
  results.push({
    category: 'Performance',
    test: 'Image lazy loading',
    passed: lazyImages.length > 0,
    message: `${lazyImages.length}/${totalImages} images use lazy loading`,
    severity: lazyImages.length > 0 ? 'info' : 'warning'
  });

  // Check for preload links
  const preloadLinks = document.querySelectorAll('link[rel="preload"]');
  results.push({
    category: 'Performance',
    test: 'Resource preloading',
    passed: preloadLinks.length > 0,
    message: `${preloadLinks.length} resources preloaded`,
    severity: 'info'
  });

  return results;
};

// Run all validations
export const runAllValidations = (): ValidationResult[] => {
  const accessibilityResults = runAccessibilityValidation();
  const performanceResults = runPerformanceValidation();
  
  return [...accessibilityResults, ...performanceResults];
};

// Generate validation report
export const generateValidationReport = (results: ValidationResult[]) => {
  const errors = results.filter(r => r.severity === 'error');
  const warnings = results.filter(r => r.severity === 'warning');
  const info = results.filter(r => r.severity === 'info');
  
  const report = {
    summary: {
      total: results.length,
      errors: errors.length,
      warnings: warnings.length,
      info: info.length,
      passed: results.filter(r => r.passed).length
    },
    results: {
      errors,
      warnings,
      info
    }
  };
  
  if (process.env.NODE_ENV === 'development') {
    console.group('🔍 Accessibility & Performance Validation Report');
    console.log('📊 Summary:', report.summary);
    
    if (errors.length > 0) {
      console.group('❌ Errors');
      errors.forEach(error => console.error(`${error.category}: ${error.message}`));
      console.groupEnd();
    }
    
    if (warnings.length > 0) {
      console.group('⚠️ Warnings');
      warnings.forEach(warning => console.warn(`${warning.category}: ${warning.message}`));
      console.groupEnd();
    }
    
    console.groupEnd();
  }
  
  return report;
};