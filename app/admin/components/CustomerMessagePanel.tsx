'use client';

import * as React from 'react';
import {
  MESSAGE_TEMPLATE_OPTIONS,
  buildCustomerMessage,
  getOfferDraftByInquiryId,
  type CustomerMessageTemplate,
} from '@/lib/admin';

type MessageInquiry = {
  id: string;
  referenceNumber: string;
  serviceType: string;
  name: string;
  email: string;
};

type MessagePanelProps = {
  inquiry: MessageInquiry;
  open: boolean;
  onClose: () => void;
  onSent: (newStatus: string) => void;
};

export const CustomerMessagePanel: React.FC<MessagePanelProps> = ({
  inquiry,
  open,
  onClose,
  onSent,
}) => {
  const [template, setTemplate] = React.useState<CustomerMessageTemplate>('validate_data');
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!open) return;
    const offer = getOfferDraftByInquiryId(inquiry.id);
    const built = buildCustomerMessage(template, {
      customerName: inquiry.name,
      referenceNumber: inquiry.referenceNumber,
      serviceType: inquiry.serviceType,
      offerTitle: offer?.title,
      offerTotalNet: offer?.totalNet,
    });
    setSubject(built.subject);
    setBody(built.body);
    setError('');
  }, [open, template, inquiry]);

  if (!open) return null;

  const handleSend = async () => {
    if (!inquiry.email) {
      setError('Keine E-Mail-Adresse hinterlegt.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/admin/demo/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: inquiry.id,
          template,
          subject,
          body,
          to: inquiry.email,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Versand fehlgeschlagen');
      onSent(json.data?.status || (template === 'send_offer' ? 'OFFER_PREPARED' : 'WAITING_FOR_CUSTOMER'));
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="message-panel-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-5 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="message-panel-title" className="text-lg font-semibold">
              Nachricht an Kund:in
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Demo – kein echter Versand · Ziel: {inquiry.email}
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

        <fieldset className="mt-4 space-y-2">
          <legend className="text-sm text-muted-foreground">Vorlage</legend>
          {MESSAGE_TEMPLATE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer gap-3 rounded-md border p-3 text-sm ${
                template === opt.value ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              <input
                type="radio"
                name="message-template"
                checked={template === opt.value}
                onChange={() => setTemplate(opt.value)}
                className="mt-0.5"
              />
              <span>
                <span className="font-medium">{opt.label}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{opt.description}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <label className="mt-4 block text-sm">
          <span className="text-muted-foreground">Betreff</span>
          <input
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </label>
        <label className="mt-3 block text-sm">
          <span className="text-muted-foreground">Nachricht</span>
          <textarea
            rows={10}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs leading-relaxed"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>

        {error ? (
          <p className="mt-3 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={sending}
            onClick={() => void handleSend()}
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {sending ? 'Senden…' : 'Demo-Nachricht senden'}
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
