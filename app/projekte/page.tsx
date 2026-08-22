import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects, getProjectCategories } from '@/lib/content';
import { SectionMotion } from '../components/SectionMotion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projekte',
  description: 'Demo-Projektgalerie von KiezWerk Berlin – Pexels-Stockfotos, keine Kundenreferenzen.',
  robots: { index: false, follow: false },
};

type PageProps = { searchParams: Promise<{ kategorie?: string }> };

const ProjektePage = async ({ searchParams }: PageProps) => {
  const { kategorie } = await searchParams;
  const [projects, categories] = await Promise.all([
    getProjects(kategorie || undefined),
    getProjectCategories(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <SectionMotion>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight">
          Demo-Projekte
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Alle Einträge sind als Demo gekennzeichnet. Bilder stammen von Pexels und stellen keine
          realen Kundenprojekte dar.
        </p>
      </SectionMotion>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter nach Kategorie">
        <Link
          href="/projekte"
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            !kategorie
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          Alle
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/projekte?kategorie=${encodeURIComponent(cat)}`}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              kategorie === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <ul className="mt-12 grid gap-12 sm:grid-cols-2">
        {projects.map((project) => (
          <SectionMotion key={project.id} as="div">
            <li>
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {project.imagePath ? (
                  <Image
                    src={project.imagePath}
                    alt={`Demo-Projekt: ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                ) : null}
                <span className="absolute left-3 top-3 bg-background/95 px-2 py-1 text-xs font-medium">
                  Demo-Projekt
                </span>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {project.category}
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <p className="mt-3 text-xs text-muted-foreground">{project.locationLabel}</p>
            </li>
          </SectionMotion>
        ))}
      </ul>
    </div>
  );
};

export default ProjektePage;
