import { useLocale } from "next-intl";

export const getI18n = (data: any) => {
  const locale = useLocale();
  console.log(locale, 11234);
  return data[locale];
};
