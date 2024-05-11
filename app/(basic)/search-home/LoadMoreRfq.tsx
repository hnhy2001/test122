"use client";
import RFQItem from "@/app/(social)/rfq/RFQItem";
import { Button } from "@/components/ui/button";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const LoadMoreRfq = ({ length, total, keyword, category, user }: any) => {
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const fetchData = () => {
        setLoading(true);
        getRequest(
            "/rfq/list?limit=4" +
            "&keyword=" +
            keyword +
            "&category_code=" +
            category +
            "&level=3" +
            "&page=" +
            page
        )
            .then((data) => {
                setData((prev: any) => [...prev, ...data?.data]);
                setPage((prev) => prev + 1);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };
    return (
        <div className="w-full">
            <div className="grid md:grid-cols-2 gap-4">
                {data.map((pd: any, index: any) => {
                    return (
                        <RFQItem key={index} dt={pd} user={user} />
                    );
                })}
            </div>
            {length + data.length < total && (
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
            )}
        </div>
    );
};

export default LoadMoreRfq;
