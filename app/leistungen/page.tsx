import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getServices } from '@/lib/content';
import { SectionMotion } from '../components/SectionMotion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Leistungen',
  description: 'Demo-Leistungsübersicht von KiezWerk Berlin – Showcase von Lück Digital.',
  robots: { index: false, follow: false },
};

const LeistungenPage = async () => {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SectionMotion>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
          Leistungen
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Alle Angaben sind Demo-Inhalte eines fiktiven Betriebs. Keine verbindlichen Angebote.
        </p>
      </SectionMotion>

      <ul className="mt-14 space-y-16">
        {services.map((service) => (
          <SectionMotion key={service.id} as="div">
            <li className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {service.imagePath ? (
                  <Image
                    src={service.imagePath}
                    alt={`Demo-Motiv zur Leistung ${service.title} (Pexels)`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                ) : null}
                <span className="absolute left-3 top-3 bg-background/95 px-2 py-1 text-xs font-medium">
                  Demo-Bild
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {service.category}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Details und Ablauf
                </Link>
              </div>
            </li>
          </SectionMotion>
        ))}
      </ul>
    </div>
  );
};

export default LeistungenPage;
