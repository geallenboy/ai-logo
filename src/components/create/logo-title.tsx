"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import Description from "./description";

const LogoTitle = ({
  onHandleInputChange,
  title,
}: {
  title: string;
  onHandleInputChange: (v: string) => void;
}) => {
  const dashboardT = useTranslations("dashboard");
  return (
    <div>
      <Description
        title={dashboardT("LogoTitle")}
        desc={dashboardT("LogoTitleDesc")}
      />
      <Input
        className="mt-5 p-6"
        type="text"
        defaultValue={title}
        onChange={(e) => onHandleInputChange(e.target.value)}
        placeholder={dashboardT("InputTitlePlaceholder")}
      />
    </div>
  );
};

export default LogoTitle;
