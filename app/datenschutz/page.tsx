import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Datenschutz (Demo)',
  robots: { index: false, follow: false },
};

const DatenschutzPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 prose prose-neutral dark:prose-invert">
      <h1>Datenschutz</h1>
      <p className="rounded-md border border-amber-700/40 bg-amber-50 px-4 py-3 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">
        Dies ist ein technischer Demo-Platzhalter und keine rechtliche Beratung.
      </p>
      <p>
        In diesem lokalen Showcase von {siteConfig.showcaseBy} werden Formularangaben nur in der
        lokalen PostgreSQL-Datenbank und optional im Upload-Volume gespeichert. Es findet kein
        Versand an externe Dienste statt (kein Analytics, keine echte E-Mail).
      </p>
      <p>
        Bitte keine echten personenbezogenen Daten eingeben. Demo-Daten können über das Zurücksetzen
        der Docker-Volumes gelöscht werden.
      </p>
      <p>
        Vor einem produktiven Einsatz wäre eine vollständige Datenschutzprüfung erforderlich. Diese
        Demo erhebt keinen Anspruch auf rechtliche Compliance.
      </p>
    </div>
  );
};

export default DatenschutzPage;
