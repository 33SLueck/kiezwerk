import { INQUIRY_STATUSES, type InquiryStatusValue } from '@/lib/inquiry-validation';

/** German UI labels for InquiryStatus enum values (API stays English). */
export const INQUIRY_STATUS_LABELS: Record<InquiryStatusValue, string> = {
  NEW: 'Neu',
  IN_REVIEW: 'In Prüfung',
  WAITING_FOR_CUSTOMER: 'Wartet auf Kund:in',
  OFFER_PREPARED: 'Angebot vorbereitet',
  COMPLETED: 'Abgeschlossen',
  ARCHIVED: 'Archiviert',
};

export const getInquiryStatusLabel = (status: string): string => {
  if ((INQUIRY_STATUSES as readonly string[]).includes(status)) {
    return INQUIRY_STATUS_LABELS[status as InquiryStatusValue];
  }
  return status;
};

/** Short chart labels (fit bar chart axis). */
export const INQUIRY_STATUS_SHORT_LABELS: Record<InquiryStatusValue, string> = {
  NEW: 'Neu',
  IN_REVIEW: 'Prüfung',
  WAITING_FOR_CUSTOMER: 'Kunde',
  OFFER_PREPARED: 'Angebot',
  COMPLETED: 'Fertig',
  ARCHIVED: 'Archiv',
};
