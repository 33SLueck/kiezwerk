import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';
import type { CheckboxProps } from './checkbox.types';
import {
  checkboxContainerVariants,
  checkboxControlVariants,
  checkboxHelperTextVariants,
  checkboxLabelClasses,
  checkboxLabelWrapClasses,
} from './checkbox.styles';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      label,
      helperText,
      error = false,
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      className,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <label htmlFor={inputId} className={cn(checkboxContainerVariants({ disabled }), className)}>
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="checkbox"
          className="peer sr-only"
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
        />

        <span
          aria-hidden="true"
          className={checkboxControlVariants({ variant, error: Boolean(error) })}
        >
          <svg viewBox="0 0 24 24" fill="none" className="hidden peer-checked:block h-3.5 w-3.5">
            <path
              d="M5 12.5L10 17L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {(label || helperText) && (
          <span className={checkboxLabelWrapClasses}>
            {label ? <span className={checkboxLabelClasses}>{label}</span> : null}
            {helperText ? (
              <span id={helperId} className={checkboxHelperTextVariants({ error: Boolean(error) })}>
                {helperText}
              </span>
            ) : null}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
