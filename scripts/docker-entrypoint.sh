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
prisma db push --accept-data-loss --schema=./prisma/schema.prisma --url="$DATABASE_URL"

if [ "${RUN_DB_SEED:-true}" = "true" ]; then
  echo "[kiezwerk] seeding demo data..."
  tsx prisma/seed.ts
fi

echo "[kiezwerk] starting app..."
exec node server.js
