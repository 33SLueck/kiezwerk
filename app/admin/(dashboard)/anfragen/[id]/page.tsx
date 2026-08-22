'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Download, FileText, Mail } from 'lucide-react';
import { INQUIRY_STATUSES } from '@/lib/inquiry-validation';
import {
  buildInquiriesCsv,
  downloadCsv,
  getInquiryStatusLabel,
  getOfferDraftByInquiryId,
  type OfferDraft,
} from '@/lib/admin';
import { OfferCreatePanel } from '../../../components/OfferCreatePanel';
import { CustomerMessagePanel } from '../../../components/CustomerMessagePanel';

type Attachment = {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  // storagePath is intentionally excluded — server-internal path, never sent to client
};

type InquiryDetail = {
  id: string;
  referenceNumber: string;
  serviceType: string;
  description: string;
  desiredPeriod?: string | null;
  budget?: string | null;
  postalCode?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  consentGiven: boolean;
  status: string;
  createdAt: string;
  attachments: Attachment[];
};

const AnfrageDetailPage = () => {
  const params = useParams<{ id: string }>();
  const [item, setItem] = React.useState<InquiryDetail | null>(null);
  const [error, setError] = React.useState('');
  const [statusMsg, setStatusMsg] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [offerOpen, setOfferOpen] = React.useState(false);
  const [messageOpen, setMessageOpen] = React.useState(false);
  const [hasOfferDraft, setHasOfferDraft] = React.useState(false);

  React.useEffect(() => {
    if (!params?.id) return;
    fetch(`/api/admin/inquiries?id=${encodeURIComponent(params.id)}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Fehler');
        setItem(json.data);
        setHasOfferDraft(Boolean(getOfferDraftByInquiryId(json.data.id)));
      })
      .catch((err: Error) => setError(err.message));
  }, [params?.id]);

  const updateStatus = async (status: string) => {
    if (!item) return;
    setSaving(true);
    setStatusMsg('');
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item.id, status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Update fehlgeschlagen');
      setItem(json.data);
      setStatusMsg(`Status auf „${getInquiryStatusLabel(status)}“ gesetzt (Demo).`);
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'Fehler');
    } finally {
      setSaving(false);
    }
  };

  const exportOne = () => {
    if (!item) return;
    const csv = buildInquiriesCsv([
      {
        ...item,
        statusLabel: getInquiryStatusLabel(item.status),
        createdAt: new Date(item.createdAt).toLocaleString('de-DE'),
      },
    ]);
    downloadCsv(`${item.referenceNumber}.csv`, csv);
    setStatusMsg('CSV exportiert (lokal, Demo).');
  };

  return (
    <div className="space-y-6">
      <Link href="/admin/anfragen" className="text-sm text-primary underline-offset-4 hover:underline">
        ← Zurück zur Liste
      </Link>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {!item && !error ? <p className="text-sm text-muted-foreground">Laden…</p> : null}

      {item ? (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Demo-Anfrage</p>
              <h1 className="text-2xl font-bold">{item.referenceNumber}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.serviceType} · {new Date(item.createdAt).toLocaleString('de-DE')} ·{' '}
                {getInquiryStatusLabel(item.status)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportOne}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Download className="h-4 w-4" />
                CSV exportieren
              </button>
              <button
                type="button"
                onClick={() => setOfferOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <FileText className="h-4 w-4" />
                {hasOfferDraft ? 'Angebot bearbeiten' : 'Angebot erstellen'}
              </button>
              <button
                type="button"
                onClick={() => setMessageOpen(true)}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Mail className="h-4 w-4" />
                Nachricht an Kund:in
              </button>
            </div>
          </div>

          {hasOfferDraft ? (
            <p className="rounded-md border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              Für diese Anfrage liegt ein Demo-Angebotsentwurf in der Sitzung vor.{' '}
              <Link href="/admin/angebote" className="text-primary hover:underline">
                Alle Entwürfe
              </Link>
            </p>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-lg border border-border p-5">
              <h2 className="font-semibold">Inhalt</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                {item.description}
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Zeitraum</dt>
                  <dd>{item.desiredPeriod || '–'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Budget</dt>
                  <dd>{item.budget || '–'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">PLZ</dt>
                  <dd>{item.postalCode || '–'}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-lg border border-border p-5">
              <h2 className="font-semibold">Kontakt (Demo)</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Name</dt>
                  <dd>{item.name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">E-Mail</dt>
                  <dd>{item.email}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Telefon</dt>
                  <dd>{item.phone || '–'}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Einwilligung</dt>
                  <dd>{item.consentGiven ? 'ja' : 'nein'}</dd>
                </div>
              </dl>
            </section>
          </div>

          <section className="rounded-lg border border-border p-5">
            <h2 className="font-semibold">Status ändern</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {INQUIRY_STATUSES.map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={saving || item.status === status}
                  onClick={() => updateStatus(status)}
                  className={`rounded-md border px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${
                    item.status === status
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border'
                  }`}
                >
                  {getInquiryStatusLabel(status)}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm" aria-live="polite" role="status">
              {statusMsg}
            </p>
          </section>

          <section className="rounded-lg border border-border p-5">
            <h2 className="font-semibold">Anhänge</h2>
            {item.attachments.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Keine Anhänge.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {item.attachments.map((file) => (
                  <li key={file.id} className="rounded-md bg-muted/40 px-3 py-2">
                    <span className="font-medium">{file.filename}</span>
                    <span className="text-muted-foreground">
                      {' '}
                      · {file.mimeType} · {Math.round(file.size / 1024)} KB
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <OfferCreatePanel
            inquiry={item}
            open={offerOpen}
            onClose={() => setOfferOpen(false)}
            onSaved={(draft: OfferDraft, newStatus: string) => {
              setHasOfferDraft(true);
              setItem((prev) => (prev ? { ...prev, status: newStatus } : prev));
              setStatusMsg(
                `Angebot „${draft.title}“ gespeichert · Status „${getInquiryStatusLabel(newStatus)}“ (Demo).`
              );
            }}
          />
          <CustomerMessagePanel
            inquiry={item}
            open={messageOpen}
            onClose={() => setMessageOpen(false)}
            onSent={(newStatus: string) => {
              setItem((prev) => (prev ? { ...prev, status: newStatus } : prev));
              setStatusMsg(
                `Demo-Nachricht „gesendet“ · Status „${getInquiryStatusLabel(newStatus)}“. Kein echter Versand.`
              );
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default AnfrageDetailPage;
