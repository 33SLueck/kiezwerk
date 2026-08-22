import type { Metadata } from 'next';
import { Suspense } from 'react';
import { InquiryWizard } from './InquiryWizard';

export const metadata: Metadata = {
  title: 'Anfrage',
  description: 'Mehrstufiges Demo-Anfrageformular von KiezWerk Berlin.',
  robots: { index: false, follow: false },
};

const AnfragePage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
        Kostenlose Einschätzung anfordern
      </h1>
      <p className="mt-3 text-muted-foreground">
        Demo-Formular: Angaben werden lokal gespeichert. Bitte keine echten personenbezogenen Daten
        verwenden. Es wird keine E-Mail versendet.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p>Formular wird geladen…</p>}>
          <InquiryWizard />
        </Suspense>
      </div>
    </div>
  );
};

export default AnfragePage;
