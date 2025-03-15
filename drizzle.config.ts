
import { defineConfig } from "drizzle-kit"

// export default defineConfig({
//     out: "./src/drizzle/migrations",
//     schema: "./src/drizzle/schema.ts",
//     dialect: "postgresql",
//     strict: true,
//     verbose: true,
//     dbCredentials: {
//         password: env.DB_PASSWORD,
//         user: env.DB_USER,
//         database: env.DB_NAME,
//         host: env.DB_HOST,
//         ssl: false,
//     },
// })

export default defineConfig({
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema.ts",
    dialect: "postgresql",
    strict: true,
    verbose: true,
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: false,
    },
})