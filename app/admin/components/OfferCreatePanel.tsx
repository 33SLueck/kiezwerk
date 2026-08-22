'use client';

import * as React from 'react';
import {
  computeOfferTotal,
  createPrefillLineItems,
  defaultValidUntil,
  getOfferDraftByInquiryId,
  saveOfferDraft,
  type OfferDraft,
  type OfferLineItem,
} from '@/lib/admin';

type InquiryOfferSource = {
  id: string;
  referenceNumber: string;
  serviceType: string;
  description: string;
  budget?: string | null;
  name: string;
  email: string;
};

type OfferPanelProps = {
  inquiry: InquiryOfferSource;
  open: boolean;
  onClose: () => void;
  onSaved: (draft: OfferDraft, newStatus: string) => void;
};

export const OfferCreatePanel: React.FC<OfferPanelProps> = ({
  inquiry,
  open,
  onClose,
  onSaved,
}) => {
  const existing = React.useMemo(
    () => (open ? getOfferDraftByInquiryId(inquiry.id) : undefined),
    [open, inquiry.id]
  );

  const [title, setTitle] = React.useState('');
  const [validUntil, setValidUntil] = React.useState(defaultValidUntil());
  const [notes, setNotes] = React.useState('');
  const [lineItems, setLineItems] = React.useState<OfferLineItem[]>([]);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!open) return;
    if (existing) {
      setTitle(existing.title);
      setValidUntil(existing.validUntil);
      setNotes(existing.notes);
      setLineItems(existing.lineItems);
    } else {
      setTitle(`Angebot ${inquiry.referenceNumber} – ${inquiry.serviceType}`);
      setValidUntil(defaultValidUntil());
      setNotes(
        `Demo-Entwurf auf Basis der Anfrage.\n\nKurzbeschreibung:\n${inquiry.description.slice(0, 280)}`
      );
      setLineItems(createPrefillLineItems({ serviceType: inquiry.serviceType, budget: inquiry.budget }));
    }
    setError('');
  }, [open, existing, inquiry]);

  if (!open) return null;

  const totalNet = computeOfferTotal(lineItems);

  const updateLine = (id: string, patch: Partial<OfferLineItem>) => {
    setLineItems((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const draft: OfferDraft = {
        id: existing?.id || `offer-${inquiry.id}-${Date.now()}`,
        inquiryId: inquiry.id,
        referenceNumber: inquiry.referenceNumber,
        customerName: inquiry.name,
        customerEmail: inquiry.email,
        title: title.trim() || `Angebot ${inquiry.referenceNumber}`,
        validUntil,
        notes,
        lineItems,
        totalNet,
        createdAt: existing?.createdAt || new Date().toISOString(),
        demo: true,
      };

      const res = await fetch('/api/admin/demo/offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          status: 'OFFER_PREPARED',
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Speichern fehlgeschlagen');

      saveOfferDraft(draft);
      onSaved(draft, json.data?.status || 'OFFER_PREPARED');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-panel-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-5 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="offer-panel-title" className="text-lg font-semibold">
              Angebot erstellen
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Demo-Entwurf · Speicherung nur in dieser Browser-Sitzung · kein PDF
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-2 py-1 text-sm hover:bg-muted"
          >
            Schließen
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="text-muted-foreground">Titel</span>
            <input
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Gültig bis</span>
            <input
              type="date"
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted-foreground">Notizen</span>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          <div>
            <p className="text-sm text-muted-foreground">Positionen (Demo)</p>
            <ul className="mt-2 space-y-3">
              {lineItems.map((line) => (
                <li key={line.id} className="rounded-md border border-border p-3 text-sm">
                  <input
                    className="mb-2 w-full rounded-md border border-border bg-background px-2 py-1.5"
                    value={line.title}
                    onChange={(e) => updateLine(line.id, { title: e.target.value })}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <label>
                      <span className="text-xs text-muted-foreground">Menge</span>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className="mt-0.5 w-full rounded-md border border-border bg-background px-2 py-1.5"
                        value={line.quantity}
                        onChange={(e) =>
                          updateLine(line.id, { quantity: Number(e.target.value) || 0 })
                        }
                      />
                    </label>
                    <label>
                      <span className="text-xs text-muted-foreground">Einheit</span>
                      <input
                        className="mt-0.5 w-full rounded-md border border-border bg-background px-2 py-1.5"
                        value={line.unit}
                        onChange={(e) => updateLine(line.id, { unit: e.target.value })}
                      />
                    </label>
                    <label>
                      <span className="text-xs text-muted-foreground">Preis (€)</span>
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        className="mt-0.5 w-full rounded-md border border-border bg-background px-2 py-1.5"
                        value={line.unitPrice}
                        onChange={(e) =>
                          updateLine(line.id, { unitPrice: Number(e.target.value) || 0 })
                        }
                      />
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm font-medium">
              Netto-Summe:{' '}
              {totalNet.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
        </div>

        {error ? (
          <p className="mt-3 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => void handleSave()}
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Speichern…' : 'Entwurf speichern & Status setzen'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
          >
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
};
