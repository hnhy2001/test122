"use client";
import { useToast } from "@/components/ui/use-toast";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EditProduct from "./edit-product";
import ConfirmDelete from "@/components/ConfirmDelete";

const ProductItem = ({ item, setReload }: any) => {
  const handeDelete = async () => {
    await getRequest("/product/delete/" + item?.code);
  };
  return (
    <div className="grid grid-cols-3 items-center border-b border-gray-200 py-3">
      <div className="flex gap-3 items-center col-span-2">
        <p className="font-bold text-xl"> {item.name}</p>
        {/* <EditProduct code={item?.code} setReload={setReload} /> */}
        <ConfirmDelete
          onSubmit={handeDelete}
          type="company"
          setReload={setReload}
        />
        {/* {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            src="/trash.png"
            width={24}
            height={24}
            alt="delete"
            onClick={handeDelete}
            className="w-6 h-6 cursor-pointer"
          />
        )} */}
      </div>
      <div className="flex justify-end gap-4 items-center">
        <Image
          src={item.avatar}
          width={64}
          height={64}
          alt={item.name}
          className="w-16 h-16 object-cover"
        />
      </div>
    </div>
  );
};

export default ProductItem;
