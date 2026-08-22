import { randomBytes } from 'crypto';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { prisma, InquiryStatus, type Inquiry } from '@repo/db';
import {
  type InquiryInput,
  validateUploadFile,
  ALLOWED_UPLOAD_EXT,
} from './inquiry-validation';

/**
 * Check actual file content against known magic byte signatures.
 * This prevents a client from spoofing MIME type / extension to upload
 * disallowed file types (e.g. a .exe renamed to .jpg).
 */
const MAGIC_SIGNATURES: Array<{ mime: string; bytes: number[]; offset?: number }> = [
  { mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { mime: 'image/png',  bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  // WEBP: "RIFF" at 0 + "WEBP" at 8
  { mime: 'image/webp', bytes: [0x52, 0x49, 0x46, 0x46], offset: 0 },
  { mime: 'application/pdf', bytes: [0x25, 0x50, 0x44, 0x46] }, // %PDF
];

const WEBP_MARKER = [0x57, 0x45, 0x42, 0x50]; // "WEBP" at offset 8

export const validateFileMagicBytes = (
  buffer: Buffer,
  declaredMime: string
): { ok: true } | { ok: false; error: string } => {
  const matches = (buf: Buffer, sig: number[], offset = 0): boolean =>
    sig.every((byte, i) => buf[offset + i] === byte);

  for (const sig of MAGIC_SIGNATURES) {
    if (sig.mime !== declaredMime) continue;
    if (sig.mime === 'image/webp') {
      // WEBP requires RIFF at 0 AND WEBP at 8
      if (matches(buffer, sig.bytes, 0) && matches(buffer, WEBP_MARKER, 8)) return { ok: true };
      return { ok: false, error: 'Dateiinhalt stimmt nicht mit dem deklarierten Typ (WebP) überein.' };
    }
    if (matches(buffer, sig.bytes, sig.offset ?? 0)) return { ok: true };
    return { ok: false, error: 'Dateiinhalt stimmt nicht mit dem deklarierten Typ überein.' };
  }
  return { ok: false, error: 'Nicht unterstützter Dateityp (Magic-Bytes-Prüfung fehlgeschlagen).' };
};

export {
  INQUIRY_STATUSES,
  SERVICE_TYPES,
  ALLOWED_UPLOAD_MIME,
  ALLOWED_UPLOAD_EXT,
  validateInquiryInput,
  validateInquiryStatus,
  validateUploadFile,
  type InquiryInput,
  type InquiryStatusValue,
  type ServiceTypeValue,
  type FieldErrors,
} from './inquiry-validation';

export const maxUploadBytes = (): number => {
  const raw = process.env.MAX_UPLOAD_BYTES;
  const parsed = raw ? Number(raw) : 5_242_880;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 5_242_880;
};

export const createReferenceNumber = (): string => {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = randomBytes(2).toString('hex').toUpperCase();
  return `KW-DEMO-${stamp}-${rand}`;
};

export const getUploadDir = (): string => process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

export const sanitizeStoredFilename = (originalName: string): string => {
  const base = path.basename(originalName).replace(/[^a-zA-Z0-9._-]/g, '_');
  const ext = path.extname(base).toLowerCase();
  const stem = path.basename(base, ext).slice(0, 80) || 'file';
  const safeExt = (ALLOWED_UPLOAD_EXT as readonly string[]).includes(ext) ? ext : '';
  return `${Date.now()}-${randomBytes(4).toString('hex')}-${stem}${safeExt}`;
};

export const saveUpload = async (
  file: File
): Promise<{ filename: string; storagePath: string; mimeType: string; size: number }> => {
  const check = validateUploadFile(
    { name: file.name, type: file.type, size: file.size },
    maxUploadBytes()
  );
  if (!check.ok) {
    throw new Error(check.error);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // M5: Verify actual file content matches declared MIME type (magic bytes check).
  // This prevents a spoofed Content-Type from bypassing the MIME allowlist.
  const magicCheck = validateFileMagicBytes(buffer, file.type);
  if (!magicCheck.ok) {
    throw new Error(magicCheck.error);
  }

  const filename = sanitizeStoredFilename(file.name);
  const dir = getUploadDir();
  await mkdir(dir, { recursive: true });
  const storagePath = path.join(dir, filename);
  await writeFile(storagePath, buffer);

  return {
    filename: file.name.slice(0, 200),
    storagePath,
    mimeType: file.type,
    size: file.size,
  };
};

export const createInquiry = async (
  input: InquiryInput,
  files: File[] = []
): Promise<Inquiry> => {
  for (const file of files) {
    const check = validateUploadFile(
      { name: file.name, type: file.type, size: file.size },
      maxUploadBytes()
    );
    if (!check.ok) {
      throw new Error(check.error);
    }
  }

  const attachments = [];
  for (const file of files) {
    attachments.push(await saveUpload(file));
  }

  return prisma.inquiry.create({
    data: {
      referenceNumber: createReferenceNumber(),
      serviceType: input.serviceType,
      description: input.description,
      desiredPeriod: input.desiredPeriod,
      budget: input.budget,
      postalCode: input.postalCode,
      name: input.name,
      email: input.email,
      phone: input.phone,
      consentGiven: input.consentGiven,
      status: InquiryStatus.NEW,
      attachments: {
        create: attachments,
      },
    },
    include: { attachments: true },
  });
};
