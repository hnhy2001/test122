"use client";
import { Button } from "@/components/ui/button";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import RFQItem from "../../rfq/RFQItem";

const LoadMoreRFQ = ({ id, length, total }: any) => {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const fetchData = () => {
    setLoading(true);
    getRequest("/rfq/list?supplier_code=" + id + "&limit=2&page=" + page)
      .then((data) => {
        setData((prev: any) => [...prev, ...data?.data]);
        setPage((prev) => prev + 1);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="flex flex-col gap-20">
        {data.map((dt: any, index: any) => (
          <RFQItem key={index} dt={dt} />
        ))}
      </div>
      {length + data.length < total && (
        <div className="w-full flex pt-20 justify-center items-center">
          {loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={fetchData} variant="outline">
              Load more
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default LoadMoreRFQ;
