import * as React from 'react';
import type { DatePickerProps } from './date-picker.types';
import { getDatePickerClasses } from './date-picker.styles';

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <input type="date" ref={ref} className={getDatePickerClasses(error, className)} {...props} />
    );
  }
);

DatePicker.displayName = 'DatePicker';
