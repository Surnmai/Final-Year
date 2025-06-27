import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Links drizzle database to NEON database/console created
const sql = neon(
  "postgresql://neondb_owner:npg_hb4HEpVSq6cR@ep-hidden-bonus-a8f3eplm-pooler.eastus2.azure.neon.tech/health_analyzer?sslmode=require",
  // "postgresql://cancer_owner:npg_p2IUXWxdAO6M@ep-red-mountain-a181hjke-pooler.ap-southeast-1.aws.neon.tech/cancer?sslmode=require",
);

// set Up the Drizzle to interact with the Database using the defined schema
export const db = drizzle(sql, { schema });
