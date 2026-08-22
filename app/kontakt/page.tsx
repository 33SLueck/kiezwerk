import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Demo-Kontaktdaten von KiezWerk Berlin – keine echten Erreichbarkeiten.',
  robots: { index: false, follow: false },
};

const KontaktPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
        Kontakt
      </h1>
      <p className="mt-3 text-muted-foreground">
        Alle Kontaktdaten sind Demo-Platzhalter und nicht erreichbar. Für den Showcase nutzen Sie
        bitte das Anfrageformular.
      </p>
      <dl className="mt-8 space-y-4 text-sm">
        <div>
          <dt className="font-medium text-muted-foreground">E-Mail (Demo)</dt>
          <dd>{siteConfig.contact.email}</dd>
        </div>
        <div>
          <dt className="font-medium text-muted-foreground">Telefon (Demo)</dt>
          <dd>{siteConfig.contact.phone}</dd>
        </div>
        <div>
          <dt className="font-medium text-muted-foreground">Adresse (Demo)</dt>
          <dd>{siteConfig.contact.address}</dd>
        </div>
      </dl>
      <Link
        href="/anfrage"
        className="mt-8 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Zur Demo-Anfrage
      </Link>
    </div>
  );
};

export default KontaktPage;
