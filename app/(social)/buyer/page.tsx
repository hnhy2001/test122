import CategoryItems from "@/components/CategoryItems";
import LoadMore from "@/components/LoadMore";
import SearchBar from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import BuyerItem from "./BuyerItem";

export const metadata: Metadata = {
  title: "Buyer",
  description: "Buyer",
};

const buyer = async (props: any) => {
  const page = +props?.searchParams?.page || 1;
  const limit = 4 * page;
  const keyword = props?.searchParams?.keyword || " ";
  const category = props?.searchParams?.category || " ";

  const [buyerData, countryData] = await Promise.all([
    getRequest(
      "/buyer/list?limit=" +
        limit +
        "&keyword=" +
        keyword +
        "&category_code=" +
        category +
        "&level=1"
    ),
    getRequest("/config/countries"),
  ]);
  const buyers: any[] = buyerData?.data;
  console.log(buyers);
  const countries: any[] = countryData?.data;
  return (
    <div className="container">
      <p className="text-3xl font-bold py-7 text-[#081440]">Buyers</p>
      <div>
        <SearchBar placeholder="Search buyers" category_number="10" />
        <CategoryItems />
      </div>
      <p className="py-3 text-[#081342]">
        {buyerData.total_record + " Results"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {buyers?.map((pd: any, index: any) => {
          const country = countries.find(
            (country) => country.code == pd.country.name
          );
          return <BuyerItem pd={pd} country={country} key={index} />;
        })}
      </div>
      <div className="flex justify-center text-[#081342] py-20">
        {buyers && buyers?.length < buyerData?.total_record && (
          <Link scroll={false} href={"/buyer?page=" + (+page + 1)}>
            <LoadMore />
          </Link>
        )}
      </div>
    </div>
  );
};

export default buyer;
