import * as React from 'react';
import type { TextareaProps } from './textarea.types';
import { getTextareaClasses } from './textarea.styles';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return <textarea ref={ref} className={getTextareaClasses(error, className)} {...props} />;
  }
);

Textarea.displayName = 'Textarea';
