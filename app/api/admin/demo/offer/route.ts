import { NextResponse } from 'next/server';
import { prisma, isDbConfigured } from '@repo/db';
import { validateInquiryStatus } from '@/lib/inquiry-validation';
import { requireAdmin } from '@/lib/auth/require-admin';

// Never send server-internal file paths to the client.
const attachmentSelect = {
  id: true, inquiryId: true, filename: true, mimeType: true, size: true, createdAt: true,
} as const;

/**
 * Demo: mark inquiry as OFFER_PREPARED after client saves a session offer draft.
 * No offer document is persisted server-side (CRM hook point).
 */
export const POST = async (request: Request) => {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
    }

    const body = (await request.json()) as { inquiryId?: string; status?: string };
    if (!body.inquiryId) {
      return NextResponse.json({ error: 'inquiryId ist erforderlich.' }, { status: 400 });
    }

    const statusRaw = body.status || 'OFFER_PREPARED';
    const validated = validateInquiryStatus(statusRaw);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const existing = await prisma.inquiry.findUnique({ where: { id: body.inquiryId } });
    if (!existing) {
      return NextResponse.json({ error: 'Anfrage nicht gefunden.' }, { status: 404 });
    }

    const updated = await prisma.inquiry.update({
      where: { id: body.inquiryId },
      data: { status: validated.value },
      include: { attachments: { select: attachmentSelect } },
    });

    return NextResponse.json({
      data: updated,
      demo: true,
      message:
        'Angebotsentwurf lokal (Browser) gespeichert. Status aktualisiert. Kein PDF, keine CRM-Sync.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Angebot konnte nicht als Demo gespeichert werden.' },
      { status: 500 }
    );
  }
};
