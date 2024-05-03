"use client";
import { Button } from "@/components/ui/button";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import ProductItem from "../../product/ProductItem";
import Link from "next/link";
import Image from "next/image";

const LoadMore = ({ id, length, total }: any) => {
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const fetchData = () => {
        setLoading(true);
        getRequest("/product/list-for-buyer?buyer_code=" + id + "&limit=2&page=" + page)
            .then((data) => {
                setData((prev: any) => [...prev, ...data?.data]);
                setPage((prev) => prev + 1);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };
    console.log(length, total)
    return (
        <div>
            <div className="flex flex-col gap-3">
                {data.map((pd: any) => (
                    <Link
                        key={pd.code}
                        href={"/product/" + pd.name.split(" ").join("-") + "-i." + pd.code}
                        className="flex justify-between items-center pb-4 border-b border-gray-400"
                    >
                        <div className="w-full flex gap-5">
                            <Image
                                src={pd.avatar}
                                alt="buyer"
                                width={320}
                                height={320}
                                className="w-80 h-80 object-cover"
                            />
                            <div className="flex flex-col gap-3">
                                <p className="font-bold underline text-2xl break-all line-clamp-2">
                                    {pd.name}
                                </p>
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    <p className="col-span-1 text-lg text-[#8C8585]">
                                        Sourcing Countries
                                    </p>
                                    <p className="col-span-2 text-lg text-[#404040]">
                                        {pd.origin_country?.name}
                                    </p>
                                    <p className="col-span-1 text-lg text-[#8C8585]">
                                        Packaging Type
                                    </p>
                                    <p className="col-span-2 text-lg text-[#404040]">
                                        {pd.summary["VARIETY"]}
                                    </p>
                                </div>
                                {/* <div>
                        <Button>Contacts Now</Button>
                      </div> */}
                            </div>
                        </div>
                    </Link>
                ))}
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

export default LoadMore;
