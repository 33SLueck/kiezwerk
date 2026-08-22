import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaqSection, CtaSection } from '@repo/ui';
import { getServiceBySlug } from '@/lib/content';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Leistung nicht gefunden' };
  return {
    title: service.title,
    description: service.shortDescription,
    robots: { index: false, follow: false },
  };
};

const LeistungDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const faqItems = Array.isArray(service.faqItems)
    ? (service.faqItems as Array<{ question: string; answer: string }>)
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{service.category} · Demo</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
        {service.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{service.description}</p>

      {service.imagePath ? (
        <div className="relative mt-8 aspect-[21/9] overflow-hidden bg-muted">
          <Image
            src={service.imagePath}
            alt={`Demo-Motiv: ${service.title} (Pexels-Stockfoto)`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <span className="absolute left-3 top-3 bg-background/95 px-2 py-1 text-xs font-medium">
            Demo-Bild (Pexels)
          </span>
        </div>
      ) : null}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Typische Anwendungsfälle</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          {service.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Beispielhafter Ablauf</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
          {service.processSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      {faqItems.length > 0 ? (
        <div className="mt-12">
          <FaqSection title="FAQ zu dieser Leistung" items={faqItems} />
        </div>
      ) : null}

      <div className="mt-8">
        <Link href="/leistungen" className="text-sm text-primary underline-offset-4 hover:underline">
          Zurück zur Übersicht
        </Link>
      </div>

      <CtaSection
        title="Einschätzung zu dieser Leistung anfordern"
        description="Demo-Formular – keine echte Auftragsannahme."
        primaryAction={{
          label: 'Kostenlose Einschätzung anfordern',
          href: `/anfrage?leistung=${encodeURIComponent(service.title)}`,
        }}
      />
    </div>
  );
};

export default LeistungDetailPage;
