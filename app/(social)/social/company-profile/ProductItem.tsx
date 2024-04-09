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
        setReload((prev: any) => !prev);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "" + err,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-3">
      <div className="flex gap-3 items-center">
        <p className="font-bold text-xl"> {item.name}</p>
        <Image
          src="/edit.png"
          width={24}
          height={24}
          alt="edit"
          className="h-6 w-6"
        />
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            src="/trash.png"
            width={24}
            height={24}
            alt="delete"
            onClick={handeDelete}
            className="w-6 h-6"
          />
        )}
      </div>
      <div className="flex gap-4 items-center">
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
