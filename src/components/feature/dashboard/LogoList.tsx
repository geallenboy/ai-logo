"use client";

import { getLogosByUserIdAction } from "@/actions/logo/logo-actions";
import { useUserStore } from "@/store/userStore";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

function LogoList() {
  const { user } = useUserStore();
  const [logoList, setLogoList] = useState<any>(null);

  const GetUserLogos = useCallback(async () => {
    const { data, success } = await getLogosByUserIdAction(user?.id || "");
    setLogoList(data.logos);
  }, [user]);

  useEffect(() => {
    user && GetUserLogos();
  }, [user, GetUserLogos]);

  const ViewLogo = (image: string) => {
    const imageWindow: any = window.open();
    imageWindow.document.write(`<img src="${image}" alt="Image" />`);
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {logoList && logoList?.length > 0
          ? logoList.map((logo: any, index: number) => (
              <div
                key={index}
                className="hover:scale-105 transition-all cursor-pointer relative"
                onClick={() => ViewLogo(logo?.imageUrl)}
              >
                {/* Premium badge */}
                {logo?.isPremium && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
                    积分设计
                  </div>
                )}
                {!logo?.isPremium && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
                    免费设计
                  </div>
                )}
                <Image
                  src={logo?.imageUrl}
                  width={400}
                  height={200}
                  className="w-full rounded-xl"
                  alt={logo?.title}
                />
                <h2 className="text-center text-lg font-medium mt-2">
                  {logo?.title}
                </h2>
                <p className="text-sm text-gray-500 text-center">
                  {logo?.desc}
                </p>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default LogoList;
