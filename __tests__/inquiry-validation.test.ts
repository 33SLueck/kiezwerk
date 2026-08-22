import { describe, expect, it } from 'vitest';
import {
  validateInquiryInput,
  validateInquiryStatus,
  validateUploadFile,
} from '../src/lib/inquiry-validation';

describe('validateInquiryInput', () => {
  const valid = {
    serviceType: 'Reparatur',
    description: 'Tür quietscht und lässt sich schwer schließen.',
    name: 'Demo Nutzer',
    email: 'demo.user@kiezwerk.example',
    consentGiven: true,
  };

  it('accepts a valid inquiry payload', () => {
    const result = validateInquiryInput(valid);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.email).toBe('demo.user@kiezwerk.example');
      expect(result.value.serviceType).toBe('Reparatur');
    }
  });

  it('rejects missing required fields', () => {
    const result = validateInquiryInput({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.serviceType).toBeTruthy();
      expect(result.errors.description).toBeTruthy();
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.consentGiven).toBeTruthy();
    }
  });

  it('rejects invalid email addresses', () => {
    const result = validateInquiryInput({ ...valid, email: 'not-an-email' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBeTruthy();
    }
  });
});

describe('validateInquiryStatus', () => {
  it('accepts known status values', () => {
    expect(validateInquiryStatus('NEW').ok).toBe(true);
    expect(validateInquiryStatus('COMPLETED').ok).toBe(true);
  });

  it('rejects invalid status values', () => {
    const result = validateInquiryStatus('DONE');
    expect(result.ok).toBe(false);
  });
});

describe('validateUploadFile', () => {
  it('rejects disallowed file types', () => {
    const result = validateUploadFile({
      name: 'malware.exe',
      type: 'application/octet-stream',
      size: 1000,
    });
    expect(result.ok).toBe(false);
  });

  it('accepts allowed image types within size limit', () => {
    const result = validateUploadFile({
      name: 'foto.jpg',
      type: 'image/jpeg',
      size: 1024,
    });
    expect(result.ok).toBe(true);
  });
});
