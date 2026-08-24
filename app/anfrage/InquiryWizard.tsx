'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SERVICE_TYPES } from '@/lib/inquiry-validation';

type FormState = {
  serviceType: string;
  description: string;
  desiredPeriod: string;
  budget: string;
  postalCode: string;
  name: string;
  email: string;
  phone: string;
  consentGiven: boolean;
};

const initialState: FormState = {
  serviceType: '',
  description: '',
  desiredPeriod: '',
  budget: '',
  postalCode: '',
  name: '',
  email: '',
  phone: '',
  consentGiven: false,
};

const steps = ['Anliegen', 'Details', 'Dateien', 'Kontakt', 'Prüfung'] as const;

export const InquiryWizard = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState<FormState>(initialState);
  const [files, setFiles] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<{ referenceNumber: string } | null>(null);
  const [statusMessage, setStatusMessage] = React.useState('');

  React.useEffect(() => {
    const leistung = searchParams.get('leistung');
    if (!leistung) return;
    const match = SERVICE_TYPES.find((t) => leistung.toLowerCase().includes(t.toLowerCase()));
    if (match) {
      setForm((prev) => ({ ...prev, serviceType: match }));
    } else if (leistung.toLowerCase().includes('elektro')) {
      setForm((prev) => ({ ...prev, serviceType: 'Sonstiges' }));
    }
  }, [searchParams]);

  const update = (patch: Partial<FormState>) => setForm((prev) => ({ ...prev, ...patch }));

  const validateStep = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (step === 0 && !form.serviceType) {
      nextErrors.serviceType = 'Bitte ein Anliegen wählen.';
    }
    if (step === 1 && form.description.trim().length < 10) {
      nextErrors.description = 'Mindestens 10 Zeichen Beschreibung.';
    }
    if (step === 3) {
      if (form.name.trim().length < 2) nextErrors.name = 'Name erforderlich.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Gültige E-Mail erforderlich.';
      if (!form.consentGiven) nextErrors.consentGiven = 'Einwilligung erforderlich.';
    }
    setErrors(nextErrors);
    setStatusMessage(Object.keys(nextErrors).length ? 'Bitte Eingaben prüfen.' : '');
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
    setStatusMessage('');
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    setStatusMessage('');
  };

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list).slice(0, 5));
  };

  const submit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setStatusMessage('Anfrage wird gesendet…');
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        body.append(key, typeof value === 'boolean' ? String(value) : String(value));
      });
      files.forEach((file) => body.append('files', file));

      const res = await fetch('/api/inquiries', { method: 'POST', body });
      const json = (await res.json()) as {
        data?: { referenceNumber: string };
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok) {
        setErrors(json.errors || {});
        setStatusMessage(json.error || 'Absenden fehlgeschlagen.');
        return;
      }

      setResult({ referenceNumber: json.data!.referenceNumber });
      setStatusMessage(`Erfolgreich gespeichert. Demo-Nummer: ${json.data!.referenceNumber}`);
    } catch {
      setStatusMessage('Netzwerkfehler – bitte erneut versuchen.');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="rounded-lg border border-border bg-card p-8" role="status" aria-live="polite">
        <h2 className="text-2xl font-semibold">Anfrage gespeichert (Demo)</h2>
        <p className="mt-3 text-muted-foreground">
          Ihre Demo-Anfragenummer lautet{' '}
          <strong className="text-foreground">{result.referenceNumber}</strong>. Es wurde keine
          E-Mail versendet. Die Daten liegen nur in der lokalen Demo-Datenbank.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/anfragen"
            className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Anfragen im Admin ansehen
          </Link>
          <button
            type="button"
            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => {
              setResult(null);
              setForm(initialState);
              setFiles([]);
              setStep(0);
              setStatusMessage('');
            }}
          >
            Weitere Demo-Anfrage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <ol className="mb-8 flex flex-wrap gap-2" aria-label="Formularschritte">
        {steps.map((label, index) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              index === step
                ? 'bg-primary text-primary-foreground'
                : index < step
                  ? 'bg-muted text-foreground'
                  : 'bg-muted/50 text-muted-foreground'
            }`}
            aria-current={index === step ? 'step' : undefined}
          >
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="sr-only">
        {statusMessage}
      </div>
      {statusMessage ? (
        <p className="mb-4 text-sm text-amber-800 dark:text-amber-200" role="status">
          {statusMessage}
        </p>
      ) : null}

      {step === 0 ? (
        <fieldset>
          <legend className="text-lg font-semibold">Worum geht es?</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {SERVICE_TYPES.map((type) => (
              <label
                key={type}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 focus-within:ring-2 focus-within:ring-ring ${
                  form.serviceType === type ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <input
                  type="radio"
                  name="serviceType"
                  value={type}
                  checked={form.serviceType === type}
                  onChange={() => update({ serviceType: type })}
                  className="h-4 w-4"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          {errors.serviceType ? <p className="mt-2 text-sm text-destructive">{errors.serviceType}</p> : null}
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Details</legend>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Beschreibung
            </label>
            <textarea
              id="description"
              rows={5}
              value={form.description}
              onChange={(e) => update({ description: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
            {errors.description ? <p className="mt-1 text-sm text-destructive">{errors.description}</p> : null}
          </div>
          <div>
            <label htmlFor="desiredPeriod" className="block text-sm font-medium">
              Gewünschter Zeitraum
            </label>
            <input
              id="desiredPeriod"
              value={form.desiredPeriod}
              onChange={(e) => update({ desiredPeriod: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="z. B. nächste 2 Wochen"
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium">
              Budget (optional)
            </label>
            <select
              id="budget"
              value={form.budget}
              onChange={(e) => update({ budget: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Keine Angabe</option>
              <option value="unter 300 EUR">unter 300 EUR</option>
              <option value="300–1000 EUR">300–1000 EUR</option>
              <option value="1000–2500 EUR">1000–2500 EUR</option>
              <option value="2500–5000 EUR">2500–5000 EUR</option>
              <option value="über 5000 EUR">über 5000 EUR</option>
              <option value="noch offen">noch offen</option>
            </select>
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium">
              PLZ (Demo-Feld)
            </label>
            <input
              id="postalCode"
              inputMode="numeric"
              value={form.postalCode}
              onChange={(e) => update({ postalCode: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="z. B. 10115"
            />
            {errors.postalCode ? <p className="mt-1 text-sm text-destructive">{errors.postalCode}</p> : null}
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset>
          <legend className="text-lg font-semibold">Dateien (optional)</legend>
          <p className="mt-2 text-sm text-muted-foreground">
            JPG, PNG, WEBP oder PDF, max. 5 MB pro Datei. Speicherung nur lokal im Docker-Volume.
          </p>
          <label htmlFor="files" className="mt-4 block text-sm font-medium">
            Dateien auswählen
          </label>
          <input
            id="files"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
            multiple
            onChange={(e) => onFiles(e.target.files)}
            className="mt-1 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-primary-foreground"
          />
          {files.length > 0 ? (
            <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
              {files.map((f) => (
                <li key={`${f.name}-${f.size}`}>
                  {f.name} ({Math.round(f.size / 1024)} KB)
                </li>
              ))}
            </ul>
          ) : null}
          {errors.files ? <p className="mt-2 text-sm text-destructive">{errors.files}</p> : null}
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Kontaktdaten</legend>
          <p className="text-sm text-muted-foreground">
            Bitte nur Demo-/Testdaten verwenden – keine echten personenbezogenen Daten.
          </p>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => update({ name: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="name"
              required
            />
            {errors.name ? <p className="mt-1 text-sm text-destructive">{errors.name}</p> : null}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="email"
              required
            />
            {errors.email ? <p className="mt-1 text-sm text-destructive">{errors.email}</p> : null}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Telefon (optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="tel"
            />
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.consentGiven}
              onChange={(e) => update({ consentGiven: e.target.checked })}
              className="mt-1 h-4 w-4"
            />
            <span>
              Ich willige ein, dass diese Demo-Angaben lokal in der Showcase-Datenbank gespeichert
              werden. Es handelt sich um keine echte Auftragsannahme.
            </span>
          </label>
          {errors.consentGiven ? <p className="text-sm text-destructive">{errors.consentGiven}</p> : null}
        </fieldset>
      ) : null}

      {step === 4 ? (
        <div>
          <h2 className="text-lg font-semibold">Prüfung</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Anliegen</dt>
              <dd>{form.serviceType}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Beschreibung</dt>
              <dd className="whitespace-pre-wrap">{form.description}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Zeitraum / Budget / PLZ</dt>
              <dd>
                {form.desiredPeriod || '–'} · {form.budget || '–'} · {form.postalCode || '–'}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Dateien</dt>
              <dd>{files.length ? files.map((f) => f.name).join(', ') : 'keine'}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Kontakt</dt>
              <dd>
                {form.name}, {form.email}
                {form.phone ? `, ${form.phone}` : ''}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Zurück
          </button>
        ) : null}
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Weiter
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {submitting ? 'Senden…' : 'Demo-Anfrage absenden'}
          </button>
        )}
        {step === 4 && step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Korrigieren ab Anfang
          </button>
        ) : null}
      </div>
    </div>
  );
};
