export const INQUIRY_STATUSES = [
  'NEW',
  'IN_REVIEW',
  'WAITING_FOR_CUSTOMER',
  'OFFER_PREPARED',
  'COMPLETED',
  'ARCHIVED',
] as const;

export type InquiryStatusValue = (typeof INQUIRY_STATUSES)[number];

export const SERVICE_TYPES = [
  'Reparatur',
  'Wartung',
  'Renovierung',
  'Badmodernisierung',
  'Innenausbau',
  'Sonstiges',
] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number];

export const ALLOWED_UPLOAD_MIME = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
] as const;

export const ALLOWED_UPLOAD_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'] as const;

export type InquiryInput = {
  serviceType: string;
  description: string;
  desiredPeriod?: string;
  budget?: string;
  postalCode?: string;
  name: string;
  email: string;
  phone?: string;
  consentGiven: boolean;
};

export type FieldErrors = Partial<Record<keyof InquiryInput | 'files' | 'status', string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateInquiryInput = (
  data: Partial<InquiryInput>,
  maxUploadBytes = 5_242_880
): { ok: true; value: InquiryInput } | { ok: false; errors: FieldErrors } => {
  const errors: FieldErrors = {};

  const serviceType = (data.serviceType || '').trim();
  const description = (data.description || '').trim();
  const name = (data.name || '').trim();
  const email = (data.email || '').trim().toLowerCase();
  const desiredPeriod = (data.desiredPeriod || '').trim() || undefined;
  const budget = (data.budget || '').trim() || undefined;
  const postalCode = (data.postalCode || '').trim() || undefined;
  const phone = (data.phone || '').trim() || undefined;
  const consentGiven = Boolean(data.consentGiven);

  void maxUploadBytes;

  if (!SERVICE_TYPES.includes(serviceType as ServiceTypeValue)) {
    errors.serviceType = 'Bitte ein gültiges Anliegen wählen.';
  }
  if (description.length < 10) {
    errors.description = 'Bitte beschreiben Sie Ihr Anliegen mit mindestens 10 Zeichen.';
  }
  if (description.length > 5000) {
    errors.description = 'Die Beschreibung ist zu lang (max. 5000 Zeichen).';
  }
  if (name.length < 2) {
    errors.name = 'Bitte einen Namen mit mindestens 2 Zeichen angeben.';
  }
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Bitte eine gültige E-Mail-Adresse angeben.';
  }
  if (postalCode && !/^\d{4,5}$/.test(postalCode)) {
    errors.postalCode = 'PLZ bitte als 4–5 Ziffern (Demo-Feld).';
  }
  if (!consentGiven) {
    errors.consentGiven = 'Die Demo-Einwilligung ist erforderlich.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      serviceType,
      description,
      desiredPeriod,
      budget,
      postalCode,
      name,
      email,
      phone,
      consentGiven,
    },
  };
};

export const validateInquiryStatus = (
  status: string
): { ok: true; value: InquiryStatusValue } | { ok: false; error: string } => {
  if (!INQUIRY_STATUSES.includes(status as InquiryStatusValue)) {
    return { ok: false, error: 'Ungültiger Statuswert.' };
  }
  return { ok: true, value: status as InquiryStatusValue };
};

export const validateUploadFile = (
  file: { name: string; type: string; size: number },
  maxBytes = 5_242_880
): { ok: true } | { ok: false; error: string } => {
  const ext = `.${file.name.split('.').pop()?.toLowerCase() || ''}`;
  if (
    !(ALLOWED_UPLOAD_MIME as readonly string[]).includes(file.type) ||
    !(ALLOWED_UPLOAD_EXT as readonly string[]).includes(ext)
  ) {
    return { ok: false, error: 'Nicht erlaubter Dateityp. Erlaubt: JPG, PNG, WEBP, PDF.' };
  }
  if (file.size <= 0 || file.size > maxBytes) {
    return {
      ok: false,
      error: `Datei zu groß oder leer. Maximum: ${Math.round(maxBytes / 1024 / 1024)} MB.`,
    };
  }
  return { ok: true };
};
