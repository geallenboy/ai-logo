"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LogoTitle from "@/components/create/logo-title";
import LogoDesc from "@/components/create/logo-desc";
import LogoPalette from "@/components/create/logo-palette";
import LogoDesigns from "@/components/create/logo-designs";
import LogoIdea from "@/components/create/logo-idea";
import { useSearchParams } from "next/navigation";
import PricingModel from "@/components/create/pricing-model";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const CreatePage = () => {
  const [step, setStep] = useState(1);
  const dashboardT = useTranslations("dashboard");
  const searchParam = useSearchParams();
  const [formData, setFormData] = useState({
    palette: "",
    title: searchParam?.get("title") || "",
    desc: "",
    design: null,
    idea: "",
  });
  const onHandleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    console.log(formData);
  };
  const continueClick = () => {
    if (step === 1) {
      if (formData.title === "") {
        toast.info("请输入您的标题");
      } else {
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (formData.desc === "") {
        toast.info("请描述您的愿景");
      } else {
        setStep(step + 1);
      }
    } else if (step === 3) {
      if (formData.palette === "") {
        toast.info("请选择您的配色方案");
      } else {
        setStep(step + 1);
      }
    } else if (step === 4) {
      if (formData.design === null) {
        toast.info("请选择您的风格");
      } else {
        setStep(step + 1);
      }
    } else if (step === 5) {
      if (formData.idea === "") {
        toast.info("请选择您的设计理念");
      } else {
        setStep(step + 1);
      }
    }
  };
  return (
    <div>
      <div className="flex items-center mt-5 flex-col gap-4">
        <h2 className="text-primary text-5xl text-center font-bold">
          {dashboardT("HeroHeading")}
        </h2>
        <h2 className="text-5xl text-center font-bold">
          {dashboardT("HeroSubheading")}
        </h2>
        <h2 className="text-lg text-gray-500 text-center">
          {dashboardT("HeroDesc")}
        </h2>
      </div>
      <div className="mt-10 p-10 border rounded-xl 2xl:mx-72">
        {step === 1 ? (
          <LogoTitle
            title={formData.title}
            onHandleInputChange={(v) => onHandleInputChange("title", v)}
          />
        ) : step === 2 ? (
          <LogoDesc
            desc={formData.desc}
            onHandleInputChange={(v) => onHandleInputChange("desc", v)}
          />
        ) : step === 3 ? (
          <LogoPalette
            palette={formData.palette}
            onHandleInputChange={(v) => onHandleInputChange("palette", v)}
          />
        ) : step === 4 ? (
          <LogoDesigns
            design={formData.design}
            onHandleInputChange={(v) => onHandleInputChange("design", v)}
          />
        ) : step === 5 ? (
          <LogoIdea
            formData={formData}
            onHandleInputChange={(v) => onHandleInputChange("idea", v)}
          />
        ) : step === 6 ? (
          <PricingModel formData={formData} />
        ) : null}
        <div className="flex items-center justify-between mt-6">
          {step != 1 && (
            <Button onClick={() => setStep(step - 1)}>
              <ArrowLeft />
              上一步
            </Button>
          )}

          <Button onClick={continueClick}>
            <ArrowRight />
            继续
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
