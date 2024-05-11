import LoadMore from "@/components/LoadMore";
import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import RFQItem from "@/app/(social)/rfq/RFQItem";
import LoadMoreRfq from "./LoadMoreRfq";

export const metadata: Metadata = {
    title: "Rfq",
    description: "Rfq",
};

const Rfq = async (props: any) => {
    const keyword = props?.keyword || "";
    const category = props?.category || "";
    const user = props?.user;

    const [RfqData] = await Promise.all([
        getRequest(
            "/rfq/list?limit=" +
            4 +
            "&keyword=" +
            keyword +
            "&category_code=" +
            category +
            "&level=1"
        ),
    ]);
    const Rfqs: any[] = RfqData?.data;
    return (
        <div>
            <p className="text-3xl font-bold pb-3 text-[#081440]">Rfqs</p>
            <p className="py-3 text-[#081342]">
                {RfqData?.total_record + " Results"}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
                {Rfqs.map((pd: any, index: any) => {
                    return (
                        <RFQItem key={index} dt={pd} country={user} />
                    );
                })}
            </div>
            <div className="flex w-full justify-center text-[#081342] py-20">
                <LoadMoreRfq user={user} keyword={keyword} category={category} length={Rfqs.length} total={RfqData?.total_record} />
            </div>
        </div>
    );
};

export default Rfq;
