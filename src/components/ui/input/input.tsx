import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { errorClasses, helperClasses, inputBaseClasses, labelClasses } from './input.styles';
import type { InputProps } from './input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, inputClassName, className, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('w-full', className)}>
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required ? <span className="ml-1 text-destructive">*</span> : null}
        </label>

        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          required={required}
          className={cn(
            inputBaseClasses,
            error && 'border-destructive focus-visible:ring-destructive',
            inputClassName
          )}
          {...props}
        />

        {error ? (
          <p id={errorId} className={errorClasses}>
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className={helperClasses}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
