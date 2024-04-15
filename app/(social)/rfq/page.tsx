import LoadMore from "@/components/LoadMore";
import SearchBar from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getRequest } from "@/hook/api";
import { IRFQ } from "@/type/rfq.interface";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RFQItem from "./RFQItem";
import CategoryItems from "@/components/CategoryItems";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "RFQS",
  description: "RFQS",
};

const RFQ = async (props: any) => {
  const page = +props?.searchParams?.page || 1;
  const limit = 4 * page;
  const keyword = props?.searchParams?.keyword || " ";
  const category = props?.searchParams?.category || " ";
  const session = await getServerSession(options);
  const user = session?.user; 
  const [rfqData] = await Promise.all([
    getRequest(
      "/rfq/list?limit=" +
        limit +
        "&keyword=" +
        keyword +
        "&category_code=" +
        category +
        "&level=1"
    ),
  ]);
  const rfqs: IRFQ[] = rfqData?.data;
  return (
    <div className="container">
      <div className="flex justify-between py-7 items-center">
        <p className="text-3xl font-bold text-[#081440]">RFQS</p>
        <Link href={"/rfq/create-rfq"} target="_blank">
          <Button>+ Create RFQ</Button>
        </Link>
      </div>
      <div>
        <SearchBar placeholder="Search rfqs" category_number="10" />
        <CategoryItems />
      </div>
      <p className="py-3 text-[#081342]">
        {rfqData?.total * rfqs.length + " Results"}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {rfqs.map((dt) => (
          <RFQItem dt={dt} key={dt.code} user={user}/>
        ))}
      </div>
      <div className="flex justify-center text-[#081342] py-20">
        {rfqs.length < rfqData?.total_record && (
          <Link scroll={false} href={"/rfq?page=" + (+page + 1)}>
            <LoadMore />
          </Link>
        )}
      </div>
    </div>
  );
};

export default RFQ;
