/**
 * Input Sanitization Utility
 * Zero-dependency sanitizer for user-supplied text input.
 * Strips HTML tags, escapes dangerous characters, trims whitespace, and enforces max length.
 */

const HTML_TAG_REGEX = /<[^>]*>/g;

const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
};

const ESCAPE_REGEX = /[&<>"']/g;

/**
 * Sanitize a single string input.
 * - Strips all HTML tags
 * - Escapes &, <, >, ", ' to HTML entities
 * - Trims leading/trailing whitespace
 * - Enforces a maximum character length (default 1000)
 */
export const sanitizeInput = (
  input: string,
  options?: { maxLength?: number; stripHtml?: boolean }
): string => {
  const { maxLength = 1000, stripHtml = true } = options ?? {};

  let sanitized = input.trim();

  // Strip HTML tags
  if (stripHtml) {
    sanitized = sanitized.replace(HTML_TAG_REGEX, '');
  }

  // Escape dangerous characters
  sanitized = sanitized.replace(ESCAPE_REGEX, (char) => ESCAPE_MAP[char] || char);

  // Enforce max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
};

/**
 * Sanitize all string values in a flat object (e.g. form data).
 * Non-string values are passed through unchanged.
 */
export const sanitizeFormData = <T extends Record<string, unknown>>(
  data: T,
  options?: { maxLength?: number }
): T => {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    sanitized[key] = typeof value === 'string' ? sanitizeInput(value, options) : value;
  }

  return sanitized as T;
};
