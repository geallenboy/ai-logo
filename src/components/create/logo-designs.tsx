import { useTranslations } from "next-intl";
import React from "react";
import Description from "./description";
import LogoDesignsData from "@/context/logo-desig";
import Image from "next/image";

const LogoDesigns = ({
  onHandleInputChange,
  design,
}: {
  design: any;
  onHandleInputChange: (v: any) => void;
}) => {
  const dashboardT = useTranslations("dashboard");
  return (
    <div className="my-10">
      <Description
        title={dashboardT("LogoDesignTitle")}
        desc={dashboardT("LogoDesignDesc")}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {LogoDesignsData.map((item, index) => (
          <div
            key={index}
            onClick={() => onHandleInputChange(item)}
            className={`p-1 hover:border-2 border-primary rounded-xl cursor-pointer ${
              design.title == item.title && "border-2 rounded-lg border-primary"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={200}
              className="w-full rounded-xl h-[200px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoDesigns;
