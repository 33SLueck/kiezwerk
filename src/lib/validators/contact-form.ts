import { ContactFormData, FormValidationResult } from '../../types/ecommerce.types';
import { sanitizeInput } from '../utils/sanitize';

export const validateContactForm = (
  data: Partial<ContactFormData>
): FormValidationResult<ContactFormData> => {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  // Sanitize inputs before validation
  const name = data.name ? sanitizeInput(data.name, { maxLength: 200 }) : '';
  const email = data.email ? sanitizeInput(data.email, { maxLength: 320, stripHtml: false }) : '';
  const message = data.message ? sanitizeInput(data.message, { maxLength: 5000 }) : '';

  if (!name || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    // Return sanitized data for downstream use
    ...(Object.keys(errors).length === 0 && {
      sanitizedData: { name, email, message } as ContactFormData,
    }),
  };
};
