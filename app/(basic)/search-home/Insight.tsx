import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import React, { Suspense } from "react";

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
                        <div key={index}>sdf</div>
                    );
                })}
            </div>
            <div className="flex justify-center text-[#081342] py-20">
            </div>
        </div>
    );
};

export default Insight;
