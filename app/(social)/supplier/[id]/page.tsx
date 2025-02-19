import React, { Suspense } from "react";
import { cache } from "react";
import { getRequest } from "@/hook/api";
import { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MONTH } from "@/const/month";
import PostSocial from "../../social/PostSocial";
import { Checkbox } from "@/components/ui/checkbox";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Follow from "@/components/Follow";
import ProductItem from "./ProductItem";
import LoadMore from "./LoadMore";
import LoadMorePost from "./LoadMorePost";
import SendMessage from "@/components/SendMessage";
import WhyUs from "./WhyUs";
import Loading from "@/components/Loading";
import PostTab from "./PostTab";
import ProductTab from "./ProductTab";
import Tab from "./Tab";
import ReactPlayer from "react-player";
import VideoYoutube from "./VideoYoutube";

const getsupplier = cache(async (id: string) => {
  const supplier: any = await getRequest("/supplier/detail?code=" + id);
  return supplier;
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idPart = params.id.split("-i.");
  const id = idPart[idPart.length - 1];
  const supplier: any = await getsupplier(id);
  return {
    title: supplier.supplier?.name,
    openGraph: {
      images: [],
    },
  };
}

const SupplierDetail = async ({ params, searchParams }: any) => {
  const session = await getServerSession(options);
  const user = session?.user;
  const idPart = params.id.split("-i.");
  const id = idPart[idPart.length - 1];
  const type = searchParams?.type;

  const suppliers: any = await getsupplier(id);
  const {
    supplier,
    suggest_post_list,
    suggest_product_list,
    representative,
    company_verification,
  } = suppliers;
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={"/2468.png"}
        alt="2468"
        width={1700}
        height={248}
        className="w-full h-[40vh] object-cover"
      />
      <div className="">
        <div className=" mx-auto mb-36 -m-36 flex flex-col pb-11">
          <div className="flex flex-col md:flex-row gap-8 md:items-end container">
            <Image
              src={supplier?.avatar}
              alt="2468"
              width={288}
              height={288}
              className="w-72 h-72 aspect-square object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold text-4xl">{supplier.name}</p>
              <div className="flex gap-4 flex-col md:flex-row text-[#8C8585]">
                <p className="text-3xl underline">
                  {supplier?.follower_count} Follower
                </p>
                <p className="text-3xl underline">
                  {supplier?.product_count} Products
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-wrap text-xl font-bold gap-3 border-b border-gray-400 my-11">
            <Tab />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 md:relative container">
            {!type || type == "overview" ? (
              <div className="col-span-2 flex flex-col gap-4">
                {/* <div className='flex gap-5'>
                                        <p className='font-bold text-xl'>About</p>
                                        <p className='font-bold text-xl text-[#8C8585]'>Posts</p>
                                        <p className='font-bold text-xl text-[#8C8585]'>Products</p>
                                        <p className='font-bold text-xl text-[#8C8585]'>Photos & Video</p>
                                        <p className='font-bold text-xl text-[#8C8585]'>Export History</p>
                                        <p className='font-bold text-xl text-[#8C8585]'>Our People</p>
                                        <p className='font-bold text-xl text-[#8C8585]'>Why us</p>
                                        <p className='font-bold text-xl text-[#8C8585]'>Endorsements</p>
                                    </div> */}
                {!Array.isArray(supplier.company_detail) && (
                  <div className="pb-20 flex flex-col gap-4">
                    <p className="text-3xl font-bold">About</p>
                    <table className="border-separate border-spacing-1 w-full font-medium">
                      {Object.keys(supplier.company_detail).map((key) => (
                        <tbody key={key}>
                          <tr className="grid grid-cols-3">
                            <td className="text-gray-700 text-xl col-span-1">
                              {key}
                            </td>
                            <td className="text-[#404040] text-xl col-span-2">
                              {supplier.company_detail[key]}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                )}
                {/* {suggest_product_list.length > 0 && (
                  <div className="pb-20 flex flex-col gap-4">
                    <p className="text-3xl font-bold">Main Products</p>
                    <div className="grid grid-cols-5 gap-1">
                      {suggest_product_list.slice(0, 3).map((product: any) => (
                        <Link
                          href={
                            "/product/" +
                            product.name.split(" ").join("-") +
                            "-i." +
                            product.code
                          }
                          key={product.code}
                        >
                          <Image
                            src={product.avatar}
                            alt={product.name}
                            width={288}
                            height={288}
                            className="w-full aspect-square  object-cover"
                          />
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={"?type=products"}
                      className="underline font-bold flex gap-1 items-center"
                    >
                      View all {suggest_product_list.length} products{" "}
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
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                )} */}
                <div className="pb-20 flex flex-col gap-4">
                  <div className="text-3xl font-bold flex gap-5 items-center">
                    Verification Details{" "}
                    <p className="text-sm font-bold">Validated by Tridge</p>
                  </div>
                  <div className="flex">
                    <div className="ring-1 ring-gray-300 p-4 font-medium">
                      <div className="flex flex-col gap-3">
                        <div className="text-base text-[#8C8585]">
                          Tips: Add verification details to be recognized as a
                          trusted business partner.
                        </div>
                        {Object.keys(company_verification).map((key) => (
                          <div className="flex gap-3 text-xl" key={key}>
                            <p>{key}</p>
                            <p>{company_verification[key]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {suggest_post_list.length > 0 && (
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
                      {suggest_post_list
                        .slice(0, 2)
                        .map((dt: any, index: any) => (
                          <div key={index}>
                            <PostSocial user={user} dt={dt} key={index} />
                          </div>
                        ))}
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {suggest_product_list.slice(0, 4).map((pd: any) => (
                        <Link
                          href={
                            "/product/" +
                            pd.name.split(" ").join("-") +
                            "-i." +
                            pd.code
                          }
                          key={pd.code}
                          className="flex flex-col gap-2 shadow-sm rounded-lg p-2"
                        >
                          <Image
                            src={pd.avatar}
                            alt={pd.name}
                            width={288}
                            height={288}
                            className="w-full aspect-square  object-cover"
                          />
                          <p className="text-xl font-semibold break-all line-clamp-2">
                            {pd.name}
                          </p>
                          <p className="text-xs font-semibold text-gray-700">
                            Processed Style: {pd.summary["PROCESSED STYLE"]}
                          </p>
                          <p className="text-xs font-semibold text-gray-700">
                            Variety: {pd.summary["VARIETY"]}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pb-20 flex flex-col gap-4">
                  <p className="text-3xl font-bold">Videos</p>
                  <p className="text-2xl font-bold">Videos</p>
                  {supplier?.video?.map((e: any, index: any) => (
                    <div key={index}>
                      <p className="font-bold text-xl">{e.title}</p>
                      <p className="font-semibold text-lg text-[#939AA1]">
                        {e.description}
                      </p>
                      {new URL(e.path).hostname == "www.youtube.com" ? (
                        <VideoYoutube path={e.path}/>
                      ) : (
                        <video controls className="w-full aspect-video">
                          <source src={e.path} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  ))}
                </div>
                {/* <p className="text-3xl font-bold">Export History</p>
                <p className="text-2xl font-bold text-[#939AA1]">
                  Click on the map or browse the table for more information
                  about VITIVALOR WINES's export history.
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
                {supplier.certifications.length > 0 && (
                  <div className="pb-20  flex flex-col gap-5">
                    <p className="text-3xl font-bold">Certifications</p>
                    {supplier.certifications.map(
                      (certification: any, index: any) => (
                        <div
                          key={index}
                          className="ring-1 ring-gray-300 rounded-md"
                        >
                          <div className="ring-1 ring-gray-300 text-2xl font-bold py-3 rounded-t-md text-[#404040] flex gap-4 px-6">
                            {/* <Image src={'https://cdn-new.tridge.com/assets/OL3BIG2B.png'} alt="image" width={32} height={32} className="h-8 w-8" /> */}
                            {certification["certificate"]?.name}
                          </div>
                          <table className="border-separate border-spacing-1 w-full px-6 py-6">
                            <tbody className="flex flex-col gap-3">
                              <tr className="grid grid-cols-3">
                                <td className="text-[#8C8585] text-xl col-span-1">
                                  Organization
                                </td>
                                <td className="text-[#404040] text-xl col-span-2">
                                  {certification["organization"]}
                                </td>
                              </tr>
                              <tr className="grid grid-cols-3">
                                <td className="text-[#8C8585] text-xl col-span-1">
                                  Certificate Number
                                </td>
                                <td className="text-[#404040] text-xl col-span-2">
                                  {certification["certificate_number"]}
                                </td>
                              </tr>
                              <tr className="grid grid-cols-3">
                                <td className="text-[#8C8585] text-xl col-span-1">
                                  Issued Date
                                </td>
                                <td className="text-[#404040] text-xl col-span-2">
                                  {certification["date_issued"]}
                                </td>
                              </tr>
                              <tr className="grid grid-cols-3">
                                <td className="text-[#8C8585] text-xl col-span-1">
                                  Validity
                                </td>
                                <td className="text-[#404040] text-xl col-span-2">
                                  {certification["valid_from"] +
                                    " ~ " +
                                    certification["valid_to"]}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )
                    )}
                  </div>
                )}

                <p className="text-3xl font-bold">Our People</p>
                <p className="text-2xl font-bold text-[#939AA1]">
                  Representatives
                </p>
                <div className="grid lg:grid-cols-2 gap-16">
                  {representative?.map((re: any, index: any) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 border border-gray-300 p-3 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={re.avatar}
                          alt="supplier"
                          width={112}
                          height={112}
                          className="w-28 h-28 object-cover"
                        />
                        <p className="text-xl font-bold text-[#4A4A4A]">
                          {re.first_name}
                        </p>
                      </div>
                      <Follow
                        code={re?.code}
                        followers={re?.followed_users}
                        products={re?.products_followed}
                        type="SELLER"
                        user={user}
                      />
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

                  {/* <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-3'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='supplier' width={112} height={112} className='w-28 h-28 object-cover' />
                                        <p className='text-xl font-bold text-[#4A4A4A]'>Thomas Lejeune · Supplier</p>
                                    </div>
                                    <div className='flex gap-4 underline items-center'>
                                        <p>0 Followers</p>
                                        <p>3 Products</p>
                                        <Button>+ Follow</Button>
                                    </div>
                                    <p>Let's meet and discuss about your needs ! We have exclusive french wines that could fit your customers expectations.</p>
                                    <div className='flex gap-5'>
                                        <Button variant={'outline'}>Book a Meeting</Button>
                                        <Button>Send Message</Button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-3'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='supplier' width={112} height={112} className='w-28 h-28 object-cover' />
                                        <p className='text-xl font-bold text-[#4A4A4A]'>Thomas Lejeune · Supplier</p>
                                    </div>
                                    <div className='flex gap-4 underline items-center'>
                                        <p>0 Followers</p>
                                        <p>3 Products</p>
                                        <Button>+ Follow</Button>
                                    </div>
                                    <p>Let's meet and discuss about your needs ! We have exclusive french wines that could fit your customers expectations.</p>
                                    <div className='flex gap-5'>
                                        <Button variant={'outline'}>Book a Meeting</Button>
                                        <Button>Send Message</Button>
                                    </div>
                                </div> */}
                </div>
                <div className="flex justify-between">
                  <p className="text-3xl font-bold">Why Us?</p>
                </div>
                <div className="flex flex-col gap-14">
                  {supplier?.why_us?.map((e: any, index: any) => {
                    return (
                      <div
                        className="flex border border-gray-300 p-3 rounded-md items-center bg-gray-100"
                        key={index}
                      >
                        <div className="text-5xl px-10 text-center flex justify-center font-semibold text-gray-700">
                          {index + 1}
                        </div>
                        <div className="flex flex-col gap-3">
                          <p className="text-xl font-bold">{e.title}</p>
                          <p className="font-semibold">{e.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : type == "posts" ? (
              <div className="col-span-2">
                <PostTab user={user} id={id} />
              </div>
            ) : (
              <div className="col-span-2">
                <ProductTab user={user} id={id} />
              </div>
            )}

            <div className="sticky h-[30rem] rounded-lg top-4 flex flex-col gap-4">
              <p className="text-3xl font-bold">Contact Supplier</p>
              <p className="text-lg text-[#ACADAF]">Representative</p>
              <div className="flex flex-col gap-6">
                {representative?.map((re: any, index: any) => (
                  <div
                    className="flex gap-3 justify-between items-center"
                    key={index}
                  >
                    <div className="flex gap-5 items-center">
                      <Image
                        src={re.avatar}
                        alt="flag"
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover"
                      />
                      <div>
                        <p className="font-bold text-[#081440]">
                          {re.first_name}
                        </p>
                        <p className="font-bold text-[#908E8E]">{re.email}</p>
                        <p className="font-bold text-sm underline text-[#8C8585]">
                          View detail
                        </p>
                      </div>
                    </div>
                    <Checkbox />
                  </div>
                ))}

                <div className="flex flex-col gap-1">
                  <SendMessage />
                  {/* <Button variant={"outline"}>Book a Meeting</Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
