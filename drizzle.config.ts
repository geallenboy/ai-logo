
import { defineConfig } from "drizzle-kit"


console.log(process.env.NODE_ENV, '=======')
let dbConfig = null
if (process.env.NODE_ENV == 'development') {
    dbConfig = {
        url: process.env.DATABASE_URL!,
        ssl: false,
    }
} else {
    if (!process.env.DB_HOST || !process.env.DB_NAME) {
        throw new Error('Database configuration is incomplete');
    }
    dbConfig = {
        password: process.env.DB_PASSWORD ?? '',
        user: process.env.DB_USER ?? '',
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        ssl: false,
    }
}
export default defineConfig({
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema.ts",
    dialect: "postgresql",
    strict: true,
    verbose: true,
    dbCredentials: dbConfig,
})
