"use client";

import React, { useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const SecuritySetting = ({ user }: any) => {
  const toastId = useId();
  const securitySettingT = useTranslations("account.securitySetting");
  const handleChangePassword = async () => {
    toast.loading(securitySettingT("infoLoading"), { id: toastId });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{securitySettingT("name")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium"> {securitySettingT("password")}</h3>
          <p className="text-sm text-muted-foreground">
            {securitySettingT("desc")}
          </p>
          <Button variant={"outline"} disabled onClick={handleChangePassword}>
            {securitySettingT("button")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySetting;
