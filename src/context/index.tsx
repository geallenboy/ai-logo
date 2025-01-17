import { useLocale } from "next-intl";

export const getI18n = (data: any) => {
  const locale = useLocale();
  return data[locale];
};
