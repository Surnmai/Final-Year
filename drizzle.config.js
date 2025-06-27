// const neonAPIKey = import.meta.env.VITE_NEON_API_KEY;

export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://neondb_owner:npg_hb4HEpVSq6cR@ep-hidden-bonus-a8f3eplm-pooler.eastus2.azure.neon.tech/health_analyzer?sslmode=require",
    connectionString:
      "postgresql://neondb_owner:npg_hb4HEpVSq6cR@ep-hidden-bonus-a8f3eplm-pooler.eastus2.azure.neon.tech/health_analyzer?sslmode=require",
  },

  //   dbCredentials: {
  //     url: "postgresql://cancer_owner:npg_p2IUXWxdAO6M@ep-red-mountain-a181hjke-pooler.ap-southeast-1.aws.neon.tech/cancer?sslmode=require",
  //     connectionString:
  //       "postgresql://cancer_owner:npg_p2IUXWxdAO6M@ep-red-mountain-a181hjke-pooler.ap-southeast-1.aws.neon.tech/cancer?sslmode=require",
  //   },
};
