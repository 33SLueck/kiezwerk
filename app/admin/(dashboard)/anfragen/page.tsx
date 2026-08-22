'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Download } from 'lucide-react';
import { INQUIRY_STATUSES } from '@/lib/inquiry-validation';
import {
  buildInquiriesCsv,
  downloadCsv,
  getInquiryStatusLabel,
} from '@/lib/admin';

type InquiryRow = {
  id: string;
  referenceNumber: string;
  serviceType: string;
  status: string;
  name: string;
  email: string;
  phone?: string | null;
  postalCode?: string | null;
  desiredPeriod?: string | null;
  budget?: string | null;
  description?: string;
  createdAt: string;
};

const AnfragenListInner = () => {
  const searchParams = useSearchParams();
  const initial = searchParams.get('status') || 'all';
  const [status, setStatus] = React.useState(
    INQUIRY_STATUSES.includes(initial as (typeof INQUIRY_STATUSES)[number]) ? initial : 'all'
  );
  const [items, setItems] = React.useState<InquiryRow[]>([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [exportMsg, setExportMsg] = React.useState('');

  const load = React.useEffectEvent(async (filter: string) => {
    setLoading(true);
    setError('');
    const qs = filter === 'all' ? '' : `?status=${encodeURIComponent(filter)}`;
    try {
      const res = await fetch(`/api/admin/inquiries${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Fehler');
      setItems(json.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler');
    } finally {
      setLoading(false);
    }
  });

  React.useEffect(() => {
    void load(status);
  }, [status]);

  const exportFiltered = () => {
    if (items.length === 0) {
      setExportMsg('Keine Anfragen zum Exportieren.');
      return;
    }
    const csv = buildInquiriesCsv(
      items.map((row) => ({
        ...row,
        statusLabel: getInquiryStatusLabel(row.status),
        createdAt: new Date(row.createdAt).toLocaleString('de-DE'),
      }))
    );
    downloadCsv(`kiezwerk-anfragen-filter-${status}.csv`, csv);
    setExportMsg('CSV exportiert (lokal, Demo).');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Anfragen</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Filterung nach Status · Demo-Daten · Export optional
          </p>
        </div>
        <button
          type="button"
          onClick={exportFiltered}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Download className="h-4 w-4" />
          Gefilterte Liste exportieren
        </button>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Statusfilter">
        <button
          type="button"
          onClick={() => setStatus('all')}
          className={`rounded-md border px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            status === 'all' ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
          }`}
        >
          Alle
        </button>
        {INQUIRY_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`rounded-md border px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              status === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
            }`}
          >
            {getInquiryStatusLabel(s)}
          </button>
        ))}
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {exportMsg ? (
        <p className="text-sm text-muted-foreground" role="status">
          {exportMsg}
        </p>
      ) : null}
      {loading ? <p className="text-sm text-muted-foreground">Laden…</p> : null}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Referenz</th>
              <th className="px-4 py-3 font-medium">Anliegen</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Datum</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/60">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/anfragen/${item.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {item.referenceNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">{item.serviceType}</td>
                <td className="px-4 py-3">
                  {item.name}
                  <div className="text-xs text-muted-foreground">{item.email}</div>
                </td>
                <td className="px-4 py-3">{getInquiryStatusLabel(item.status)}</td>
                <td className="px-4 py-3">{new Date(item.createdAt).toLocaleString('de-DE')}</td>
              </tr>
            ))}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-muted-foreground">
                  Keine Anfragen für diesen Filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AnfragenListPage = () => (
  <React.Suspense fallback={<p className="text-sm text-muted-foreground">Laden…</p>}>
    <AnfragenListInner />
  </React.Suspense>
);

export default AnfragenListPage;
