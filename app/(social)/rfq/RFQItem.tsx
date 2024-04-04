import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SubmitQuote from "./SubmitQuote";

const RFQItem = ({ dt }: any) => {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg" key={dt.code}>
      <Link
        target="_blank"
        href={"/rfq/" + dt.name.split(" ").join("-") + "-*" + dt.code}
        className="flex gap-3"
      >
        <Image src={dt.avatar} alt={dt.name} width={135} height={128} />
        <div className="flex flex-col gap-2">
          <p className="italic text-[#6473B1]">{dt.status}</p>
          <p className="text-xl text-[#081342] font-bold">{dt.name}</p>
          <p className="flex gap-2 items-start">
            <Image src={"/account.png"} alt="account" width={20} height={20} />
            <strong> Reqested by:</strong> {dt.buyer.name}{" "}
          </p>
          <p className="flex gap-2 items-start">
            <Image src={"/ana.png"} alt="anlisynt" width={20} height={20} />
            <strong>Annual Revenue:</strong> USD {dt.revenue}M
          </p>
        </div>
        <div></div>
      </Link>
      <Separator className="mb-2 bg-[#081342] w-2/3" />
      <table className="border-separate border-spacing-1">
        <tbody>
          <tr>
            <td className="text-[#939AA1]">Product Category</td>
            <td className="font-bold">{dt.product_category_name}</td>
          </tr>
          <tr>
            <td className="text-[#939AA1]">Port of Destination</td>
            <td className="font-bold">{dt.port_destination}</td>
          </tr>
          <tr>
            <td className="text-[#939AA1]">Sourcing Countries</td>
            <td className="font-bold">{dt.source_country}</td>
          </tr>
          <tr>
            <td className="text-[#939AA1]">Request Duration</td>
            <td className="font-bold">{dt.shipment_date}</td>
          </tr>
        </tbody>
      </table>
      <div className="pt-5">
        <SubmitQuote code={dt.code} />
      </div>
    </div>
  );
};

export default RFQItem;
