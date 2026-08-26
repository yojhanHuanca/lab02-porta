const connectionString = process.env.DATABASE_URL;
const isNeon = !!connectionString && connectionString.includes('neon.tech');

// Neon's serverless driver talks HTTPS instead of the raw Postgres wire protocol (port 5432).
// This keeps local dev working on networks that block outbound 5432, while production
// (Render's own Postgres, wired via render.yaml) still uses the standard pg driver.
const { Pool } = isNeon ? require('@neondatabase/serverless') : require('pg');

const pool = new Pool(
  isNeon
    ? { connectionString }
    : {
        connectionString,
        ssl: connectionString && connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
      },
);

async function initSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(120) NOT NULL,
      correo VARCHAR(160) NOT NULL UNIQUE,
      telefono VARCHAR(30),
      rol VARCHAR(30) NOT NULL DEFAULT 'usuario',
      creado_en TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

module.exports = { pool, initSchema };
