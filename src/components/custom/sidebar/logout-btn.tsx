"use client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { useUserStore } from "@/store/userStore";

export const LogoutBtn = () => {
  const sidebarT = useTranslations("sidebar");
  const { signOut } = useClerk();
  const { setUser } = useUserStore();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };
  return (
    <span
      onClick={handleLogout}
      className="inline-block w-full cursor-pointer text-destructive"
    >
      {sidebarT("logout")}
    </span>
  );
};

export default LogoutBtn;
