/**
 * CRM-shaped types for the demo admin shell.
 * Designed so a later CRM integration can map these 1:1 without rewriting UI.
 */

export type CrmCustomer = {
  /** Stable key for demo (email lowercased). */
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  inquiryCount: number;
  lastInquiryAt: string;
  lastInquiryId?: string;
  lastReferenceNumber?: string;
};

export type OfferLineItem = {
  id: string;
  title: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

export type OfferDraft = {
  id: string;
  inquiryId: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  title: string;
  validUntil: string;
  notes: string;
  lineItems: OfferLineItem[];
  /** Net total in EUR (demo). */
  totalNet: number;
  createdAt: string;
  /** Demo-only persistence flag */
  demo: true;
};

export type CustomerMessageTemplate = 'validate_data' | 'send_offer';

export type CustomerMessagePayload = {
  inquiryId: string;
  template: CustomerMessageTemplate;
  subject: string;
  body: string;
  /** When true, also mention the offer draft summary in the body (client-side). */
  includeOfferSummary?: boolean;
};

export type DemoActionResult = {
  ok: boolean;
  demo: true;
  message: string;
  messageId?: string;
  status?: string;
};
