// Accessibility testing utilities for development

interface AccessibilityTest {
  name: string;
  test: () => boolean | string[];
  severity: 'error' | 'warning' | 'info';
  description: string;
}

// Test for keyboard navigation
export const testKeyboardNavigation = (): string[] => {
  const issues: string[] = [];
  
  // Check for focusable elements without visible focus indicators
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    const hasFocusOutline = computedStyle.outline !== 'none' || 
                           computedStyle.boxShadow !== 'none' ||
                           element.classList.contains('focus:outline') ||
                           element.classList.contains('focus:ring');
    
    if (!hasFocusOutline) {
      issues.push(`Focusable element ${element.tagName}[${index}] may lack visible focus indicator`);
    }
  });
  
  return issues;
};

// Test for proper heading hierarchy
export const testHeadingHierarchy = (): string[] => {
  const issues: string[] = [];
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  let lastLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    
    if (index === 0 && level !== 1) {
      issues.push('Page should start with h1');
    }
    
    if (level > lastLevel + 1) {
      issues.push(`Heading level skipped: ${heading.tagName} after h${lastLevel}`);
    }
    
    lastLevel = level;
  });
  
  return issues;
};

// Test for alt text on images
export const testImageAltText = (): string[] => {
  const issues: string[] = [];
  const images = document.querySelectorAll('img');
  
  images.forEach((img, index) => {
    const alt = img.getAttribute('alt');
    const ariaHidden = img.getAttribute('aria-hidden') === 'true';
    const role = img.getAttribute('role');
    
    if (!alt && !ariaHidden && role !== 'presentation') {
      issues.push(`Image[${index}] missing alt text: ${img.src}`);
    }
    
    if (alt && alt.length > 125) {
      issues.push(`Image[${index}] alt text too long (${alt.length} chars): ${img.src}`);
    }
  });
  
  return issues;
};

// Test for form accessibility
export const testFormAccessibility = (): string[] => {
  const issues: string[] = [];
  const forms = document.querySelectorAll('form');
  
  forms.forEach((form, formIndex) => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach((input, inputIndex) => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledBy = input.getAttribute('aria-labelledby');
      const label = id ? form.querySelector(`label[for="${id}"]`) : null;
      
      if (!ariaLabel && !ariaLabelledBy && !label) {
        issues.push(`Form[${formIndex}] Input[${inputIndex}] missing label`);
      }
      
      if (input.hasAttribute('required') && input.getAttribute('aria-required') !== 'true') {
        issues.push(`Form[${formIndex}] Required input[${inputIndex}] missing aria-required`);
      }
    });
  });
  
  return issues;
};

// Test for color contrast (simplified)
export const testColorContrast = (): string[] => {
  const issues: string[] = [];
  
  // This is a simplified test - in practice, you'd use a more sophisticated algorithm
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label');
  
  textElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.backgroundColor;
    
    // Simple check for transparent or very light backgrounds
    if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
      // Check parent background
      let parent = element.parentElement;
      let parentBg = 'transparent';
      
      while (parent && parentBg === 'transparent') {
        parentBg = window.getComputedStyle(parent).backgroundColor;
        parent = parent.parentElement;
      }
      
      if (parentBg === 'transparent' || parentBg === 'rgba(0, 0, 0, 0)') {
        issues.push(`Element[${index}] ${element.tagName} may have insufficient color contrast`);
      }
    }
  });
  
  return issues;
};

// Test for ARIA attributes
export const testAriaAttributes = (): string[] => {
  const issues: string[] = [];
  
  // Check for invalid ARIA attributes
  const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
  
  elementsWithAria.forEach((element, index) => {
    const ariaLabel = element.getAttribute('aria-label');
    const ariaLabelledBy = element.getAttribute('aria-labelledby');
    const ariaDescribedBy = element.getAttribute('aria-describedby');
    const role = element.getAttribute('role');
    
    if (ariaLabel && ariaLabel.trim() === '') {
      issues.push(`Element[${index}] has empty aria-label`);
    }
    
    if (ariaLabelledBy) {
      const referencedElement = document.getElementById(ariaLabelledBy);
      if (!referencedElement) {
        issues.push(`Element[${index}] aria-labelledby references non-existent element: ${ariaLabelledBy}`);
      }
    }
    
    if (ariaDescribedBy) {
      const referencedElement = document.getElementById(ariaDescribedBy);
      if (!referencedElement) {
        issues.push(`Element[${index}] aria-describedby references non-existent element: ${ariaDescribedBy}`);
      }
    }
    
    // Check for valid roles (simplified list)
    const validRoles = [
      'button', 'link', 'img', 'presentation', 'none', 'main', 'navigation', 
      'banner', 'contentinfo', 'complementary', 'region', 'article', 'section',
      'list', 'listitem', 'table', 'row', 'cell', 'columnheader', 'rowheader'
    ];
    
    if (role && !validRoles.includes(role)) {
      issues.push(`Element[${index}] has potentially invalid role: ${role}`);
    }
  });
  
  return issues;
};

// Test for semantic HTML
export const testSemanticHTML = (): string[] => {
  const issues: string[] = [];
  
  // Check for proper landmark usage
  const main = document.querySelector('main');
  if (!main) {
    issues.push('Page missing main landmark');
  }
  
  const nav = document.querySelector('nav');
  if (!nav) {
    issues.push('Page missing navigation landmark');
  }
  
  // Check for generic div/span usage where semantic elements would be better
  const clickableDivs = document.querySelectorAll('div[onclick], span[onclick]');
  if (clickableDivs.length > 0) {
    issues.push(`Found ${clickableDivs.length} clickable div/span elements - consider using button elements`);
  }
  
  return issues;
};

// Test for touch targets
export const testTouchTargets = (): string[] => {
  const issues: string[] = [];
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [onclick], [tabindex]:not([tabindex="-1"])');
  
  interactiveElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const minSize = 44; // WCAG recommended minimum
    
    if (rect.width < minSize || rect.height < minSize) {
      issues.push(`Interactive element[${index}] ${element.tagName} too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px (minimum: ${minSize}x${minSize}px)`);
    }
  });
  
  return issues;
};

// Comprehensive accessibility test suite
export const runAccessibilityTests = () => {
  const tests: AccessibilityTest[] = [
    {
      name: 'Keyboard Navigation',
      test: testKeyboardNavigation,
      severity: 'error',
      description: 'Ensures all interactive elements have visible focus indicators'
    },
    {
      name: 'Heading Hierarchy',
      test: testHeadingHierarchy,
      severity: 'error',
      description: 'Checks for proper heading structure (h1-h6)'
    },
    {
      name: 'Image Alt Text',
      test: testImageAltText,
      severity: 'error',
      description: 'Verifies all images have appropriate alt text'
    },
    {
      name: 'Form Accessibility',
      test: testFormAccessibility,
      severity: 'error',
      description: 'Ensures forms have proper labels and ARIA attributes'
    },
    {
      name: 'Color Contrast',
      test: testColorContrast,
      severity: 'warning',
      description: 'Basic color contrast validation'
    },
    {
      name: 'ARIA Attributes',
      test: testAriaAttributes,
      severity: 'error',
      description: 'Validates ARIA attributes and references'
    },
    {
      name: 'Semantic HTML',
      test: testSemanticHTML,
      severity: 'warning',
      description: 'Checks for proper use of semantic HTML elements'
    },
    {
      name: 'Touch Targets',
      test: testTouchTargets,
      severity: 'warning',
      description: 'Ensures interactive elements meet minimum size requirements'
    }
  ];
  
  const results = tests.map(test => {
    const issues = test.test();
    return {
      ...test,
      issues: Array.isArray(issues) ? issues : [],
      passed: Array.isArray(issues) ? issues.length === 0 : issues
    };
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.group('🔍 Accessibility Test Results');
    
    results.forEach(result => {
      if (result.issues.length > 0) {
        console.group(`❌ ${result.name} (${result.issues.length} issues)`);
        result.issues.forEach(issue => {
          console.log(`  • ${issue}`);
        });
        console.groupEnd();
      } else {
        console.log(`✅ ${result.name}`);
      }
    });
    
    const totalIssues = results.reduce((sum, result) => sum + result.issues.length, 0);
    console.log(`\nTotal issues found: ${totalIssues}`);
    console.groupEnd();
  }
  
  return results;
};

// Auto-run tests in development
export const initAccessibilityTesting = () => {
  if (process.env.NODE_ENV !== 'development') return;
  
  // Run tests after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAccessibilityTests);
  } else {
    runAccessibilityTests();
  }
  
  // Re-run tests on significant DOM changes
  const observer = new MutationObserver(() => {
    // Debounce the test runs
    clearTimeout((window as unknown as { a11yTestTimeout?: NodeJS.Timeout }).a11yTestTimeout);
    (window as unknown as { a11yTestTimeout?: NodeJS.Timeout }).a11yTestTimeout = setTimeout(runAccessibilityTests, 1000);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-label', 'aria-labelledby', 'aria-describedby', 'role', 'alt']
  });
  
  return observer;
};