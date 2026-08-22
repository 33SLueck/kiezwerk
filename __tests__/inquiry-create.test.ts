import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('@repo/db', () => {
  const InquiryStatus = { NEW: 'NEW' };
  return {
    InquiryStatus,
    prisma: {
      inquiry: {
        create: vi.fn(async ({ data }: { data: Record<string, unknown> }) => ({
          id: 'inq_demo_1',
          referenceNumber: data.referenceNumber,
          status: InquiryStatus.NEW,
          ...data,
          attachments: [],
        })),
      },
    },
  };
});

vi.mock('fs/promises', () => ({
  mkdir: vi.fn(async () => undefined),
  writeFile: vi.fn(async () => undefined),
}));

import { createInquiry } from '../src/lib/inquiries';
import { validateInquiryInput } from '../src/lib/inquiry-validation';

describe('createInquiry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates an inquiry with NEW status after successful validation', async () => {
    const validated = validateInquiryInput({
      serviceType: 'Renovierung',
      description: 'Zwei Zimmer streichen und Leisten erneuern (Demo).',
      name: 'Demo Carla',
      email: 'carla.demo@kiezwerk.example',
      consentGiven: true,
      desiredPeriod: 'nächster Monat',
      budget: '1000–2500 EUR',
      postalCode: '12043',
    });
    expect(validated.ok).toBe(true);
    if (!validated.ok) return;

    const inquiry = await createInquiry(validated.value, []);
    expect(inquiry.status).toBe('NEW');
    expect(String(inquiry.referenceNumber)).toMatch(/^KW-DEMO-/);
  });
});
