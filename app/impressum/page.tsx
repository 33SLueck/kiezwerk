import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Impressum (Demo)',
  robots: { index: false, follow: false },
};

const ImpressumPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral dark:prose-invert">
      <h1>Impressum</h1>
      <p className="rounded-md border border-amber-700/40 bg-amber-50 px-4 py-3 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
        Dies ist ein technischer Demo-Platzhalter und keine rechtliche Beratung.
      </p>
      <p>
        <strong>{siteConfig.legalName}</strong> ist ein fiktiver Handwerksbetrieb im Rahmen eines
        Showcase-Projekts von {siteConfig.showcaseBy}. Es handelt sich nicht um einen realen
        Geschäftsbetrieb.
      </p>
      <p>Demo-Adresse: {siteConfig.contact.address}</p>
      <p>Demo-Kontakt: {siteConfig.contact.email}</p>
    </div>
  );
};

export default ImpressumPage;
