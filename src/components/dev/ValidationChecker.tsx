'use client';

import { useEffect, useState } from 'react';
import { runAccessibilityTests, initAccessibilityTesting } from '@/lib/accessibility-testing';
import { getCLS, getFID, getLCP, getMemoryUsage, observeLongTasks } from '@/lib/performance';

interface ValidationResult {
  component: string;
  issues: string[];
  type: 'error' | 'warning' | 'info';
}

interface PerformanceMetrics {
  cls: number;
  fid: number;
  lcp: number;
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    usedPercentage: number;
  } | null;
}

export function ValidationChecker() {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'accessibility' | 'performance'>('accessibility');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Initialize accessibility testing
    const a11yObserver = initAccessibilityTesting();

    const runValidation = () => {
      // Run comprehensive accessibility tests
      const a11yResults = runAccessibilityTests();
      
      const results: ValidationResult[] = a11yResults
        .filter(result => result.issues.length > 0)
        .map(result => ({
          component: result.name,
          issues: result.issues,
          type: result.severity
        }));

      setValidationResults(results);
    };

    const runPerformanceTests = async () => {
      try {
        const [cls, fid, lcp] = await Promise.all([
          getCLS(),
          getFID(),
          getLCP()
        ]);

        const memory = getMemoryUsage();

        setPerformanceMetrics({
          cls,
          fid,
          lcp,
          memory
        });
      } catch (error) {
        console.warn('Performance metrics collection failed:', error);
      }
    };

    // Run initial validation
    setTimeout(runValidation, 2000);
    setTimeout(runPerformanceTests, 3000);

    // Set up long task monitoring
    const longTaskObserver = observeLongTasks();

    return () => {
      a11yObserver?.disconnect();
      longTaskObserver?.disconnect();
    };
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const totalIssues = validationResults.reduce((sum, result) => sum + result.issues.length, 0);
  const hasErrors = validationResults.some(result => result.type === 'error');

  const getPerformanceStatus = () => {
    if (!performanceMetrics) return 'unknown';
    
    const { cls, fid, lcp } = performanceMetrics;
    
    // Web Vitals thresholds
    const clsGood = cls < 0.1;
    const fidGood = fid < 100;
    const lcpGood = lcp < 2500;
    
    if (clsGood && fidGood && lcpGood) return 'good';
    if (cls < 0.25 && fid < 300 && lcp < 4000) return 'needs-improvement';
    return 'poor';
  };

  const performanceStatus = getPerformanceStatus();

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`
          px-3 py-2 rounded-lg text-sm font-medium transition-colors
          ${hasErrors 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : totalIssues > 0
            ? 'bg-yellow-500 text-black hover:bg-yellow-600'
            : 'bg-green-500 text-white hover:bg-green-600'
          }
        `}
        aria-label={`Development tools: ${totalIssues} accessibility issues found`}
      >
        {totalIssues === 0 ? '✓' : '⚠'} Dev Tools ({totalIssues})
      </button>

      {isVisible && (
        <div className="absolute bottom-12 left-0 w-96 max-h-[32rem] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`
                flex-1 px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === 'accessibility'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              Accessibility ({totalIssues})
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`
                flex-1 px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === 'performance'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              Performance
              <span className={`
                ml-1 w-2 h-2 rounded-full inline-block
                ${performanceStatus === 'good' ? 'bg-green-500' :
                  performanceStatus === 'needs-improvement' ? 'bg-yellow-500' :
                  performanceStatus === 'poor' ? 'bg-red-500' : 'bg-gray-400'
                }
              `} />
            </button>
          </div>

          <div className="p-4 max-h-80 overflow-y-auto">
            {activeTab === 'accessibility' && (
              <>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Accessibility Issues
                </h3>
                
                {totalIssues === 0 ? (
                  <p className="text-green-600 dark:text-green-400">
                    ✅ All accessibility checks passed!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {validationResults.map((result, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className={`font-medium flex items-center gap-2 ${
                          result.type === 'error' 
                            ? 'text-red-600 dark:text-red-400' 
                            : result.type === 'warning'
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}>
                          {result.type === 'error' ? '❌' : result.type === 'warning' ? '⚠️' : 'ℹ️'}
                          {result.component} ({result.issues.length})
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {result.issues.slice(0, 3).map((issue, issueIndex) => (
                            <li key={issueIndex} className="pl-2 border-l-2 border-gray-200 dark:border-gray-600">
                              {issue}
                            </li>
                          ))}
                          {result.issues.length > 3 && (
                            <li className="pl-2 text-gray-500 dark:text-gray-400 text-xs">
                              ... and {result.issues.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'performance' && (
              <>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Performance Metrics
                </h3>
                
                {performanceMetrics ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Cumulative Layout Shift</span>
                          <span className={`text-sm font-mono ${
                            performanceMetrics.cls < 0.1 ? 'text-green-600' :
                            performanceMetrics.cls < 0.25 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {performanceMetrics.cls.toFixed(3)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Good: &lt; 0.1, Poor: ≥ 0.25
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">First Input Delay</span>
                          <span className={`text-sm font-mono ${
                            performanceMetrics.fid < 100 ? 'text-green-600' :
                            performanceMetrics.fid < 300 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {performanceMetrics.fid.toFixed(0)}ms
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Good: &lt; 100ms, Poor: ≥ 300ms
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Largest Contentful Paint</span>
                          <span className={`text-sm font-mono ${
                            performanceMetrics.lcp < 2500 ? 'text-green-600' :
                            performanceMetrics.lcp < 4000 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {performanceMetrics.lcp.toFixed(0)}ms
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Good: &lt; 2.5s, Poor: ≥ 4s
                        </div>
                      </div>

                      {performanceMetrics.memory && (
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Memory Usage</span>
                            <span className="text-sm font-mono">
                              {performanceMetrics.memory.usedPercentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {(performanceMetrics.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB / {(performanceMetrics.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1)}MB
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    Loading performance metrics...
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Export a conditional wrapper that only includes the checker in development
export function DevValidationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' && <ValidationChecker />}
    </>
  );
}