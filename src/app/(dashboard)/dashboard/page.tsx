import React from "react";
import { getUser } from "@/app/actions/user-actions";
import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Info } from "@/components/dashboard/Info";
import LogoList from "@/components/dashboard/LogoList";

const DashboardPage = async () => {
  const supabase = await createServer();
  const user = await getUser(supabase);

  if (!user) {
    return redirect("/login");
  }
  return (
    <section className="container mx-auto flex-1 space-y-6">
      <Info />
      <LogoList />
    </section>
  );
};

export default DashboardPage;
