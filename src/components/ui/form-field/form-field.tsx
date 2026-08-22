import * as React from 'react';
import type { FormFieldProps } from './form-field.types';
import { getFormFieldContainerClasses, getFormFieldLabelClasses } from './form-field.styles';
import { FormHelper } from '../form-helper';

export const FormField = ({
  label,
  helperText,
  error = false,
  required = false,
  children,
  className,
  id,
}: FormFieldProps) => {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;

  return (
    <div className={getFormFieldContainerClasses(className)}>
      {label ? (
        <label htmlFor={fieldId} className={getFormFieldLabelClasses(required)}>
          {label}
        </label>
      ) : null}
      <div className="relative">
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
              id: fieldId,
              'aria-describedby': helperId,
              'aria-invalid': error || undefined,
            })
          : children}
      </div>
      {helperText ? (
        <FormHelper id={helperId} error={error}>
          {helperText}
        </FormHelper>
      ) : null}
    </div>
  );
};
