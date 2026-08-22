import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BenefitsSection, TimelineSection, FaqSection, CtaSection } from '@repo/ui';
import { getServices, getProjects, getFaqs } from '@/lib/content';
import { siteConfig } from '@/lib/config/site';
import { SectionMotion } from './components/SectionMotion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Start',
  description: siteConfig.description,
  robots: { index: false, follow: false },
};

const HomePage = async () => {
  const [services, projects, faqs] = await Promise.all([
    getServices(),
    getProjects(),
    getFaqs(),
  ]);

  const benefits = [
    {
      title: 'Klarer Ablauf',
      description: 'Von der Anfrage bis zur Einschätzung – nachvollziehbare Schritte statt Überraschungen.',
    },
    {
      title: 'Lokaler Fokus (Demo)',
      description: 'Showcase für Berliner Wohnungen und kleinere Gewerbeflächen – fiktiver Betrieb.',
    },
    {
      title: 'Dokumentiert',
      description: 'Optionale Fotos und eine verständliche Beschreibung helfen bei der Einschätzung.',
    },
  ];

  const steps = [
    { title: '1. Anliegen wählen', description: 'Leistung und Kurzbeschreibung im Formular.' },
    { title: '2. Details & Dateien', description: 'Zeitraum, Budget-Hinweis, optionale Fotos.' },
    { title: '3. Kontakt & Prüfung', description: 'Angaben prüfen und Demo-Anfrage absenden.' },
    { title: '4. Referenznummer', description: 'Lokale Speicherung – keine echte Auftragsannahme.' },
  ];

  return (
    <div className="w-full">
      <section className="relative w-full min-h-[calc(100svh-7.5rem)] overflow-hidden">
        <Image
          src="/demo/hero-workshop.jpg"
          alt="Demo-Motiv: Handwerksarbeit (Pexels-Stockfoto, kein Kundenprojekt)"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/35" />
        <div className="relative mx-auto flex min-h-[calc(100svh-7.5rem)] w-full max-w-5xl flex-col justify-center px-4 py-16 sm:px-6">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg">
            Fiktiver Handwerksbetrieb und Showcase von Lück Digital. Kostenlose Einschätzung anfordern
            – nur lokal in dieser Demo gespeichert.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/anfrage"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Kostenlose Einschätzung anfordern
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center rounded-md border border-foreground/20 bg-background/70 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      <SectionMotion className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          Kurz vorgestellt
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          KiezWerk Berlin steht in diesem Showcase für Handwerk mit klarer Kommunikation: Reparatur,
          Wartung, Renovierung, Bad, Innenausbau und kleinere Elektroarbeiten. Keine erfundenen
          Zertifikate, keine erfundenen Kundenzahlen – nur ein nachvollziehbarer Demo-Prozess.
        </p>
      </SectionMotion>

      <SectionMotion className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            Leistungen
          </h2>
          <p className="mt-2 text-muted-foreground">Überblick der Demo-Leistungsbereiche.</p>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group flex flex-col gap-1 py-5 transition-colors hover:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:underline group-hover:underline-offset-4">
                    {service.title}
                  </h3>
                  <p className="max-w-md text-sm text-muted-foreground sm:text-right">
                    {service.shortDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SectionMotion>

      <SectionMotion>
        <BenefitsSection title="Vorteile im Demo-Prozess" items={benefits} />
      </SectionMotion>

      <SectionMotion className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          Ausgewählte Demo-Projekte
        </h2>
        <p className="mt-2 text-muted-foreground">
          Stockfotos von Pexels – ausdrücklich keine echten Kundenprojekte.
        </p>
        <ul className="mt-10 grid gap-10 sm:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <li key={project.id} className="group">
              <div className="relative aspect-[16/10] overflow-hidden">
                {project.imagePath ? (
                  <Image
                    src={project.imagePath}
                    alt={`Demo-Projekt: ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                ) : null}
                <span className="absolute left-3 top-3 bg-background/95 px-2 py-1 text-xs font-medium text-foreground">
                  Demo-Projekt
                </span>
              </div>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
                {project.category}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href="/projekte"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Alle Demo-Projekte ansehen
          </Link>
        </div>
      </SectionMotion>

      <SectionMotion>
        <TimelineSection title="Ablauf einer Anfrage" steps={steps} />
      </SectionMotion>

      <SectionMotion>
        <FaqSection
          title="FAQ-Auszug"
          description="Ausführliche Antworten finden Sie unter FAQ."
          items={faqs.slice(0, 3).map((f) => ({ question: f.question, answer: f.answer }))}
        />
      </SectionMotion>

      <SectionMotion>
        <CtaSection
          title="Bereit für eine Demo-Einschätzung?"
          description="Senden Sie eine fiktive Anfrage – sie bleibt in Ihrer lokalen Demo-Datenbank."
          primaryAction={{ label: 'Kostenlose Einschätzung anfordern', href: '/anfrage' }}
          secondaryAction={{ label: 'FAQ lesen', href: '/faq' }}
        />
      </SectionMotion>
    </div>
  );
};

export default HomePage;
