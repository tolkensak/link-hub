// drizzle.config.ts

import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',  // ✅ Use 'postgresql' instead of 'pg'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
