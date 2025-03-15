"use client";
import React, { useCallback, useEffect, useState } from "react";
import Description from "./description";
import axios from "axios";
import { useTranslations } from "next-intl";
import Prompt from "@/data/prompt";
import { Loader2Icon } from "lucide-react";

const LogoIdea = ({
  onHandleInputChange,
  formData,
}: {
  formData: any;
  onHandleInputChange: (v: string) => void;
}) => {
  const dashboardT = useTranslations("dashboard");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);

  const generateLogoDesignIdea = useCallback(async () => {
    setLoading(true);
    const PROMPT = Prompt.DESIGN_IDEA_PROMPT.replace(
      "{logoType}",
      formData?.design.title
    )
      .replace("{logoTitle}", formData.title)
      .replace("{logoDesc}", formData.desc)
      .replace("{logoPrompt}", formData.design.prompt);

    const result = await axios.post("/api/ai-design-ideas", {
      prompt: PROMPT,
    });
    setIdeas(result.data?.ideas);
    setLoading(false);
  }, [
    formData.desc,
    formData.design.prompt,
    formData.design.title,
    formData.title,
  ]);
  useEffect(() => {
    generateLogoDesignIdea();
  }, [generateLogoDesignIdea]);
  return (
    <div className="my-10">
      <Description
        title={dashboardT("LogoIdeaTitle")}
        desc={dashboardT("LogoIdeaDesc")}
      />
      <div className="flex items-center justify-center">
        {loading && <Loader2Icon className="animate-spin my-10" />}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        {ideas &&
          ideas.map((item, index) => (
            <h2
              key={index}
              onClick={() => {
                onHandleInputChange(item);
              }}
              className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${formData.idea == item && "border-primary"}`}
            >
              {item}
            </h2>
          ))}
        <h2
          onClick={() => {
            onHandleInputChange("Let AI Select the best idea");
          }}
          className={`p-2 rounded-full border px-3 cursor-pointer
          hover:border-primary ${
            formData.idea == "Let AI Select the best idea" && "border-primary"
          }`}
        >
          Let AI Select the best idea
        </h2>
      </div>
    </div>
  );
};

export default LogoIdea;
