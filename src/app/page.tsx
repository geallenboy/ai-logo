import React from "react";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navigtion from "@/components/landing-page/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries";

export default async function HomePage() {
  const supabase = await createClient();
  const user = await getUser(supabase);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigtion user={user} />
      <Hero />
      {/* <Features /> */}
      <Footer />
    </main>
  );
}
