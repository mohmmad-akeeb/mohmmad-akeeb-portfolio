'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  showLoadingState?: boolean;
  loadingClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/projects/placeholder.svg',
  showLoadingState = true,
  loadingClassName = '',
  className = '',
  priority = false,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
      setIsLoading(true); // Reset loading state for fallback
    } else {
      setIsLoading(false);
    }
    onError?.();
  };

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Loading skeleton */}
      {isLoading && showLoadingState && (
        <div 
          className={cn(
            'absolute inset-0 bg-muted animate-pulse',
            loadingClassName
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <Image
        {...props}
        src={currentSrc}
        alt={alt}
        priority={priority}
        loading={priority ? undefined : loading}
        unoptimized={true}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && 'filter grayscale opacity-75',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Error state */}
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground text-sm">
          <div className="text-center p-4">
            <svg 
              className="w-8 h-8 mx-auto mb-2 opacity-50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        </div>
      )}
    </div>
  );
}