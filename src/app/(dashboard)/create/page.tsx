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

export const CreatePage = () => {
  const [step, setStep] = useState(1);
  const searchParam = useSearchParams();
  const [formData, setFormData] = useState({
    palette: "",
    title: searchParam?.get("title") || "",
    desc: "",
    design: {},
    idea: "",
  });
  const onHandleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    console.log(formData);
  };
  return (
    <div className="mt-20 p-10 border rounded-xl 2xl:mx-72">
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
      ) : null}
      <div className="flex items-center justify-between mt-6">
        {step != 1 && (
          <Button onClick={() => setStep(step - 1)}>
            <ArrowLeft />
            Previous
          </Button>
        )}

        <Button onClick={() => setStep(step + 1)}>
          <ArrowRight />
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CreatePage;
