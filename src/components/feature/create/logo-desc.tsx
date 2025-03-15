import React from "react";
import { useTranslations } from "next-intl";
import Description from "./description";
import { Input } from "@/components/ui/input";

const LogoDesc = ({
  onHandleInputChange,
  desc,
}: {
  desc: string;
  onHandleInputChange: (v: string) => void;
}) => {
  const dashboardT = useTranslations("dashboard");
  return (
    <div>
      <Description
        title={dashboardT("LogoDescTitle")}
        desc={dashboardT("LogoDescDesc")}
      />
      <Input
        className="mt-5 p-6"
        type="text"
        value={desc}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
};

export default LogoDesc;
