import React from "react";
import Footer from "@/components/feature/landing-page/footer";
import Hero from "@/components/feature/landing-page/hero";
import Navigtion from "@/components/feature/landing-page/navigation";

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigtion />
      <Hero />
      {/* <Features /> */}
      <Footer />
    </main>
  );
}
