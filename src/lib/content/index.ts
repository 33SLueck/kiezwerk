import { prisma, isDbConfigured, type Service, type Project, type Faq } from '@repo/db';

/** Content access layer – swap implementation later for a CMS without changing pages. */

const withDb = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
  if (!isDbConfigured()) return fallback;
  try {
    return await fn();
  } catch (error) {
    console.warn('[content] database unavailable, using fallback', error);
    return fallback;
  }
};

export const getServices = async (): Promise<Service[]> =>
  withDb(
    () =>
      prisma.service.findMany({
        where: { active: true },
        orderBy: { sortOrder: 'asc' },
      }),
    []
  );

export const getServiceBySlug = async (slug: string): Promise<Service | null> =>
  withDb(
    () => prisma.service.findFirst({ where: { slug, active: true } }),
    null
  );

export const getProjects = async (category?: string): Promise<Project[]> =>
  withDb(
    () =>
      prisma.project.findMany({
        where: {
          active: true,
          ...(category ? { category } : {}),
        },
        orderBy: { sortOrder: 'asc' },
      }),
    []
  );

export const getProjectCategories = async (): Promise<string[]> => {
  const projects = await getProjects();
  return [...new Set(projects.map((p) => p.category))];
};

export const getFaqs = async (): Promise<Faq[]> =>
  withDb(
    () =>
      prisma.faq.findMany({
        where: { active: true },
        orderBy: { sortOrder: 'asc' },
      }),
    []
  );
