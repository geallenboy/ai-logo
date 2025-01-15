"use client";
import { startTransition } from "react";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/lib/locale";

export const LanguageSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const items = [
    {
      value: "en",
      label: t("en"),
      img: "🇺🇸",
    },
    {
      value: "zh",
      label: t("zh"),
      img: "🇨🇳",
    },
  ];
  // 切换语言
  const changeLanguage = (value: Locale) => {
    startTransition(() => {
      setUserLocale(value);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{locale === "en" ? "English" : "中文"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {items.map((item: any) => {
          return (
            <DropdownMenuItem
              key={item.value}
              onClick={() => changeLanguage(item.value)}
            >
              <span className="flex items-center gap-2">
                <span role="img" aria-label={item.value}>
                  {item.img}
                </span>
                {t(item.value)}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
