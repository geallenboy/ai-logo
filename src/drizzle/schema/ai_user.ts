import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../schemaHelpers"


export const AIUserTable = pgTable("ai_user", {
  id,
  clerkUserId: text().notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  credits: integer().notNull().default(5),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),
  createdAt,
  updatedAt,
})


export type AIUser = typeof AIUserTable.$inferSelect