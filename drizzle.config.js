export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://neondb_owner:npg_hb4HEpVSq6cR@ep-hidden-bonus-a8f3eplm-pooler.eastus2.azure.neon.tech/health_analyzer?sslmode=require",
    connectionString:
      "postgresql://neondb_owner:npg_hb4HEpVSq6cR@ep-hidden-bonus-a8f3eplm-pooler.eastus2.azure.neon.tech/health_analyzer?sslmode=require",
  },
};
