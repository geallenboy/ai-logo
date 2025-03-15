"use client";
import AccountForm from "@/components/feature/users/account-form";
import SecuritySetting from "@/components/feature/users/security-setting";
import Title from "@/components/feature/users/title";
import { useUserStore } from "@/store/userStore";
import React from "react";

const AccountSettingsPage = () => {
  const { user } = useUserStore();
  return (
    <div className="container mx-auto space-y-4">
      <Title />
      <div className="gird space-y-4">
        {user && <AccountForm user={user} />}
        {user && <SecuritySetting user={user} />}
      </div>
    </div>
  );
};

export default AccountSettingsPage;
