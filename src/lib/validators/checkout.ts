import { CheckoutFormData, FormValidationResult } from '../../types/ecommerce.types';
import { sanitizeInput } from '../utils/sanitize';

export const validateCheckout = (
  data: Partial<CheckoutFormData>
): FormValidationResult<CheckoutFormData> => {
  const errors: Partial<Record<keyof CheckoutFormData, string>> = {};

  // Sanitize inputs before validation
  const email = data.email ? sanitizeInput(data.email, { maxLength: 320, stripHtml: false }) : '';
  const firstName = data.firstName ? sanitizeInput(data.firstName, { maxLength: 100 }) : '';
  const lastName = data.lastName ? sanitizeInput(data.lastName, { maxLength: 100 }) : '';
  const address = data.address ? sanitizeInput(data.address, { maxLength: 500 }) : '';
  const city = data.city ? sanitizeInput(data.city, { maxLength: 100 }) : '';
  const postalCode = data.postalCode ? sanitizeInput(data.postalCode, { maxLength: 20 }) : '';
  const country = data.country ? sanitizeInput(data.country, { maxLength: 100 }) : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!firstName || firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }

  if (!address || address.trim().length < 5) {
    errors.address = 'Please enter a valid street address.';
  }

  if (!city || city.trim().length < 2) {
    errors.city = 'City is required.';
  }

  if (!postalCode || postalCode.trim().length < 3) {
    errors.postalCode = 'Postal code is required.';
  }

  if (!country) {
    errors.country = 'Country selection is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    // Return sanitized data for downstream use
    ...(Object.keys(errors).length === 0 && {
      sanitizedData: {
        email,
        firstName,
        lastName,
        address,
        city,
        postalCode,
        country,
        paymentMethod: data.paymentMethod,
      } as CheckoutFormData,
    }),
  };
};
