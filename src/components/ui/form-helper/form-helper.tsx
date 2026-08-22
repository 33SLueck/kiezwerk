import * as React from 'react';
import type { FormHelperProps } from './form-helper.types';
import { getFormHelperClasses } from './form-helper.styles';

export const FormHelper = ({ children, error = false, className, id }: FormHelperProps) => {
  return (
    <span id={id} className={getFormHelperClasses(error, className)}>
      {children}
    </span>
  );
};
