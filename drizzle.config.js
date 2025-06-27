import { ne } from "drizzle-orm";

const neonAPIKey = import.meta.env.VITE_NEON_API_KEY;

export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",

  dbCredentials: {
    url: neonAPIKey,
    connecionString: neonAPIKey,
  },
};
