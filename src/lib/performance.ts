// Performance monitoring utilities

interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

export const reportWebVitals = (metric: WebVitalMetric) => {
  // Log Core Web Vitals in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
  
  // In production, you could send to analytics service
  // Example: analytics.track('Web Vital', metric);
};

// Lazy loading intersection observer with performance optimization
export const createOptimizedIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  // Use passive event listeners for better performance
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Performance-aware animation configuration
export const getAnimationConfig = () => {
  const reducedMotion = prefersReducedMotion();
  
  return {
    duration: reducedMotion ? 0.01 : 0.3,
    ease: reducedMotion ? 'linear' : [0.4, 0.0, 0.2, 1],
    stagger: reducedMotion ? 0 : 0.1,
  };
};

// Image loading optimization
export const optimizeImageLoading = () => {
  if (typeof window !== 'undefined' && 'loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    return 'lazy';
  }
  return 'eager';
};

// Check if user is on a slow connection
export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }
  
  const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
  return Boolean(connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'));
};

// Adaptive loading based on connection speed
export const getAdaptiveLoadingStrategy = () => {
  const slowConnection = isSlowConnection();
  
  return {
    imageQuality: slowConnection ? 60 : 85,
    enableAnimations: !slowConnection && !prefersReducedMotion(),
    lazyLoadOffset: slowConnection ? '200px' : '50px',
  };
};

// Core Web Vitals monitoring
export const getCLS = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(0);
      return;
    }

    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShiftEntry.hadRecentInput) {
          const firstSessionEntry = clsEntries[0];
          const lastSessionEntry = clsEntries[clsEntries.length - 1];

          if (!firstSessionEntry || 
              entry.startTime - lastSessionEntry.startTime < 1000 ||
              entry.startTime - firstSessionEntry.startTime < 5000) {
            clsEntries.push(entry);
            clsValue += layoutShiftEntry.value || 0;
          } else {
            clsEntries = [entry];
            clsValue = layoutShiftEntry.value || 0;
          }
        }
      }
      resolve(clsValue);
    });

    try {
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch {
      resolve(0);
    }

    // Fallback timeout
    setTimeout(() => resolve(clsValue), 5000);
  });
};

export const getFID = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(0);
      return;
    }

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEntry & { processingStart?: number };
        resolve((fidEntry.processingStart || 0) - entry.startTime);
        observer.disconnect();
        return;
      }
    });

    try {
      observer.observe({ type: 'first-input', buffered: true });
    } catch {
      resolve(0);
    }

    // Fallback timeout
    setTimeout(() => resolve(0), 5000);
  });
};

export const getLCP = (): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(0);
      return;
    }

    let lcpValue = 0;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        lcpValue = entry.startTime;
      }
      resolve(lcpValue);
    });

    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      resolve(0);
    }

    // Fallback timeout
    setTimeout(() => resolve(lcpValue), 5000);
  });
};

// Memory usage monitoring
export const getMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) return null;

  const memory = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
  
  if (!memory) return null;
  
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  };
};

// Performance observer for long tasks
export const observeLongTasks = () => {
  if (typeof window === 'undefined') return null;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Long task detected: ${entry.duration}ms`, entry);
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
    return observer;
  } catch {
    return null;
  }
};

// Resource loading performance
export const getResourceTimings = () => {
  if (typeof window === 'undefined') return [];

  const resources = performance.getEntriesByType('resource');
  return resources.map((resource) => {
    const resourceEntry = resource as PerformanceResourceTiming;
    return {
      name: resourceEntry.name,
      duration: resourceEntry.duration,
      size: resourceEntry.transferSize,
      type: resourceEntry.initiatorType,
    };
  });
};

// Bundle size analysis
export const analyzeBundle = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

  console.group('Bundle Analysis');
  console.log('Scripts:', scripts.length);
  console.log('Stylesheets:', styles.length);
  
  scripts.forEach((script) => {
    const scriptElement = script as HTMLScriptElement;
    console.log(`Script: ${scriptElement.src}`);
  });
  
  styles.forEach((style) => {
    const styleElement = style as HTMLLinkElement;
    console.log(`Stylesheet: ${styleElement.href}`);
  });
  
  console.groupEnd();
};