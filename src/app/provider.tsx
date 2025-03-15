"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useUserStore } from "@/store/userStore";
import { getCurrentUser } from "@/lib/clerk";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { setUser } = useUserStore();

  const init = useCallback(async () => {
    const data = await getCurrentUser();
    console.log(
      "data:",
      data,
      data?.name && data.id && data.clerkUserId && data.email
    );
    if (data) {
      setUser({
        name: data.name,
        id: data.id,
        clerkUserId: data.clerkUserId,
        email: data.email,
        credits: data?.credits || 0,
        imageUrl: data.imageUrl || null,
        deletedAt: data.deletedAt || null,
        createdAt: data.createdAt || new Date(),
        updatedAt: data.updatedAt || new Date(),
      });
    }
  }, [setUser]);

  useEffect(() => {
    init();
  }, [init]);

  return <div>{children}</div>;
}
