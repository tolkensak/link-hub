// src/lib/db/index.ts

//import 'server-only'; // ✅ Prevents this module from being imported in Client Components

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// This will only run on the server
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
