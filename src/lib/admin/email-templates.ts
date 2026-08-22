import { siteConfig } from '@/lib/config/site';
import type { CustomerMessageTemplate } from './crm-types';

type TemplateContext = {
  customerName: string;
  referenceNumber: string;
  serviceType: string;
  offerTitle?: string;
  offerTotalNet?: number;
};

export const MESSAGE_TEMPLATE_OPTIONS: Array<{
  value: CustomerMessageTemplate;
  label: string;
  description: string;
}> = [
  {
    value: 'validate_data',
    label: 'Daten prüfen lassen',
    description: 'Kund:in bitten, Angaben zu bestätigen (Demo-Versand).',
  },
  {
    value: 'send_offer',
    label: 'Angebot senden',
    description: 'Kurzes Angebotsanschreiben (Demo – kein PDF).',
  },
];

export const buildCustomerMessage = (
  template: CustomerMessageTemplate,
  ctx: TemplateContext
): { subject: string; body: string } => {
  const brand = siteConfig.name;

  if (template === 'validate_data') {
    return {
      subject: `[Demo] Bitte Angaben prüfen – ${ctx.referenceNumber}`,
      body: [
        `Guten Tag ${ctx.customerName},`,
        '',
        `vielen Dank für Ihre Anfrage ${ctx.referenceNumber} (${ctx.serviceType}).`,
        '',
        'Bevor wir ein Angebot erstellen, bitten wir Sie kurz, die hinterlegten Angaben zu prüfen:',
        '– Anliegen und Beschreibung',
        '– gewünschter Zeitraum',
        '– Budgetrahmen und PLZ',
        '– Kontaktdaten',
        '',
        'Antworten Sie einfach auf diese E-Mail mit Korrekturen oder einer Bestätigung.',
        '',
        `Mit freundlichen Grüßen`,
        `${brand} (Demo)`,
        '',
        '— Dies ist eine Demo-Nachricht. Es wurde keine echte E-Mail versendet. —',
      ].join('\n'),
    };
  }

  const totalLine =
    ctx.offerTotalNet != null
      ? `Ungefähre Netto-Summe (Demo): ${ctx.offerTotalNet.toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR',
        })}`
      : 'Details zum Angebot finden Sie in der Demo-Ansicht im Adminbereich.';

  return {
    subject: `[Demo] Ihr Angebot – ${ctx.referenceNumber}`,
    body: [
      `Guten Tag ${ctx.customerName},`,
      '',
      `anbei unser Angebot zu Ihrer Anfrage ${ctx.referenceNumber}.`,
      ctx.offerTitle ? `Titel: ${ctx.offerTitle}` : null,
      totalLine,
      '',
      'Dieses Schreiben ist Teil der Demo-Plattform – es enthält kein PDF und keinen verbindlichen Vertrag.',
      'Bei Fragen antworten Sie gerne auf diese Nachricht (Demo).',
      '',
      `Mit freundlichen Grüßen`,
      `${brand} (Demo)`,
      '',
      '— Dies ist eine Demo-Nachricht. Es wurde keine echte E-Mail versendet. —',
    ]
      .filter(Boolean)
      .join('\n'),
  };
};
