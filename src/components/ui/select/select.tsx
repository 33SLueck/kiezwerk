'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChevronDown } from 'lucide-react';
import type { SelectProps } from './select.types';
import {
  selectVariants,
  selectHelperTextVariants,
  selectLabelClasses,
  selectLabelWrapClasses,
} from './select.styles';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      label,
      helperText,
      error = false,
      disabled = false,
      className,
      variant = 'default',
      options,
      placeholder,
      defaultValue,
      value,
      onChange,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const helperId = helperText ? `${selectId}-helper` : undefined;

    return (
      <label htmlFor={selectId} className={cn(selectLabelWrapClasses, className)}>
        {label ? <span className={selectLabelClasses}>{label}</span> : null}

        <div className="relative w-full">
          <select
            {...props}
            ref={ref}
            id={selectId}
            className={cn(selectVariants({ variant, error: Boolean(error) }))}
            disabled={disabled}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            required={required}
            aria-invalid={error || undefined}
            aria-describedby={helperId}
          >
            {placeholder ? (
              <option value="" disabled={required}>
                {placeholder}
              </option>
            ) : null}

            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform duration-200 peer-focus-visible:text-foreground" />
        </div>

        {helperText ? (
          <span id={helperId} className={selectHelperTextVariants({ error: Boolean(error) })}>
            {helperText}
          </span>
        ) : null}
      </label>
    );
  }
);

Select.displayName = 'Select';
