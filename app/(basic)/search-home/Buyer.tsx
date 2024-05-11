import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import React from "react";
import LoadMoreBuyer from "./LoadmoreBuyer";
import BuyerItem from "@/app/(social)/buyer/BuyerItem";

export const metadata: Metadata = {
    title: "Buyer",
    description: "Buyer",
};

const Buyer = async (props: any) => {
    const keyword = props?.keyword || "";
    const category = props?.category || "";
    const countries = props?.countries;

    const [BuyerData] = await Promise.all([
        getRequest(
            "/buyer/list?limit=" +
            4 +
            "&keyword=" +
            keyword +
            "&category_code=" +
            category +
            "&level=3"
        ),
    ]);
    const Buyers: any[] = BuyerData?.data;
    console.log(BuyerData)
    return (
        <div >
            <p className="text-3xl font-bold pb-3 text-[#081440]">Buyers</p>
            <p className="py-3 text-[#081342]">
                {BuyerData?.total_record + " Results"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Buyers.map((pd: any, index: any) => {
                    const country = countries.find(
                        (country: any) => country.code == pd.origin_country?.code
                    );
                    return (
                        <BuyerItem key={index} pd={pd} country={country} />
                    );
                })}
            </div>
            <div className="flex justify-center text-[#081342] py-20">
                <LoadMoreBuyer countries={countries} keyword={keyword} category={category} length={Buyers.length} total={BuyerData?.total_record} />
            </div>
        </div>
    );
};

export default Buyer;
