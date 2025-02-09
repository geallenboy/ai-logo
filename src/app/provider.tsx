"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { usersUpdateAction } from "./actions/user-actions";
import userStore from "@/store/userStore.ts";
const supabase = createClient();
export default function Provider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<any>(null);
  const setUserData = userStore((state) => state.setData);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user, 7789);
    if (user) {
      setUsers(user);
    }
  };

  const CheckUserAuth = useCallback(async () => {
    const { error, success, data } = await usersUpdateAction({
      email: users.email,
      name: users.user_metadata.full_name,
    });
    if (success) {
      setUserData({ ...data });
    }
    console.log(error, success, data, "9999");
  }, [setUserData, users]);

  useEffect(() => {
    users && CheckUserAuth();
  }, [users, CheckUserAuth]);
  return <div>{children}</div>;
}
