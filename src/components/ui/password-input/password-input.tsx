'use client';

import * as React from 'react';
import type { PasswordInputProps } from './password-input.types';
import { getPasswordInputClasses, getPasswordToggleButtonClasses } from './password-input.styles';
import { Eye, EyeOff } from 'lucide-react';

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error = false, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      if (disabled) return;
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          disabled={disabled}
          className={getPasswordInputClasses(error, className)}
          {...props}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={togglePasswordVisibility}
          className={getPasswordToggleButtonClasses()}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
