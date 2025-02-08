import React, { useState } from "react";
import Description from "./description";
import { useTranslations } from "next-intl";
import Colors from "@/context/colors";

const LogoPalette = ({
  onHandleInputChange,
  palette,
}: {
  palette: string;
  onHandleInputChange: (v: string) => void;
}) => {
  const dashboardT = useTranslations("dashboard");

  return (
    <div className="my-10">
      <Description
        title={dashboardT("LogoColorPaletteTitle")}
        desc={dashboardT("LogoColorPaletteDesc")}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors.map((item, index1) => (
          <div
            key={index1 + 2}
            className={`flex p-1 ${
              palette == item.name && "border-2 rounded-lg border-primary"
            }`}
          >
            {item?.colors.map((color, index2) => (
              <div
                className="h-24 w-full"
                key={index2 + 3}
                onClick={() => onHandleInputChange(item.name)}
                style={{
                  backgroundColor: color,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoPalette;
