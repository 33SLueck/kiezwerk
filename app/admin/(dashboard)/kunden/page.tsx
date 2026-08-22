'use client';

import * as React from 'react';
import Link from 'next/link';
import type { CrmCustomer } from '@/lib/admin';

type InquiryRow = {
  id: string;
  referenceNumber: string;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: string;
};

const deriveCustomers = (items: InquiryRow[]): CrmCustomer[] => {
  const map = new Map<string, CrmCustomer & { latestTs: number }>();

  for (const item of items) {
    const key = item.email.trim().toLowerCase();
    if (!key) continue;
    const ts = new Date(item.createdAt).getTime();
    const prev = map.get(key);
    if (!prev) {
      map.set(key, {
        id: key,
        name: item.name,
        email: item.email,
        phone: item.phone,
        inquiryCount: 1,
        lastInquiryAt: item.createdAt,
        lastInquiryId: item.id,
        lastReferenceNumber: item.referenceNumber,
        latestTs: ts,
      });
    } else {
      prev.inquiryCount += 1;
      if (ts >= prev.latestTs) {
        prev.latestTs = ts;
        prev.lastInquiryAt = item.createdAt;
        prev.lastInquiryId = item.id;
        prev.lastReferenceNumber = item.referenceNumber;
        prev.name = item.name;
        prev.phone = item.phone || prev.phone;
      }
    }
  }

  return [...map.values()]
    .map(({ latestTs: _t, ...rest }) => rest)
    .sort((a, b) => b.lastInquiryAt.localeCompare(a.lastInquiryAt));
};

const KundenPage = () => {
  const [customers, setCustomers] = React.useState<CrmCustomer[]>([]);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/admin/inquiries')
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Fehler');
        setCustomers(deriveCustomers(json.data || []));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Kunden</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Abgeleitet aus Anfragen (gruppiert nach E-Mail) · kein separates Kundenmodell ·
          CRM-Anbindung später möglich
        </p>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {loading ? <p className="text-sm text-muted-foreground">Laden…</p> : null}

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">E-Mail</th>
              <th className="px-4 py-3 font-medium">Telefon</th>
              <th className="px-4 py-3 font-medium">Anfragen</th>
              <th className="px-4 py-3 font-medium">Zuletzt</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-border/60">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone || '–'}</td>
                <td className="px-4 py-3">{c.inquiryCount}</td>
                <td className="px-4 py-3">
                  <div>{new Date(c.lastInquiryAt).toLocaleString('de-DE')}</div>
                  {c.lastReferenceNumber && c.lastInquiryId ? (
                    <Link
                      href={`/admin/anfragen/${c.lastInquiryId}`}
                      className="text-xs text-primary hover:underline"
                    >
                      {c.lastReferenceNumber}
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
            {!loading && customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-muted-foreground">
                  Noch keine Kunden aus Anfragen ableitbar.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KundenPage;
