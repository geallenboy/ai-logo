```
npx supabase login

npx supabase init

npx supabase start
WARN: no seed files matched pattern: supabase/seed.sql
supabase start is already running.
WARN: no seed files matched pattern: supabase/seed.sql
Stopped services: [supabase_imgproxy_ai-logo supabase_pooler_ai-logo]
supabase local development setup is running.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
  S3 Storage URL: http://127.0.0.1:54321/storage/v1/s3
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
   S3 Access Key: 625729a08b95bf1b7ff351a663f3a23c
   S3 Secret Key: 850181e4652dd023b7a98c58ae0d2d34bd487ee0cc3254aed6eda37307425907
       S3 Region: local
A new version of Supabase CLI is available: v2.15.8 (currently installed v2.9.6)
We recommend updating regularly for new features and bug fixes: https://supabase.com/docs/guides/cli/getting-started#updating-the-supabase-cli

npx supabase link --project-ref qwkccrpysbnsdqfweqki

WARN: no seed files matched pattern: supabase/seed.sql
Enter your database password (or leave blank to skip):
Connecting to remote database...
Finished supabase link.
WARNING: Local config differs from linked project. Try updating supabase/config.toml
diff supabase/config.toml qwkccrpysbnsdqfweqki
--- supabase/config.toml
+++ qwkccrpysbnsdqfweqki
@@ -50,8 +50,7 @@

 [auth]
 enabled = true
-site_url = "http://127.0.0.1:3000"
-additional_redirect_urls = ["https://127.0.0.1:3000"]
+site_url = "https://aiimage.nextjsbase.site"
 jwt_expiry = 3600
 enable_refresh_token_rotation = true
 refresh_token_reuse_interval = 10
@@ -64,8 +63,8 @@
 [auth.mfa]
 max_enrolled_factors = 10
 [auth.mfa.totp]
-enroll_enabled = false
-verify_enabled = false
+enroll_enabled = true
+verify_enabled = true
 [auth.mfa.phone]
 enroll_enabled = false
 verify_enabled = false
@@ -81,11 +80,11 @@
 [auth.email]
 enable_signup = true
 double_confirm_changes = true
-enable_confirmations = false
+enable_confirmations = true
 secure_password_change = false
-max_frequency = "1s"
-otp_length = 6
-otp_expiry = 3600
+max_frequency = "1m0s"
+otp_length = 6
+otp_expiry = 86400
 [auth.email.template]
 [auth.sms]
 enable_signup = false

A new version of Supabase CLI is available: v2.15.8 (currently installed v2.9.6)
We recommend updating regularly for new features and bug fixes: https://supabase.com/docs/guides/cli/getting-started#updating-the-supabase-cli


npx supabase db pull


WARN: no seed files matched pattern: supabase/seed.sql
WARN: no seed files matched pattern: supabase/seed.sql
Connecting to remote database...
Schema written to supabase/migrations/20250305071539_remote_schema.sql
Update remote migration history table? [Y/n] y
Repaired migration history: [20250305071539] => applied
Finished supabase db pull.
A new version of Supabase CLI is available: v2.15.8 (currently installed v2.9.6)
We recommend updating regularly for new features and bug fixes: https://supabase.com/docs/guides/cli/getting-started#updating-the-supabase-cli
The auth and storage schemas are excluded. Run supabase db pull --schema auth,storage again to diff them.

npx supabase migration up
WARN: no seed files matched pattern: supabase/seed.sql
Connecting to local database...
Applying migration 20250305071539_remote_schema.sql...
Local database is up to date.
A new version of Supabase CLI is available: v2.15.8 (currently installed v2.9.6)
We recommend updating regularly for new features and bug fixes: https://supabase.com/docs/guides/cli/getting-started#updating-the-supabase-cli

npx supabase db reset


```
