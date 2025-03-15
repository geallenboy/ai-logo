import React from "react";

const Description = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-primary">
        {title}
      </h2>
      <p className="text-lg text-gray-500 mt-2">{desc}</p>
    </div>
  );
};

export default Description;
