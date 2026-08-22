import { NextResponse } from 'next/server';
import { prisma, isDbConfigured } from '@repo/db';
import { validateInquiryStatus } from '@/lib/inquiries';
import { requireAdmin } from '@/lib/auth/require-admin';

// Never send server-internal file paths to the client.
const attachmentSelect = {
  id: true,
  inquiryId: true,
  filename: true,
  mimeType: true,
  size: true,
  createdAt: true,
  // storagePath intentionally excluded
} as const;

export const GET = async (request: Request) => {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const id = searchParams.get('id');

    if (id) {
      const inquiry = await prisma.inquiry.findUnique({
        where: { id },
        include: { attachments: { select: attachmentSelect } },
      });
      if (!inquiry) {
        return NextResponse.json({ error: 'Anfrage nicht gefunden.' }, { status: 404 });
      }
      return NextResponse.json({ data: inquiry, demo: true });
    }

    if (status) {
      const validated = validateInquiryStatus(status);
      if (!validated.ok) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
      }
    }

    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status: status as never } : undefined,
      include: { attachments: { select: attachmentSelect } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ data: inquiries, demo: true });
  } catch {
    return NextResponse.json({ error: 'Anfragen konnten nicht geladen werden.' }, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Datenbank nicht konfiguriert.' }, { status: 503 });
    }

    const body = (await request.json()) as { id?: string; status?: string };
    if (!body.id || !body.status) {
      return NextResponse.json({ error: 'id und status sind erforderlich.' }, { status: 400 });
    }

    const validated = validateInquiryStatus(body.status);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const existing = await prisma.inquiry.findUnique({ where: { id: body.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Anfrage nicht gefunden.' }, { status: 404 });
    }

    const updated = await prisma.inquiry.update({
      where: { id: body.id },
      data: { status: validated.value },
      include: { attachments: { select: attachmentSelect } },
    });

    return NextResponse.json({ data: updated, demo: true });
  } catch {
    return NextResponse.json({ error: 'Status konnte nicht aktualisiert werden.' }, { status: 500 });
  }
};
