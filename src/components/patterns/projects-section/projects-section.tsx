'use client';

import * as React from 'react';
import Image from 'next/image';
import { ExternalLink, Code } from 'lucide-react';
import type { ProjectItem, ProjectsSectionProps } from './projects-section.types';
import {
  getSectionClasses,
  getInnerClasses,
  getHeaderClasses,
  getEyebrowClasses,
  getTitleClasses,
  getDescriptionClasses,
  getFilterBarClasses,
  getFilterPillClasses,
  getGridClasses,
  getCardClasses,
  getImageWrapClasses,
  getImageClasses,
  getImageOverlayClasses,
  getCardBodyClasses,
  getCategoryClasses,
  getCardTitleClasses,
  getCardDescriptionClasses,
  getTechRowClasses,
  getTechBadgeClasses,
  getLinkRowClasses,
  getLinkClasses,
} from './projects-section.styles';

// ─── ProjectCard ─────────────────────────────────────────────────────────────

const ProjectCard = ({ project }: { project: ProjectItem }) => (
  <article className={getCardClasses()}>
    {/* Image */}
    <div className={getImageWrapClasses()}>
      <Image
        src={project.image}
        alt={project.imageAlt ?? project.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={getImageClasses()}
      />
      <div className={getImageOverlayClasses()} aria-hidden="true" />
    </div>

    {/* Body */}
    <div className={getCardBodyClasses()}>
      <span className={getCategoryClasses(project.accentClass)}>{project.category}</span>

      <h3 className={getCardTitleClasses()}>{project.title}</h3>

      <p className={getCardDescriptionClasses()}>{project.description}</p>

      {/* Tech Stack */}
      {project.techStack.length > 0 && (
        <div className={getTechRowClasses()}>
          {project.techStack.map((tech) => (
            <span key={tech} className={getTechBadgeClasses()}>
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>

    {/* Links */}
    {(project.liveUrl ?? project.githubUrl) && (
      <div className={getLinkRowClasses()}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={getLinkClasses()}
            aria-label={`Visit live site for ${project.title}`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Live Site
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={getLinkClasses()}
            aria-label={`View source code for ${project.title} on GitHub`}
          >
            <Code className="h-3.5 w-3.5" aria-hidden="true" />
            Source
          </a>
        )}
      </div>
    )}
  </article>
);

// ─── ProjectsSection ──────────────────────────────────────────────────────────

export const ProjectsSection = ({
  eyebrow = 'Selected Works',
  title,
  description,
  projects,
  filterable = false,
  className,
}: ProjectsSectionProps) => {
  const [activeFilter, setActiveFilter] = React.useState('All');

  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...cats];
  }, [projects]);

  const filtered = React.useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter)),
    [projects, activeFilter]
  );

  return (
    <section className={getSectionClasses(className)}>
      <div className={getInnerClasses()}>
        {/* Header */}
        <div className={getHeaderClasses()}>
          {eyebrow && <p className={getEyebrowClasses()}>{eyebrow}</p>}
          <h2 className={getTitleClasses()}>{title}</h2>
          {description && <p className={getDescriptionClasses()}>{description}</p>}
        </div>

        {/* Filter pills */}
        {filterable && categories.length > 2 && (
          <div
            className={getFilterBarClasses()}
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={getFilterPillClasses(activeFilter === cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className={getGridClasses()}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
