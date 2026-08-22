import { NextResponse } from 'next/server';
import { prisma, isDbConfigured } from '@repo/db';
import { requireAdmin } from '@/lib/auth/require-admin';
import { sendEmail } from '@/lib/utils/email';
import type { CustomerMessageTemplate } from '@/lib/admin/crm-types';

// Never send server-internal file paths to the client.
const attachmentSelect = {
  id: true, inquiryId: true, filename: true, mimeType: true, size: true, createdAt: true,
} as const;

const statusForTemplate = (template: CustomerMessageTemplate): string => {
  if (template === 'send_offer') return 'OFFER_PREPARED';
  return 'WAITING_FOR_CUSTOMER';
};

/**
 * Demo: mock-send a customer message and advance inquiry status.
 */
export const POST = async (request: Request) => {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
    }

    const body = (await request.json()) as {
      inquiryId?: string;
      template?: CustomerMessageTemplate;
      subject?: string;
      body?: string;
      to?: string;
    };

    if (!body.inquiryId || !body.subject || !body.body) {
      return NextResponse.json(
        { error: 'inquiryId, subject und body sind erforderlich.' },
        { status: 400 }
      );
    }

    const template = body.template === 'send_offer' ? 'send_offer' : 'validate_data';
    const existing = await prisma.inquiry.findUnique({ where: { id: body.inquiryId } });
    if (!existing) {
      return NextResponse.json({ error: 'Anfrage nicht gefunden.' }, { status: 404 });
    }

    const to = (body.to || existing.email || '').trim();
    if (!to) {
      return NextResponse.json({ error: 'Keine E-Mail-Adresse hinterlegt.' }, { status: 400 });
    }

    const mail = await sendEmail({
      to,
      subject: body.subject,
      text: body.body,
    });

    if (!mail.success) {
      return NextResponse.json(
        { error: mail.error || 'Demo-Versand fehlgeschlagen.' },
        { status: 500 }
      );
    }

    const nextStatus = statusForTemplate(template);
    const updated = await prisma.inquiry.update({
      where: { id: body.inquiryId },
      data: { status: nextStatus as never },
      include: { attachments: { select: attachmentSelect } },
    });

    return NextResponse.json({
      data: updated,
      demo: true,
      messageId: mail.messageId,
      message:
        'Demo-Nachricht an Konsole geloggt. Kein echter E-Mail-Versand. Status aktualisiert.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Nachricht konnte nicht als Demo gesendet werden.' },
      { status: 500 }
    );
  }
};
