ALTER TABLE "ai_users" RENAME TO "ai_user";--> statement-breakpoint
ALTER TABLE "ai_logos" RENAME TO "ai_logo";--> statement-breakpoint
ALTER TABLE "ai_user" DROP CONSTRAINT "ai_users_clerkUserId_unique";--> statement-breakpoint
ALTER TABLE "ai_user" ADD CONSTRAINT "ai_user_clerkUserId_unique" UNIQUE("clerkUserId");