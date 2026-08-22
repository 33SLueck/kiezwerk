'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  clearOfferDrafts,
  listOfferDrafts,
  removeOfferDraft,
  type OfferDraft,
} from '@/lib/admin';

const AngebotePage = () => {
  const [drafts, setDrafts] = React.useState<OfferDraft[]>([]);
  const [msg, setMsg] = React.useState('');

  const refresh = React.useEffectEvent(() => {
    setDrafts(listOfferDrafts());
  });

  React.useEffect(() => {
    refresh();
  }, []);

  const handleRemove = (id: string) => {
    removeOfferDraft(id);
    refresh();
    setMsg('Entwurf entfernt (nur Browser-Sitzung).');
  };

  const handleClear = () => {
    clearOfferDrafts();
    refresh();
    setMsg('Alle Demo-Entwürfe gelöscht.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Angebote</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Demo-Entwürfe in dieser Browser-Sitzung · kein PDF · optional, leicht austauschbar gegen
            CRM
          </p>
        </div>
        {drafts.length > 0 ? (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
          >
            Alle Entwürfe löschen
          </button>
        ) : null}
      </div>

      {msg ? (
        <p className="text-sm text-muted-foreground" role="status">
          {msg}
        </p>
      ) : null}

      <ul className="space-y-3">
        {drafts.map((draft) => (
          <li key={draft.id} className="rounded-lg border border-border p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{draft.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {draft.referenceNumber} · {draft.customerName} · {draft.customerEmail}
                </p>
                <p className="mt-2 text-sm">
                  Netto:{' '}
                  {draft.totalNet.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                  })}{' '}
                  · Gültig bis:{' '}
                  {draft.validUntil
                    ? new Date(draft.validUntil).toLocaleDateString('de-DE')
                    : '–'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {draft.lineItems.length} Position(en) · erstellt{' '}
                  {new Date(draft.createdAt).toLocaleString('de-DE')}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/anfragen/${draft.inquiryId}`}
                  className="rounded-md border border-border px-3 py-1.5 text-sm text-primary hover:bg-muted"
                >
                  Zur Anfrage
                </Link>
                <button
                  type="button"
                  onClick={() => handleRemove(draft.id)}
                  className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
                >
                  Entfernen
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {drafts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
          Noch keine Angebotsentwürfe in dieser Sitzung.{' '}
          <Link href="/admin/anfragen" className="text-primary hover:underline">
            Anfrage öffnen
          </Link>{' '}
          und „Angebot erstellen“ wählen.
        </div>
      ) : null}
    </div>
  );
};

export default AngebotePage;
