"use client";
import { Button } from "@/components/ui/button";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import ProductItem from "./ProductItem";

const LoadMoreProduct = ({ id }: any) => {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const fetchData = () => {
    setLoading(true);
    getRequest("/product/list?user_code=" + id + "&limit=2&page=" + page)
      .then((data) => {
        setData((prev: any) => [...prev, ...data?.data]);
        setPage((prev) => prev + 1);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="flex flex-col gap-3">
        {data.map((dt: any, index: any) => (
          <ProductItem key={index} item={dt} />
        ))}
      </div>
      <div className="w-full flex pt-4 justify-center items-center">
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button onClick={fetchData} variant="outline" size={"lg"}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoadMoreProduct;
