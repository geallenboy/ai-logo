import {
  Settings2,
  SquareTerminal,
  CreativeCommons,
  CreditCard,
} from "lucide-react";

export const navList = {
  en: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "CreateLogo",
      url: "/create",
      icon: CreativeCommons,
    },
    {
      title: "Credits",
      url: "/credits",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/account-settings",
      icon: Settings2,
    },
  ],
  zh: [
    {
      title: "仪表盘",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "创建Logo",
      url: "/create",
      icon: CreativeCommons,
    },
    {
      title: "积分",
      url: "/credits",
      icon: CreditCard,
    },
    {
      title: "设置",
      url: "/account-settings",
      icon: Settings2,
    },
  ],
};
