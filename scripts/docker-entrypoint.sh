#!/bin/sh
set -e

echo "[kiezwerk] Waiting for database..."
node <<'NODE'
const { Pool } = require('pg');
const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL missing');
  process.exit(1);
}
const pool = new Pool({ connectionString: url });
(async () => {
  for (let i = 0; i < 40; i++) {
    try {
      await pool.query('SELECT 1');
      await pool.end();
      process.exit(0);
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  console.error('Database not ready');
  process.exit(1);
})();
NODE

echo "[kiezwerk] prisma db push..."
if [ "${RUN_DB_ACCEPT_DATA_LOSS:-false}" = "true" ]; then
  prisma db push --accept-data-loss --schema=./prisma/schema.prisma --url="$DATABASE_URL"
else
  prisma db push --schema=./prisma/schema.prisma --url="$DATABASE_URL"
fi

if [ "${RUN_DB_SEED:-false}" = "true" ]; then
  echo "[kiezwerk] seeding demo data..."
  node prisma/seed.bundle.cjs
fi

echo "[kiezwerk] starting app..."
exec node server.js
