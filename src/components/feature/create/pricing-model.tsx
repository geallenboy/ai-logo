"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pricingOption } from "@/data/dashboard";
import { useTranslations } from "next-intl";
import Description from "./description";
import { useI18n } from "@/hooks/use-I18n";

function PricingModel({ formData }: { formData: any }) {
  const dashboardT = useTranslations("dashboard");
  const pricingOptionData = useI18n(pricingOption);

  useEffect(() => {
    if (formData?.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="">
      <Description
        title={dashboardT("LogoPricingModelTitle")}
        desc={dashboardT("LogoPricingModelDesc")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {pricingOptionData.map((pricing: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 border rounded-xl"
          >
            <Image
              src={pricing.icon}
              alt={pricing.title}
              width={60}
              height={60}
            />
            <h2 className="font-medium text-2xl">{pricing.title}</h2>
            <div>
              {pricing.features.map((feature: any, index2: number) => (
                <h2 className="text-lg mt-3" key={index2 + 9}>
                  {feature}
                </h2>
              ))}
            </div>
            <Link href={"/generate-logo?type=" + pricing.title}>
              <Button className="mt-5">{pricing.button}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
