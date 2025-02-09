"use client";
import userStore from "@/store/userStore.ts";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import Prompt from "@/context/prompt";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { useTranslations } from "next-intl";
import { DownloadIcon, LayoutDashboard, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GenerateLogoPage = () => {
  const userData = userStore((state) => state.data);
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [logoImage, setLogoImage] = useState();
  const searchParams = useSearchParams();
  const modelType = searchParams.get("type");
  const dashboardT = useTranslations("dashboard");

  useEffect(() => {
    if (typeof window != undefined && userData?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        setFormData(JSON.parse(storage));
        console.log(JSON.parse(storage));
      }
    }
  }, [userData]);

  const GenerateAILogo = useCallback(async () => {
    if (modelType != "Free" && Number(userData?.credits) <= 0) {
      toast.info("Not enought credits!!!");
      return;
    }
    setLoading(true);
    const PROMPT = Prompt.LOGO_PROMPT.replace("{logoTitle}", formData?.title)
      .replace("{logoDesc}", formData?.desc)
      .replace("{logoColor}", formData.palette)
      .replace("{logoIdea}", formData?.idea)
      .replace("{logoDesign}", formData?.design?.title)
      .replace("{logoPrompt}", formData?.design?.prompt);

    console.log(PROMPT);
    const result = await axios.post("/api/ai-logo-prompt", {
      prompt: PROMPT,
    });
    console.log(result);
    console.log(userData, "userData");
    if (result?.data?.prompt) {
      const generateResult = await axios.post("/api/ai-generate-logo", {
        prompt: result?.data?.prompt,
        title: formData.title,
        desc: formData.desc,
        type: modelType,
        users: userData,
      });
      console.log("generateResult:", generateResult);
      setLogoImage(generateResult.data?.image);
      setLoading(false);
    }
  }, [formData, modelType, userData]);

  useEffect(() => {
    if (formData?.title?.length > 0) {
      GenerateAILogo();
    }
  }, [formData, GenerateAILogo]);

  const onDownload = () => {
    console.log(logoImage);
    const imageWindow: any = window.open();
    imageWindow.document.write(`<img src="${logoImage}" alt="Base64 Image" />`);
  };
  return (
    <Suspense>
      <div className="mt-16 flex flex-col items-center justify-center ">
        <h2 className="font-bold text-3xl text-primary">
          {loading
            ? dashboardT("LoadingWaitTitle")
            : dashboardT("LoadingWaitTitleOK")}
        </h2>
        {loading && (
          <div className="flex flex-col items-center mt-2">
            <p className="text-xl text-gray-500">
              {dashboardT("LoadingWaitDesc")}
            </p>
            <Image
              src={"/loading.gif"}
              alt="loading"
              width={200}
              height={200}
              className="mt-6"
            />
            <h2 className="mt-2 font-medium text-2xl text-gray-500">
              Do Not Refresh!
            </h2>
          </div>
        )}

        {logoImage && (
          <div className="mt-5">
            <Image
              src={logoImage}
              alt="logo"
              width={300}
              height={300}
              className="rounded-xl"
            />

            <div className="mt-4 flex items-center justify-between gap-5">
              <Button onClick={() => onDownload()}>
                <DownloadIcon /> 下载
              </Button>
              <Link href={"/dashboard"}>
                <Button variant="outline">
                  <LayoutDashboard /> 仪表盘
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default GenerateLogoPage;
