'use client';

import * as React from 'react';
import Link from 'next/link';
import { Inbox, Clock, CheckCircle2, FileText, Users, Download } from 'lucide-react';
import { StatCard, AdminChart } from '@repo/ui';
import { INQUIRY_STATUSES } from '@/lib/inquiry-validation';
import {
  getInquiryStatusLabel,
  INQUIRY_STATUS_SHORT_LABELS,
  buildInquiriesCsv,
  downloadCsv,
} from '@/lib/admin';
import type { InquiryStatusValue } from '@/lib/inquiry-validation';

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

const AdminDashboard = () => {
  const [items, setItems] = React.useState<InquiryRow[]>([]);
  const [error, setError] = React.useState('');
  const [exportMsg, setExportMsg] = React.useState('');

  React.useEffect(() => {
    fetch('/api/admin/inquiries')
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Fehler');
        setItems(json.data || []);
      })
      .catch((err: Error) => setError(err.message));
  }, []);

  const count = (status: string) => items.filter((i) => i.status === status).length;

  const uniqueCustomers = React.useMemo(() => {
    const emails = new Set(items.map((i) => i.email.toLowerCase()));
    return emails.size;
  }, [items]);

  const chartData = React.useMemo(
    () =>
      INQUIRY_STATUSES.map((status) => ({
        label: INQUIRY_STATUS_SHORT_LABELS[status],
        value: items.filter((i) => i.status === status).length,
      })),
    [items]
  );

  const exportAll = () => {
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
    downloadCsv(`kiezwerk-anfragen-${new Date().toISOString().slice(0, 10)}.csv`, csv);
    setExportMsg('CSV exportiert (lokal, Demo).');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Übersicht</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Leichtgewichtiges Demo-CRM auf Basis lokaler Anfragen – später leicht an ein echtes CRM
            anbindbar.
          </p>
        </div>
        <button
          type="button"
          onClick={exportAll}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Download className="h-4 w-4" />
          Alle Anfragen exportieren
        </button>
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Anfragen gesamt"
          value={String(items.length)}
          change="Demo"
          trend="neutral"
          description="Lokal gespeichert"
          icon={<Inbox className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Neu"
          value={String(count('NEW'))}
          change={getInquiryStatusLabel('NEW')}
          trend="up"
          description="Unbearbeitet"
          icon={<Clock className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Angebote vorbereitet"
          value={String(count('OFFER_PREPARED'))}
          change={getInquiryStatusLabel('OFFER_PREPARED')}
          trend="neutral"
          description="Status in Pipeline"
          icon={<FileText className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Kunden (abgeleitet)"
          value={String(uniqueCustomers)}
          change="Demo"
          trend="neutral"
          description="Nach E-Mail gruppiert"
          icon={<Users className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminChart
          title="Status-Pipeline"
          subtitle="Verteilung der Demo-Anfragen"
          data={chartData}
          valuePrefix=""
          height={200}
        />

        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="text-base font-semibold">Schnellzugriff</h2>
          <p className="mt-1 text-xs text-muted-foreground">Optionale Demo-Funktionen</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/admin/anfragen?status=NEW" className="text-primary hover:underline">
                Neue Anfragen bearbeiten
              </Link>
            </li>
            <li>
              <Link href="/admin/angebote" className="text-primary hover:underline">
                Angebots-Entwürfe (Sitzung)
              </Link>
            </li>
            <li>
              <Link href="/admin/kunden" className="text-primary hover:underline">
                Kundenübersicht
              </Link>
            </li>
            <li className="text-muted-foreground">
              Abgeschlossen: {count('COMPLETED')} · Archiv: {count('ARCHIVED')} ·{' '}
              {getInquiryStatusLabel('WAITING_FOR_CUSTOMER')}: {count('WAITING_FOR_CUSTOMER')}
            </li>
          </ul>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            Kein echter Mailversand · CSV nur lokal
          </div>
        </section>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Neueste Anfragen</h2>
          <Link
            href="/admin/anfragen"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Alle anzeigen
          </Link>
        </div>
        <ul className="divide-y divide-border rounded-lg border border-border">
          {items.slice(0, 5).map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
            >
              <div>
                <Link
                  href={`/admin/anfragen/${item.id}`}
                  className="font-medium hover:underline"
                >
                  {item.referenceNumber}
                </Link>
                <p className="text-muted-foreground">
                  {item.serviceType} · {item.name}
                </p>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {getInquiryStatusLabel(item.status)}
              </span>
            </li>
          ))}
          {items.length === 0 ? (
            <li className="px-4 py-6 text-sm text-muted-foreground">Keine Anfragen geladen.</li>
          ) : null}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Pipeline:{' '}
          {INQUIRY_STATUSES.map((s: InquiryStatusValue) => getInquiryStatusLabel(s)).join(' · ')}
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
