import type { OfferDraft, OfferLineItem } from './crm-types';

const STORAGE_KEY = 'kiezwerk-demo-offers';

const isBrowser = (): boolean => typeof window !== 'undefined';

const readAll = (): OfferDraft[] => {
  if (!isBrowser()) return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OfferDraft[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAll = (drafts: OfferDraft[]): void => {
  if (!isBrowser()) return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
};

export const listOfferDrafts = (): OfferDraft[] =>
  readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const getOfferDraftByInquiryId = (inquiryId: string): OfferDraft | undefined =>
  readAll().find((d) => d.inquiryId === inquiryId);

export const saveOfferDraft = (draft: OfferDraft): OfferDraft => {
  const existing = readAll().filter((d) => d.inquiryId !== draft.inquiryId);
  writeAll([draft, ...existing]);
  return draft;
};

export const removeOfferDraft = (id: string): void => {
  writeAll(readAll().filter((d) => d.id !== id));
};

export const clearOfferDrafts = (): void => {
  if (!isBrowser()) return;
  sessionStorage.removeItem(STORAGE_KEY);
};

export const computeOfferTotal = (items: OfferLineItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

export const createPrefillLineItems = (params: {
  serviceType: string;
  budget?: string | null;
}): OfferLineItem[] => {
  const budgetHint = params.budget?.trim();
  const defaultPrice = budgetHint
    ? Number.parseFloat(budgetHint.replace(/[^\d.,]/g, '').replace(',', '.')) || 480
    : 480;

  return [
    {
      id: `line-${Date.now()}-1`,
      title: `${params.serviceType} – Arbeitsleistung (Demo)`,
      quantity: 1,
      unit: 'Pauschale',
      unitPrice: Math.round(defaultPrice * 0.7 * 100) / 100,
    },
    {
      id: `line-${Date.now()}-2`,
      title: 'Material / Anfahrt (Demo)',
      quantity: 1,
      unit: 'Pauschale',
      unitPrice: Math.round(defaultPrice * 0.3 * 100) / 100,
    },
  ];
};

export const defaultValidUntil = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toISOString().slice(0, 10);
};
