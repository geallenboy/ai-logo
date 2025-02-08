import Image from "next/image";
import React from "react";

const CreditsPage = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="text-4xl font-bold">积分联系</h2>
      <Image src={"/person/wx2.jpg"} alt="wx" width={400} height={500} />
    </div>
  );
};

export default CreditsPage;
