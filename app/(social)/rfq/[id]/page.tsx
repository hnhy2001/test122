import React from "react";
import { cache } from "react";
import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubmitQuote from "../SubmitQuote";
import { parseISO } from "date-fns";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import DeleteRFQ from "./DeleteRFQ";
import DeleteSubmit from "./DeleteSubmit";
import Follow from "@/components/Follow";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import SendMessage from "@/components/SendMessage";

const getrfq = cache(async (id: string) => {
  const rfq: any = await getRequest("/rfq/detail?code=" + id);
  return rfq;
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idPart = params.id.split("-i.");
  const id = idPart[idPart.length - 1]
  const rfq: any = await getrfq(id);
  console.log(rfq)
  return {
    title: rfq.rfq?.product_name,
    openGraph: {
      images: [],
    },
  };
}

const RfqDetail = async ({ params }: any) => {
  const idPart = params.id.split("-i.");
  const id = idPart[idPart.length - 1]
  const { rfq, buyer, submitted_quotes, status }: any = await getrfq(id);
  const session = await getServerSession(options);
  const user = session?.user;
  return (
    <div className="py-11 container flex flex-col gap-4">
      <p className="text-4xl pb-9 font-bold text-[#081440]">RFQS</p>
      <p className="text-xl text-[#6473B1]">{status}</p>
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
        <div className="flex gap-7 flex-col md:flex-row items-center">
          <Image
            src={rfq?.product_category?.avatar}
            alt={rfq.product_name}
            width={208}
            height={208}
            className="w-52 h-52 object-contain"
          />
          <div className="flex flex-col gap-3">
            <p className="text-4xl font-bold text-[#081342]">
              {rfq.product_name}
            </p>
            <div className="grid grid-cols-4">
              <p className="text-2xl font-light">Product Category</p>
              <p className="text-2xl font-bold col-span-3 pl-4">
                {rfq.product_category.name}
              </p>
              <p className="text-2xl font-light">Request Duration</p>
              <p className="text-2xl font-bold col-span-3 pl-4">
                {"" +
                  moment(rfq?.logistic_terms?.target_shipment_date?.value).format('YYYY-MM-DD')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <SubmitQuote code={id} reload={true} user={user} />
          {buyer?.code == user?.code && <DeleteRFQ code={id} />}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-14">
        <div className="flex flex-col gap-9">
          <p className="text-2xl font-bold text-[#081440]">RFQ Details</p>
          <div>
            <p className="text-lg font-bold text-[#081440]">Product Details</p>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                {Object.keys(rfq.attribute_detail).map((key: any) => (
                  <tr key={key} className="grid grid-cols-2">
                    <td className="text-[#8C8585] text-xl col-span-1">{key}</td>
                    <td className="text-[#404040] text-xl">
                      {rfq.attribute_detail[key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-lg font-bold text-[#081440]">
              Sourcing Countries
            </p>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Sourcing Countries
                  </td>
                  <td className="text-[#404040] text-xl  break-all">
                    {rfq.source_country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-lg font-bold text-[#081440]">
              Expected Order Quantity
            </p>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Tentative Purchasing Volume
                  </td>
                  <td className="text-[#404040] text-xl">
                    {rfq.expected_order_quantity.tentative_purchasing_volume
                      .quantity +
                      " " +
                      rfq.expected_order_quantity.tentative_purchasing_volume
                        .unit}
                  </td>
                  {
                    rfq.expected_order_quantity.trial_order.agree == 1 &&
                    <td className="text-[#8C8585] text-xl col-span-1">
                      Trial Order
                    </td>
                  }
                  {
                    rfq.expected_order_quantity.trial_order.agree == 1 &&
                    <td className="text-[#404040] text-xl flex gap-1 items-center">
                      {rfq.expected_order_quantity.trial_order.quantity + " " + rfq.expected_order_quantity.trial_order.unit}
                      {
                        rfq.expected_order_quantity.trial_order.nonnegotiable == 1 ? <Badge>nonnegotiable</Badge> : <Badge>Negotiable</Badge>
                      }
                    </td>
                  }
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-lg font-bold text-[#081440]">Requirements</p>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Packaging Types
                  </td>
                  <td className="text-[#404040] text-xl">
                    {rfq.requirements.package_type.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-lg font-bold text-[#081440]">Logistic Terms</p>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Delivery Terms
                  </td>
                  <td className="text-[#404040] text-xl">
                    {rfq.logistic_terms.delivery_term["term"]
                      .map((dt: any) => dt.name)
                      .join(", ")}
                  </td>
                </tr>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Port of Destination
                  </td>
                  <td className="text-[#404040] text-xl">
                    {rfq.logistic_terms.port_of_destination.country.name}
                  </td>
                </tr>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Target Shipment Date
                  </td>
                  <td className="text-[#404040] text-xl flex gap-1 items-center">
                    {rfq.logistic_terms.target_shipment_date.value}
                    {
                      rfq.logistic_terms.nonegotiable == 1 ? <Badge>nonnegotiable</Badge> : <Badge>Negotiable</Badge>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-lg font-bold text-[#081440] flex gap-1 items-center">Payment Terms
              {
                rfq.payment_terms.nonegotiable == 1 ? <Badge>nonnegotiable</Badge> : <Badge>Negotiable</Badge>
              }
            </div>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Payment Terms
                  </td>
                  <td className="text-[#404040] text-xl">
                    {rfq.payment_terms.type
                      .map((dt: any) => dt.name)
                      .join(", ")}
                  </td>
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Detailed Payment Terms
                  </td>
                  <td className="text-[#404040] text-xl flex gap-1 items-center">
                    {rfq.payment_terms.detailed_payment_terms.description}
                    {
                      rfq.payment_terms.detailed_payment_terms.nonegotiable == 1 ? <Badge>nonnegotiable</Badge> : <Badge>Negotiable</Badge>
                    }
                  </td>
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Payment To Be Made By
                  </td>
                  <td className="text-[#404040] text-xl flex gap-1 items-center">
                    {rfq.payment_terms.payment_to_be_made_by}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-lg font-bold text-[#081440] flex gap-1 items-center">Additional Information
            </div>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Reason For This Request
                  </td>
                  <td className="text-[#404040] text-xl">
                    {rfq.additional_information.reason_for_this_request}
                  </td>
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Intended Usage
                  </td>
                  <td className="text-[#404040] text-xl flex gap-1 items-center">
                    {rfq.additional_information.intended_usage}
                  </td>
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Additional details
                  </td>
                  <td className="text-[#404040] text-xl flex gap-1 items-center">
                    {rfq.additional_information.additional_details}
                  </td>
                  <td className="text-[#8C8585] text-xl col-span-1">
                    Attachment
                  </td>
                  <td className="text-[#404040] text-xl flex gap-1 items-center">
                    {!rfq.additional_information.attachment ? "False" : <div className="flex gap-3 flex-wrap">
                      {
                        rfq.additional_information.attachment.map((attachment: any, index: any) => <Image key={index} width={208} height={208} src={attachment} alt="image" className="w-52 h-52 object-cover" />)
                      }
                    </div>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div className="flex flex-col gap-9">
          <p className="text-2xl font-bold text-[#081440]">Buyer Information</p>
          <div>
            <p className="text-lg font-bold text-[#081440]">
              Company Information
            </p>
            <table className="border-separate border-spacing-1 w-full">
              <tbody>
                {Object.keys(buyer.company_detail).map((key: any) => (
                  <tr key={key} className="grid grid-cols-2">
                    <td className="text-[#8C8585] text-xl col-span-1">{key}</td>
                    <td className="text-[#404040] text-xl">
                      {buyer.company_detail[key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-lg font-bold text-[#081440]">Submitted By</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={buyer.avatar}
                  alt={buyer.name}
                  width={112}
                  height={112}
                  className="w-28 h-28 object-cover"
                />
                <p className="text-xl font-bold text-[#4A4A4A]">
                  {buyer.name} · Supplier
                </p>
              </div>
              <div className="flex gap-4 underline items-center">
                <p>0 Followers</p>
                <p>3 Products</p>
                <Follow code={buyer?.code} />
              </div>
              <div>
                <SendMessage />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-2xl font-bold text-[#081440] pt-4">
        RFQ Submited Quotes List
      </p>
      <div className="grid grid-cols-3 gap-10">
        {submitted_quotes?.map((sq: any, index: any) => (
          <div className="p-4 shadow-xl rounded-xl" key={index}>
            <div className="flex justify-between items-center">
              <Link
                href={
                  "/supplier/" +
                  sq?.supplier?.name.split(" ").join("-") +
                  "-i." +
                  sq?.supplier?.code
                }
                className="flex gap-10 items-center"
              >
                <Image
                  alt={sq?.supplier?.name}
                  src={sq?.supplier?.representative[0].avatar}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover"
                />
                <p className="text-xl font-bold">{sq?.supplier?.name}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
              <div className="flex justify-between">
                {user.code == sq?.supplier?.code && (
                  <DeleteSubmit rfqcode={id} code={sq.code} />
                )}
              </div>
            </div>
            <p className="font-bold text-lg py-5">Quote Info</p>

            <table className="border-separate border-spacing-1 w-full">
              <tbody className="flex flex-col gap-1">
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-lg col-span-1">
                    Suggested Price
                  </td>
                  <td className="text-[#404040] text-lg font-semibold">
                    {sq?.offer_price}
                  </td>
                </tr>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-lg col-span-1">
                    Total Amount
                  </td>
                  <td className="text-[#404040] text-lg font-semibold">
                    {sq?.total_amount}
                  </td>
                </tr>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-lg col-span-1">
                    Original Country
                  </td>
                  <td className="text-[#404040] text-lg font-semibold">
                    {sq?.origin_country}
                  </td>
                </tr>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-lg col-span-1">
                    Delivery Method
                  </td>
                  <td className="text-[#404040] text-lg font-semibold">
                    {sq?.delivery_method}
                  </td>
                </tr>
                <tr className="grid grid-cols-2">
                  <td className="text-[#8C8585] text-lg col-span-1">
                    Estimate Delivery Date
                  </td>
                  <td className="text-[#404040] text-lg font-semibold">
                    {sq?.estimated_delivery_date} ~ {sq?.estimated_delivery_to}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RfqDetail;
