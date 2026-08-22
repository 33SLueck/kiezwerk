import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

/**
 * Returns true when DATABASE_URL is configured.
 * Use this as a feature flag before making Prisma queries in server actions
 * so templates still work without a running database.
 *
 * @example
 * ```ts
 * if (isDbConfigured()) {
 *   await prisma.product.findMany();
 * } else {
 *   return staticProductsData;
 * }
 * ```
 */
export const isDbConfigured = (): boolean =>
  typeof process.env.DATABASE_URL === 'string' && process.env.DATABASE_URL.length > 0;

export * from './generated/client';
