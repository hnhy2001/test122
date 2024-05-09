import React, { Suspense } from "react";
import { cache } from "react";
import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostSocial from "../../social/PostSocial";
import { Checkbox } from "@/components/ui/checkbox";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import RFQItem from "../../rfq/RFQItem";
import Follow from "@/components/Follow";
import LoadMorePost from "../../supplier/[id]/LoadMorePost";
import LoadMoreRFQ from "./LoadMoreRfq";
import SendMessage from "@/components/SendMessage";
import LoadMore from "./LoadMoreProduct";
import Loading from "@/components/Loading";
import ProductTab from "./ProductTab";
import PostTab from "./PostTab";
import RfqTab from "./RfqTab";
import Tab from "./Tab";

const getbuyer = cache(async (id: string) => {
  const buyer: any = await getRequest("/buyer/detail?code=" + id);
  return buyer;
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idPart = params.id.split("-i.");
  const id = idPart[idPart.length - 1]
  const buyer: any = await getbuyer(id);
  return {
    title: buyer.buyer.name,
    openGraph: {
      images: [],
    },
  };
}

const BuyerDetail = async ({ params, searchParams }: any) => {
  const session = await getServerSession(options);
  const user = session?.user;
  const idPart = params.id.split("-i.");
  const id = idPart[idPart.length - 1]
  const type = searchParams?.type;
  const {
    buyer,
    suggest_product_list,
    post,
    rfq,
    representative,
  }: any = await getRequest("/buyer/detail?code=" + id);

  return (
    <div className=" py-20 flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-8 md:items-end container">
          <Image
            src={buyer.avatar}
            alt={buyer.name}
            width={288}
            height={288}
            className="w-72 h-72  object-cover"
          />
          <div>
            <p className="font-bold text-4xl">{buyer.name}</p>
            <div className="flex gap-4 flex-col md:flex-row text-[#8C8585]">
              <p className="text-3xl">Buyer</p>
              <p className="text-3xl underline">
                {buyer.follower_count} Followers
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-wrap text-xl font-bold border-b border-gray-400 my-11">
          <Tab />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 relative container">
          {!type || type == "overview" ? (
            <div className="flex flex-col gap-4 col-span-2 ">
              <div className="pb-20 flex flex-col gap-4">
                <p className="text-3xl font-bold">About</p>
                <table className="border-separate border-spacing-1 w-full font-medium">
                  {Object.keys(buyer.company_detail).map((key: any) => (
                    <tbody key={key}>
                      <tr className="grid grid-cols-3">
                        <td className="text-gray-700 text-xl col-span-1">
                          {key}
                        </td>
                        <td className="text-[#404040] text-xl col-span-2">
                          {buyer.company_detail[key]}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              {buyer?.company_verification && (
                <div className="pb-20 flex flex-col gap-4">
                  <div className="text-3xl font-bold flex gap-5 items-center">
                    Verification Details{" "}
                    <p className="text-sm font-bold">Validated by Tridge</p>
                  </div>
                  <div className="flex">
                    <div className="ring-1 ring-gray-300 p-4">
                      <div className="flex flex-col gap-3 font-medium">
                        <div className="text-base text-[#8C8585]">
                          Tips: Add verification details to be recognized as a
                          trusted business partner.
                        </div>
                        {Object.keys(buyer?.company_verification).map((key) => (
                          <div className="flex gap-3 text-xl" key={key}>
                            <p>{key}</p>
                            <p>{buyer?.company_verification[key]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {suggest_product_list.length > 0 && (
                <div className="pb-20 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Products</p>
                    <Link
                      href={"?type=products"}
                      className="flex gap-2 items-center"
                    >
                      View all{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                  <p>
                    Check out the products Tridge Fulfillment Buyer is looking
                    to source for.
                  </p>
                  {suggest_product_list.slice(0, 5).map((pd: any) => (
                    <div
                      key={pd.code}
                      className="flex justify-between items-center font-medium"
                    >
                      <div className="w-full">
                        <p className="font-bold pb-5">{pd.name}</p>
                        <div className="grid grid-cols-3 w-full">
                          <p className="col-span-1 text-lg text-gray-700">
                            Sourcing Countries
                          </p>
                          <p className="col-span-2 text-lg text-[#404040]">
                            {pd.origin_country?.name}
                          </p>
                          <p className="col-span-1 text-lg text-gray-700">
                            Packaging Type
                          </p>
                          <p className="col-span-2 text-lg text-[#404040]">
                            {pd.summary["VARIETY"]}
                          </p>
                        </div>
                      </div>
                      <Image
                        src={pd.avatar}
                        alt="buyer"
                        width={112}
                        height={112}
                        className="w-28 h-28 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              {rfq.length > 0 && (
                <div className="pb-20 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold">RFQs</p>
                    <Link
                      href={"?type=rfqs"}
                      className="flex gap-2 items-center"
                    >
                      View all{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                  {rfq.slice(0, 2).map((rfq: any) => (
                    <RFQItem key={rfq.code} dt={rfq} user={user} />
                  ))}
                </div>
              )}

              {/* <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <Image
                    src={"/555.png"}
                    alt={"sfd"}
                    width={135}
                    height={128}
                  />
                  <div className="flex flex-col gap-2">
                    <p className="italic text-[#6473B1]">Closed</p>
                    <p className="text-xl text-[#081342] font-bold">
                      Popcorn · 500 ton
                    </p>
                    <p className="flex gap-2 items-start">
                      <Image
                        src={"/account.png"}
                        alt="account"
                        width={20}
                        height={20}
                      />
                      <strong> Reqested by:</strong> Trait d'union consulting{" "}
                    </p>
                    <p className="flex gap-2 items-start">
                      <Image
                        src={"/ana.png"}
                        alt="anlisynt"
                        width={20}
                        height={20}
                      />
                      <strong>Annual Revenue:</strong> USD 50M~100M
                    </p>
                  </div>
                  <div></div>
                </div>
                <Separator className="mb-2 bg-[#081342] w-2/3" />
                <table className="border-separate border-spacing-1">
                  <tbody>
                    <tr>
                      <td className="text-[#939AA1]">Product Category</td>
                      <td className="font-bold">Popcorn Snack</td>
                    </tr>
                    <tr>
                      <td className="text-[#939AA1]">Port of Destination</td>
                      <td className="font-bold">Damman, Saudi Arabia</td>
                    </tr>
                    <tr>
                      <td className="text-[#939AA1]">Sourcing Countries</td>
                      <td className="font-bold">All countries</td>
                    </tr>
                    <tr>
                      <td className="text-[#939AA1]">Request Duration</td>
                      <td className="font-bold">
                        Dec 26, 2023 ~ Jan 25, 2024 at 14:48 (GMT+07:00)
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="pt-5">
                  <Button>Submit Quote</Button>
                </div>
              </div> */}
              {post.length > 0 && (
                <div className="pb-20 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold">Posts</p>
                    <Link
                      href={"?type=posts"}
                      className="flex gap-2 items-center"
                    >
                      View all{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {!!post &&
                      post
                        .slice(0, 2)
                        .map((dt: any, index: any) => (
                          <div key={index}>
                            <PostSocial user={user} dt={dt} key={index} />
                          </div>
                        ))}
                  </div>
                </div>
              )}
              {/* <p className="text-3xl font-bold">Export History</p>
              <p className="text-2xl font-bold text-[#939AA1]">
                Click on the map or browse the table for more information about
                VITIVALOR WINES's export history.
              </p>
              <Image
                src={"/ss.png"}
                alt="ss"
                width={900}
                height={500}
                className="w-full h-auto"
              /> */}
              {/* <Image
                src={"/flags.png"}
                alt="ss"
                width={900}
                height={500}
                className="w-full h-auto"
              /> */}
              <div className="pb-20 flex flex-col gap-4">
                <p className="text-3xl font-bold">Our People</p>
                <p className="text-2xl font-bold text-[#939AA1]">
                  Representatives
                </p>
                <div className="grid lg:grid-cols-2 gap-16">
                  {representative.map((r: any, index: any) => (
                    <div className="flex flex-col gap-4 border border-gray-300 p-3 rounded-md" key={index}>
                      <div className="flex items-center gap-3">
                        <Image
                          src={r.avatar}
                          alt={r.first_name}
                          width={112}
                          height={112}
                          className="w-28 h-28 object-cover"
                        />
                        <p className="text-xl font-bold text-[#4A4A4A]">
                          {r.first_name} · buyer
                        </p>
                      </div>
                      <Follow code={r?.code} followers={r?.followed_users} products={r?.products_followed} user={user} type="BUYER" />

                      <p>
                        Let's meet and discuss about your needs ! We have
                        exclusive french wines that could fit your customers
                        expectations.
                      </p>
                      <div className="flex gap-5">
                        {/* <Button variant={"outline"}>Book a Meeting</Button> */}
                        <SendMessage />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : type == "posts" ? (
            <div className="col-span-2">
              <PostTab user={user} id={id} />
            </div>
          ) : type == "products" ? (
            <div className="col-span-2">
              <ProductTab id={id} />
            </div>
          ) : (
            <div className="col-span-2">
              <RfqTab user={user} id={id} />
            </div>
          )}
          <div className="sticky h-64 rounded-lg top-4 flex flex-col gap-4">
            <p className="text-3xl font-bold">Contact buyer</p>
            <p className="text-lg text-[#ACADAF]">Representative</p>
            <div className="flex flex-col gap-6">
              {representative.map((r: any, index: any) => (
                <div
                  className="flex gap-3 justify-between items-center"
                  key={index}
                >
                  <div className="flex gap-5 items-center">
                    <Image
                      src={r.avatar}
                      alt={r.first_name}
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                    <div>
                      <p className="font-bold text-[#081440]">{r.first_name}</p>
                      <p className="font-bold text-[#908E8E]">{r.email}</p>
                      <p className="font-bold text-sm underline text-[#8C8585]">
                        View detail
                      </p>
                    </div>
                  </div>
                  <Checkbox />
                </div>
              ))}
              <SendMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDetail;
