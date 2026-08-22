type CsvInquiryRow = {
  referenceNumber: string;
  serviceType: string;
  status: string;
  statusLabel?: string;
  name: string;
  email: string;
  phone?: string | null;
  postalCode?: string | null;
  desiredPeriod?: string | null;
  budget?: string | null;
  description?: string;
  createdAt: string;
};

const escapeCsvCell = (value: string): string => {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

const cell = (value: string | number | null | undefined): string =>
  escapeCsvCell(value == null ? '' : String(value));

/** Build a German-header CSV from one or more inquiries (client-side download). */
export const buildInquiriesCsv = (rows: CsvInquiryRow[]): string => {
  const header = [
    'Referenz',
    'Anliegen',
    'Status',
    'Status (DE)',
    'Name',
    'E-Mail',
    'Telefon',
    'PLZ',
    'Zeitraum',
    'Budget',
    'Beschreibung',
    'Erstellt am',
  ].join(',');

  const lines = rows.map((row) =>
    [
      cell(row.referenceNumber),
      cell(row.serviceType),
      cell(row.status),
      cell(row.statusLabel ?? ''),
      cell(row.name),
      cell(row.email),
      cell(row.phone),
      cell(row.postalCode),
      cell(row.desiredPeriod),
      cell(row.budget),
      cell(row.description),
      cell(row.createdAt),
    ].join(',')
  );

  return `\uFEFF${[header, ...lines].join('\n')}`;
};

export const downloadCsv = (filename: string, csvContent: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
