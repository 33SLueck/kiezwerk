export interface ProjectItem {
  /** Unique key — used as React key and for filtering */
  id: string;
  title: string;
  description: string;
  /** Image URL — optimise via next/image in consuming app */
  image: string;
  imageAlt?: string;
  /** Primary tech/category label shown as eyebrow badge */
  category: string;
  /** Full tech stack displayed as secondary badges */
  techStack: string[];
  /** URL to live site — optional */
  liveUrl?: string;
  /** URL to GitHub repo — optional */
  githubUrl?: string;
  /** Accent colour class for category badge, e.g. 'bg-primary/10 text-primary' */
  accentClass?: string;
}

export interface ProjectsSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  projects: ProjectItem[];
  /** Show category filter pills above the grid */
  filterable?: boolean;
  className?: string;
}
