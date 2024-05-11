import { getRequest } from "@/hook/api";
import { Iinsight } from "@/type/insight.interface";
import { Metadata } from "next";
import React, { Suspense } from "react";
import insightItem from "@/app/(social)/insight/insightItem";
import LoadMoreinsight from "./Loadmoreinsight";

export const metadata: Metadata = {
    title: "Insight",
    description: "Insight",
};

const Insight = async (props: any) => {
    const keyword = props?.keyword || "";
    const category = props?.category || "";
    const countries = props?.countries;

    const [insightData] = await Promise.all([
        getRequest(
            "/insight/list?limit=" +
            6 +
            "&keyword=" +
            keyword +
            "&category_code=" +
            category +
            "&level=1"
        ),
    ]);
    const insights: any[] = insightData?.data;
    return (
        <div >
            <p className="text-3xl font-bold pb-3 text-[#081440]">Insights</p>
            <p className="py-3 text-[#081342]">
                {insightData?.total_record + " Results"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {insights.map((pd: any, index: any) => {
                    const country = countries.find(
                        (country: any) => country.code == pd.origin_country?.code
                    );
                    return (
                        <insightItem key={index} pd={pd} country={country} />
                    );
                })}
            </div>
            <div className="flex justify-center text-[#081342] py-20">
                <LoadMoreinsight countries={countries} keyword={keyword} category={category} length={insights.length} total={insightData?.total_record} />
            </div>
        </div>
    );
};

export default Insight;
