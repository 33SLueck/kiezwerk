import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProjectsSection } from './projects-section';

const meta = {
  title: 'Patterns/ProjectsSection',
  component: ProjectsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProjectsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoProjects = [
  {
    id: '1',
    title: 'Nexus E-Commerce Platform',
    description:
      'Full-stack e-commerce with Next.js App Router, Stripe checkout, admin dashboard, and Prisma/PostgreSQL backend.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'E-Commerce dashboard screenshot',
    category: 'E-Commerce',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    id: '2',
    title: 'Creative Agency Website',
    description:
      'Premium agency site with scroll-driven animations, Framer Motion page transitions, and a dynamic case study gallery.',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Creative agency homepage',
    category: 'Business',
    techStack: ['Next.js', 'Framer Motion', 'TypeScript', 'Storybook'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    accentClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    id: '3',
    title: 'Analytics SaaS Dashboard',
    description:
      'Real-time KPI dashboard with interactive charts, role-based access control, and dark/light theme support.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Analytics dashboard with charts',
    category: 'SaaS',
    techStack: ['React', 'TypeScript', 'Recharts', 'Prisma', 'NextAuth'],
    githubUrl: 'https://github.com',
    accentClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
];

export const Default: Story = {
  args: {
    eyebrow: 'Selected Works',
    title: "Projects I've built",
    description:
      'A selection of recent client and personal projects across e-commerce, SaaS, and business websites.',
    projects: demoProjects,
    filterable: false,
  },
};

export const WithFilter: Story = {
  args: {
    eyebrow: 'Selected Works',
    title: "Projects I've built",
    description: 'Use the filter to browse by project type.',
    projects: demoProjects,
    filterable: true,
  },
};

export const SingleColumn: Story = {
  args: {
    eyebrow: 'Case Studies',
    title: 'Recent client work',
    projects: demoProjects.slice(0, 1),
    filterable: false,
  },
};
