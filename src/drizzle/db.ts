
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"

let dbConfig = null
console.log(process.env.NODE_ENV, '=======')
if (process.env.NODE_ENV == 'development') {
  dbConfig = {
    schema,
    connection: {
      connectionString: process.env.DATABASE_URL!,
      ssl: true
    }
  }
} else {
  dbConfig = {
    schema,
    connection: {
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    },
  }
}
export const db = drizzle(dbConfig)



