"use client";

import { getLogoAction } from "@/app/actions/logo-actions";
import userStore from "@/store/userStore.ts";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function LogoList() {
  const userData = userStore((state) => state.data);
  const [logoList, setLogoList] = useState<any>([]);
  useEffect(() => {
    userData && GetUserLogos();
  }, [userData]);

  const GetUserLogos = async () => {
    const result = await getLogoAction({ user: userData });
    setLogoList([]);
    result?.data.forEach((item: any) => {
      console.log(item, "item");

      setLogoList((prev: any) => [...prev, item]);
    });
  };

  const ViewLogo = (image: string) => {
    const imageWindow: any = window.open();
    imageWindow.document.write(`<img src="${image}" alt="Base64 Image" />`);
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {logoList?.length > 0
          ? logoList.map((logo: any, index: number) => (
              <div
                key={index}
                className="hover:scale-105 transition-all cursor-pointer"
                onClick={() => ViewLogo(logo?.image)}
              >
                <Image
                  src={logo?.image}
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
