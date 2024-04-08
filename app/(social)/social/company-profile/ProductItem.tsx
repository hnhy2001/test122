"use client";
import { useToast } from "@/components/ui/use-toast";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import EditProduct from "./edit-product";

const ProductItem = ({ item, setReload }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handeDelete = () => {
    setLoading(true);
    getRequest("/product/delete/" + item?.code)
      .then(() => {
        toast({
          title: "Suceess",
          description: "Delete Product",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "" + err,
        });
      })
      .finally(() => {
        setReload((prev: any) => !prev);
        setLoading(false);
      });
  };
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
        {/* <EditProduct item={item} /> */}
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div
            onClick={handeDelete}
            className="w-[20px] h-[20px] cursor-pointer"
          >
            <Image src="/trash.png" width={20} height={20} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
