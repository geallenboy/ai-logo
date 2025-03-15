import React from "react";
import { Info } from "@/components/feature/dashboard/Info";
import LogoList from "@/components/feature/dashboard/LogoList";

const DashboardPage = async () => {
  return (
    <section className="container mx-auto flex-1 space-y-6">
      <Info />
      <LogoList />
    </section>
  );
};

export default DashboardPage;
