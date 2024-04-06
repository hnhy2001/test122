import Image from "next/image";
import React from "react";

const ProductItem = ({ item }: any) => {
  return (
    <div className="flex justify-between items-center">
      <div className="font-bold text-base">{item.name}</div>
      <div className="flex gap-4 items-center">
        <div className="w-[75px] h-[75px]">
          <Image src={item.avatar} width={75} height={75} alt="" />
        </div>
        <div className="w-[20px] h-[20px]">
          <Image src="/edit.png" width={20} height={20} alt="" />
        </div>
        <div className="w-[20px] h-[20px]">
          <Image src="/trash.png" width={20} height={20} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
