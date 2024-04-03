'use client'
import { useState } from "react";
import AddProduct from "../add-product";
import Image from "next/image";

const ProductTab = () => {
  const [listProduct, setListProduct] = useState([
    {
      name: "Fresh Garlic",
      image: "/garlic.png",
    },
    {
      name: "Fresh Orange",
      image: "/garlic.png",
    },
  ]);
  return (
    <div className="py-8 grid grid-cols-2 gap-12 relative">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-primary">Products</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 col-span-2">
            <div className="text-xs text-[#8C8585]">
              List out all the products that your business has to offer. This
              will help your potential buyers know what they could expect of
              your business.
            </div>
            <div className="text-lg text-[#8C8585]">
              There is no product to be shown yet.
            </div>
          </div>
          <div className="flex justify-end items-end">
            <AddProduct />
          </div>
        </div>
        <div>
          {listProduct.map((item: any) => (
            <div className="flex justify-between items-center">
              <div className="font-bold text-base">{ item.name }</div>
              <div className="flex gap-4 items-center">
                <div className="w-[75px] h-[75px]">
                  <Image src={item.image} width={75} height={75} alt="" />
                </div>
                <div className="w-[20px] h-[20px]">
                  <Image src="/edit.png" width={20} height={20} alt="" />
                </div>
                <div className="w-[20px] h-[20px]">
                  <Image src="/trash.png" width={20} height={20} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductTab;
