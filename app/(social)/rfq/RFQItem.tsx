import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SubmitQuote from "./SubmitQuote";

const RFQItem = ({ dt, user }: any) => {
  return (
    <div className="flex flex-col gap-4 p-2 rounded-lg shadow-lg" key={dt.code}>
      <Link
        target="_blank"
        href={"/rfq/" + dt.name.split(" ").join("-") + "-i." + dt.code}
        className="flex gap-3"
      >
        <Image
          src={dt.avatar}
          alt={dt.name}
          width={135}
          height={128}
          className="w-44"
        />
        <div className="flex flex-col gap-2">
          <p className="italic text-[#6473B1]">{dt.status}</p>
          <p className="text-xl text-[#081342] font-bold">{dt.name}</p>
          <p className="flex gap-2 items-start">
            <Image src={"/account.png"} alt="account" width={20} height={20} />
            <strong> Reqested by:</strong> {dt.buyer.name}{" "}
          </p>
          <p className="flex gap-2 items-start">
            <Image src={"/ana.png"} alt="anlisynt" width={20} height={20} />
            <strong>Annual Revenue:</strong> {dt.revenue}
          </p>
        </div>
        <div></div>
      </Link>
      <Separator className="mb-2 bg-[#081342]" />
      <div className="flex-1 font-medium">
        <div className="flex gap-3">
          <p className="text-gray-700 w-44">Product Category</p>
          <p className="font-bold">{dt.product_category_name}</p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-700 w-44">Port of Destination</p>
          <p className="font-bold">{dt.port_destination}</p>
        </div>
        <div className="flex gap-3 justify-between">
          <p className="text-gray-700 w-44">Sourcing Countries</p>
          <p className="font-bold break-all flex-1 line-clamp-3">
            {dt.source_country}
          </p>
        </div>
        <div className="flex gap-3">
          <p className="text-gray-700 w-44">Request Duration</p>
          <p className="font-bold">{dt.shipment_date}</p>
        </div>
      </div>

      <div className="pt-5">
        <SubmitQuote code={dt.code} user={user}/>
      </div>
    </div>
  );
};

export default RFQItem;
