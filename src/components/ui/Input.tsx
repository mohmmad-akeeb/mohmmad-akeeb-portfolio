'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef, useState, useId } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'floating';
  size?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    variant = 'default',
    size = 'md',
    className = '', 
    type = 'text',
    placeholder,
    value,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    required = false,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value));
    const id = useId();
    const inputId = props.id || id;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value));
      onChange?.(e);
    };

    const sizeClasses = {
      sm: 'h-10 px-3 text-sm touch-target',
      md: 'h-11 px-3 text-sm touch-target',
      lg: 'h-12 px-4 text-base touch-target',
    };

    const isFloatingActive = variant === 'floating' && (isFocused || hasValue || placeholder);

    if (variant === 'floating') {
      return (
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={isFocused ? placeholder : ''}
            className={cn(
              // Base styles
              'peer w-full rounded-md border bg-background pt-6 pb-2 px-3',
              'text-sm placeholder:text-muted-foreground',
              'transition-all duration-200 ease-in-out',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
              // State styles
              error 
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
                : 'border-border focus:border-ring',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
            {...props}
          />
          
          {label && (
            <motion.label
              htmlFor={inputId}
              className={cn(
                'absolute left-3 text-muted-foreground pointer-events-none',
                'transition-all duration-200 ease-in-out',
                disabled && 'opacity-50'
              )}
              animate={{
                top: isFloatingActive ? '0.5rem' : '50%',
                fontSize: isFloatingActive ? '0.75rem' : '0.875rem',
                y: isFloatingActive ? 0 : '-50%',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </motion.label>
          )}

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-sm text-destructive"
                role="alert"
                aria-live="polite"
              >
                {error}
              </motion.p>
            )}
            {!error && helperText && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-2 text-sm text-muted-foreground"
              >
                {helperText}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // Default variant
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium leading-none',
              disabled && 'opacity-50',
              error ? 'text-destructive' : 'text-foreground'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            // Base styles
            'flex w-full rounded-md border bg-background',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground',
            'transition-all duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            // Size styles
            sizeClasses[size],
            // State styles
            error 
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
              : 'border-border focus:border-ring',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          {...props}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-destructive"
              role="alert"
              aria-live="polite"
            >
              {error}
            </motion.p>
          )}
          {!error && helperText && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              {helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    className = '', 
    disabled = false,
    required = false,
    ...props 
  }, ref) => {
    const id = useId();
    const textareaId = props.id || id;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'text-sm font-medium leading-none',
              disabled && 'opacity-50',
              error ? 'text-destructive' : 'text-foreground'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          className={cn(
            // Base styles
            'flex min-h-[100px] sm:min-h-[120px] w-full rounded-md border bg-background px-3 py-2',
            'text-responsive-sm placeholder:text-muted-foreground',
            'transition-all duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'resize-vertical touch-target',
            // State styles
            error 
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
              : 'border-border focus:border-ring',
            disabled && 'cursor-not-allowed opacity-50',
            className
          )}
          {...props}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-destructive"
              role="alert"
              aria-live="polite"
            >
              {error}
            </motion.p>
          )}
          {!error && helperText && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              {helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';