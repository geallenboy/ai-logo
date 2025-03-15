"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Info = () => {
  const { user } = useUserStore();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl md:text-3xl text-primary">
          您好, {user?.name}
        </h2>
        <div className="flex items-center gap-2">
          <Image src={"/coin.png"} alt="coin" width={40} height={40} />
          <h2 className="font-bold text-2xl md:text-3xl">
            剩余积分：{user?.credits}
          </h2>
        </div>
      </div>

      <div className=" flex justify-between items-center mt-6">
        <h2 className="font-bold text-2xl">仪表盘</h2>
        <Link href="/create">
          <Button>+ 创建新Logo</Button>
        </Link>
      </div>
    </div>
  );
};
