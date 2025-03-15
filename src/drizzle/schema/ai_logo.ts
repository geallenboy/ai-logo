import { pgTable, text, boolean } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const AILogoTable = pgTable("ai_logo", {
    id,
    userEmail: text().notNull(),
    imageUrl: text().notNull(),
    title: text().notNull(),
    desc: text(),
    userId: text().notNull(),
    isPremium: boolean().notNull().default(false),
    createdAt,
    updatedAt,
});

export type AILogo = typeof AILogoTable.$inferSelect;