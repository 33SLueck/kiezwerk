'use client';

import * as React from 'react';
import type { RadioGroupProps } from './radio-group.types';
import {
  getRadioGroupClasses,
  getRadioItemClasses,
  getRadioInputClasses,
  getRadioLabelClasses,
} from './radio-group.styles';

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    { name, options, value, defaultValue, onChange, className, disabled = false, ...props },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = React.useState(value ?? defaultValue);

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleRadioChange = (val: string) => {
      if (disabled) return;
      setSelectedValue(val);
      if (onChange) onChange(val);
    };

    return (
      <div className={getRadioGroupClasses(className)} role="radiogroup">
        {options.map((option) => {
          const isChecked = selectedValue === option.value;
          const isItemDisabled = disabled || option.disabled;
          return (
            <label key={option.value} className={getRadioItemClasses(isItemDisabled)}>
              <input
                {...props}
                ref={isChecked ? ref : undefined}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={isItemDisabled}
                onChange={() => handleRadioChange(option.value)}
                className={getRadioInputClasses()}
              />
              <span className={getRadioLabelClasses()}>{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
