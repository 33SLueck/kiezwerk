import { describe, expect, it } from 'vitest';
import {
  buildInquiriesCsv,
  getInquiryStatusLabel,
  buildCustomerMessage,
  computeOfferTotal,
} from '../src/lib/admin';

describe('admin helpers', () => {
  it('maps status enums to German labels', () => {
    expect(getInquiryStatusLabel('NEW')).toBe('Neu');
    expect(getInquiryStatusLabel('OFFER_PREPARED')).toBe('Angebot vorbereitet');
    expect(getInquiryStatusLabel('WAITING_FOR_CUSTOMER')).toBe('Wartet auf Kund:in');
  });

  it('builds CSV with German headers and BOM', () => {
    const csv = buildInquiriesCsv([
      {
        referenceNumber: 'KW-DEMO-1',
        serviceType: 'Reparatur',
        status: 'NEW',
        statusLabel: 'Neu',
        name: 'Test, User',
        email: 'a@b.de',
        createdAt: '21.08.2026',
      },
    ]);
    expect(csv.startsWith('\uFEFF')).toBe(true);
    expect(csv).toContain('Referenz');
    expect(csv).toContain('"Test, User"');
    expect(csv).toContain('KW-DEMO-1');
  });

  it('builds German validate_data message template', () => {
    const msg = buildCustomerMessage('validate_data', {
      customerName: 'Anna',
      referenceNumber: 'KW-1',
      serviceType: 'Wartung',
    });
    expect(msg.subject).toContain('KW-1');
    expect(msg.body).toContain('Guten Tag Anna');
    expect(msg.body).toContain('Demo-Nachricht');
  });

  it('computes offer totals', () => {
    expect(
      computeOfferTotal([
        { id: '1', title: 'A', quantity: 2, unit: 'h', unitPrice: 50 },
        { id: '2', title: 'B', quantity: 1, unit: 'Stk', unitPrice: 20 },
      ])
    ).toBe(120);
  });
});
