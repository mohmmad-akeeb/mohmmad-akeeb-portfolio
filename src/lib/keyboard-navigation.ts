// Keyboard navigation utilities

export const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]'
].join(', ');

// Get all focusable elements within a container
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  return Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS)) as HTMLElement[];
};

// Focus trap for modals and overlays
export const createFocusTrap = (container: HTMLElement) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // Allow custom escape handling
      const escapeEvent = new CustomEvent('focustrap:escape', { bubbles: true });
      container.dispatchEvent(escapeEvent);
    }
  };

  container.addEventListener('keydown', handleTabKey);
  container.addEventListener('keydown', handleEscapeKey);

  // Focus the first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey);
    container.removeEventListener('keydown', handleEscapeKey);
  };
};

// Roving tabindex for component groups (like navigation menus)
export const createRovingTabindex = (
  container: HTMLElement,
  options: {
    orientation?: 'horizontal' | 'vertical' | 'both';
    wrap?: boolean;
    activateOnFocus?: boolean;
  } = {}
) => {
  const { orientation = 'horizontal', wrap = true, activateOnFocus = false } = options;
  const items = getFocusableElements(container);
  let currentIndex = 0;

  // Set initial tabindex values
  items.forEach((item, index) => {
    item.tabIndex = index === 0 ? 0 : -1;
  });

  const setActiveItem = (index: number) => {
    items.forEach((item, i) => {
      item.tabIndex = i === index ? 0 : -1;
    });
    currentIndex = index;
    items[index]?.focus();

    if (activateOnFocus) {
      items[index]?.click();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex + 1;
          if (newIndex >= items.length) {
            newIndex = wrap ? 0 : items.length - 1;
          }
        }
        break;

      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            newIndex = wrap ? items.length - 1 : 0;
          }
        }
        break;

      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex + 1;
          if (newIndex >= items.length) {
            newIndex = wrap ? 0 : items.length - 1;
          }
        }
        break;

      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          e.preventDefault();
          newIndex = currentIndex - 1;
          if (newIndex < 0) {
            newIndex = wrap ? items.length - 1 : 0;
          }
        }
        break;

      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;

      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        items[currentIndex]?.click();
        break;
    }

    if (newIndex !== currentIndex) {
      setActiveItem(newIndex);
    }
  };

  const handleFocus = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    const index = items.indexOf(target);
    if (index !== -1) {
      currentIndex = index;
      items.forEach((item, i) => {
        item.tabIndex = i === index ? 0 : -1;
      });
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  container.addEventListener('focus', handleFocus, true);

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
    container.removeEventListener('focus', handleFocus, true);
  };
};

// Skip link functionality
export const createSkipLink = (targetId: string, text: string = 'Skip to main content') => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link sr-only focus:not-sr-only';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary);
    color: var(--primary-foreground);
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
  `;

  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });

  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.body.insertBefore(skipLink, document.body.firstChild);
  return skipLink;
};

// Announce content changes to screen readers
export const announceToScreenReader = (
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

// Manage focus when navigating programmatically
export const manageFocus = {
  // Store the currently focused element
  store: () => {
    const activeElement = document.activeElement as HTMLElement;
    return activeElement;
  },

  // Restore focus to a previously stored element
  restore: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },

  // Move focus to an element and scroll it into view
  moveTo: (element: HTMLElement | string, options?: ScrollIntoViewOptions | false) => {
    const target = typeof element === 'string' 
      ? document.getElementById(element) || document.querySelector(element)
      : element;

    if (target && typeof target.focus === 'function') {
      target.focus();
      if (options !== false) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          ...options 
        });
      }
    }
  }
};

// Check if an element is visible and focusable
export const isElementFocusable = (element: HTMLElement): boolean => {
  // Check if element is hidden
  if (element.offsetParent === null) return false;
  
  // Check if element is disabled
  if (element.hasAttribute('disabled')) return false;
  
  // Check if element has negative tabindex
  if (element.tabIndex < 0) return false;
  
  // Check if element is aria-hidden
  if (element.getAttribute('aria-hidden') === 'true') return false;
  
  return true;
};

// Keyboard event helpers
export const isNavigationKey = (key: string): boolean => {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(key);
};

export const isActivationKey = (key: string): boolean => {
  return ['Enter', ' '].includes(key);
};

export const isEscapeKey = (key: string): boolean => {
  return key === 'Escape';
};

// Create accessible dropdown/menu
export const createAccessibleDropdown = (
  trigger: HTMLElement,
  menu: HTMLElement,
  options: {
    closeOnEscape?: boolean;
    closeOnOutsideClick?: boolean;
    returnFocusOnClose?: boolean;
  } = {}
) => {
  const { 
    closeOnEscape = true, 
    closeOnOutsideClick = true, 
    returnFocusOnClose = true 
  } = options;

  let isOpen = false;
  let focusTrapCleanup: (() => void) | null = null;

  const open = () => {
    isOpen = true;
    menu.style.display = 'block';
    trigger.setAttribute('aria-expanded', 'true');
    
    // Set up focus trap
    focusTrapCleanup = createFocusTrap(menu);
    
    // Announce to screen readers
    announceToScreenReader('Menu opened');
  };

  const close = () => {
    isOpen = false;
    menu.style.display = 'none';
    trigger.setAttribute('aria-expanded', 'false');
    
    // Clean up focus trap
    if (focusTrapCleanup) {
      focusTrapCleanup();
      focusTrapCleanup = null;
    }
    
    // Return focus to trigger
    if (returnFocusOnClose) {
      trigger.focus();
    }
    
    // Announce to screen readers
    announceToScreenReader('Menu closed');
  };

  const toggle = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  // Set up ARIA attributes
  trigger.setAttribute('aria-haspopup', 'true');
  trigger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('role', 'menu');

  // Event listeners
  trigger.addEventListener('click', toggle);
  trigger.addEventListener('keydown', (e) => {
    if (isActivationKey(e.key)) {
      e.preventDefault();
      toggle();
    }
  });

  if (closeOnEscape) {
    menu.addEventListener('focustrap:escape', close);
  }

  if (closeOnOutsideClick) {
    document.addEventListener('click', (e) => {
      if (isOpen && !menu.contains(e.target as Node) && !trigger.contains(e.target as Node)) {
        close();
      }
    });
  }

  return { open, close, toggle };
};