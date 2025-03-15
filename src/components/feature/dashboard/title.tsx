"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const Title = () => {
  const dashboardT = useTranslations("dashboard");
  const [logoTitle, setLogoTitle] = useState("");

  return (
    <div className="flex items-center mt-28 flex-col gap-4">
      <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl text-center font-bold">
        {dashboardT("HeroHeading")}
      </h2>
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
        {dashboardT("HeroSubheading")}
      </h2>
      <h2 className="text-lg text-gray-500 text-center">
        {dashboardT("HeroDesc")}
      </h2>
      <div className="flex gap-6 w-full mt-10">
        <Input
          placeholder={dashboardT("InputTitlePlaceholder")}
          className="p-6 border rounded-md w-full shadow-md"
          onChange={(e) => setLogoTitle(e.target.value)}
        />
        <Link href={"/create?title=" + logoTitle}>
          <Button className="h-full p-4">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Title;
