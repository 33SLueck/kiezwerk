import type { Metadata } from 'next';
import { FaqSection, CtaSection } from '@repo/ui';
import { getFaqs } from '@/lib/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Häufige Fragen zum Demo-Showcase KiezWerk Berlin.',
  robots: { index: false, follow: false },
};

const FaqPage = async () => {
  const faqs = await getFaqs();

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 pt-16">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
          FAQ
        </h1>
        <p className="mt-3 text-muted-foreground">
          Antworten rund um dieses Demo-Projekt von Lück Digital.
        </p>
      </div>
      <FaqSection title="" items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <CtaSection
        title="Noch Fragen? Stellen Sie eine Demo-Anfrage"
        primaryAction={{ label: 'Zur Anfrage', href: '/anfrage' }}
      />
    </div>
  );
};

export default FaqPage;
