import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma, isDbConfigured } from '@repo/db';
import { createInquiry, validateInquiryInput } from '@/lib/inquiries';
import { createRateLimiter } from '@/lib/utils/rate-limiter';

// 5 submissions per 10 minutes per IP — prevents spam and disk exhaustion.
const inquiryLimiter = createRateLimiter({ maxRequests: 5, windowMs: 10 * 60 * 1_000 });

export const POST = async (request: Request) => {
  try {
    // Rate limiting — use the first IP from X-Forwarded-For, fall back to 'unknown'
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const rateCheck = inquiryLimiter.check(ip);
    if (!rateCheck.allowed) {
      const retryAfterSec = Math.ceil((rateCheck.retryAfterMs ?? 60_000) / 1_000);
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte warte einen Moment.' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
      );
    }

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
    }

    const contentType = request.headers.get('content-type') || '';
    let raw: Record<string, unknown> = {};
    const files: File[] = [];

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      raw = {
        serviceType: String(form.get('serviceType') || ''),
        description: String(form.get('description') || ''),
        desiredPeriod: String(form.get('desiredPeriod') || ''),
        budget: String(form.get('budget') || ''),
        postalCode: String(form.get('postalCode') || ''),
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        consentGiven: form.get('consentGiven') === 'true' || form.get('consentGiven') === 'on',
      };
      for (const entry of form.getAll('files')) {
        if (entry instanceof File && entry.size > 0) {
          files.push(entry);
        }
      }
    } else {
      raw = (await request.json()) as Record<string, unknown>;
    }

    const validated = validateInquiryInput({
      serviceType: String(raw.serviceType || ''),
      description: String(raw.description || ''),
      desiredPeriod: raw.desiredPeriod ? String(raw.desiredPeriod) : undefined,
      budget: raw.budget ? String(raw.budget) : undefined,
      postalCode: raw.postalCode ? String(raw.postalCode) : undefined,
      name: String(raw.name || ''),
      email: String(raw.email || ''),
      phone: raw.phone ? String(raw.phone) : undefined,
      consentGiven: Boolean(raw.consentGiven),
    });

    if (!validated.ok) {
      return NextResponse.json({ error: 'Validierung fehlgeschlagen.', errors: validated.errors }, { status: 400 });
    }

    try {
      const inquiry = await createInquiry(validated.value, files);
      console.info('[kiezwerk] Demo-Anfrage gespeichert:', inquiry.referenceNumber);
      return NextResponse.json(
        {
          data: {
            id: inquiry.id,
            referenceNumber: inquiry.referenceNumber,
            status: inquiry.status,
          },
          message: 'Anfrage gespeichert (Demo – keine E-Mail versendet).',
        },
        { status: 201 }
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload oder Speichern fehlgeschlagen.';
      return NextResponse.json({ error: message }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Anfrage konnte nicht verarbeitet werden.' }, { status: 500 });
  }
};

export const GET = async (request: Request) => {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const referenceNumber = searchParams.get('referenceNumber');
    const id = searchParams.get('id');

    if (!referenceNumber && !id) {
      return NextResponse.json(
        { error: 'Bitte referenceNumber oder id angeben. Listenabruf nur über Admin-API.' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.findFirst({
      where: referenceNumber ? { referenceNumber } : { id: id! },
      include: { attachments: true },
    });

    if (!inquiry) {
      return NextResponse.json({ error: 'Anfrage nicht gefunden.' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: inquiry.id,
        referenceNumber: inquiry.referenceNumber,
        status: inquiry.status,
        serviceType: inquiry.serviceType,
        createdAt: inquiry.createdAt,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Anfrage konnte nicht geladen werden.' }, { status: 500 });
  }
};
