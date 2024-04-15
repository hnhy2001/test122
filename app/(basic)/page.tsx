import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getRequest, postRequest } from "@/hook/api";
import { ISupplier } from "@/type/supplier.interface";
import { IProduct } from "@/type/product.interface";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { IRFQ } from "@/type/rfq.interface";
import { IUserProfile } from "@/type/user-profile.interface";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import RFQItem from "../(social)/rfq/RFQItem";
import SwitchRole from "@/components/SwitchRole";
import SupplierItem from "../(social)/supplier/SupplierItem";
import ProductItem from "../(social)/product/ProductItem";
import SearchHome from "./SearchHome";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

const Home = async () => {
  const session = await getServerSession(options);
  const user: IUserProfile = session?.user;
  const [
    supplierData,
    productData,
    countryData,
    rfqData,
    realTimeData,
    suggestInsightData,
    trendingData,
  ] = await Promise.all([
    getRequest("/supplier/list?limit=6"),
    getRequest("/product/list?limit=6"),
    getRequest("/config/countries"),
    user ? getRequest("/rfq/list?limit=4") : null,
    postRequest("/data/price-real-time", {}),
    getRequest("/insight/suggest?number_posts=5"),
    getRequest("/insight/trading?number_posts=6"),
  ]);
  function convertToISO8601(dateStr: any) {
    const parts = dateStr.split(/[- :]/);
    const isoDateStr = `${parts[2]}-${parts[1]}-${parts[0]}T${parts[3]}:${parts[4]}:${parts[5]}Z`;
    return new Date(isoDateStr);
  }
  const suppliers: ISupplier[] = supplierData?.basic_supplier;
  const products: IProduct[] = productData?.data;
  const countries: any[] = countryData?.data;
  const rfq: IRFQ[] = rfqData?.data;
  const realtime: any[] = realTimeData?.data;
  const suggest: any[] = suggestInsightData?.data;
  const trending: any[] = trendingData?.data;

  return (
    <div>
      <div className="w-full relative">
        <Image
          src={"/banner.png"}
          alt="banner"
          width={1920}
          height={750}
          className="h-96 object-cover md:h-auto w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <div className="container w-[80%] flex flex-col gap-6 mx-auto">
            <Carousel>
              <CarouselContent>
                {realtime.map((r) => (
                  <CarouselItem
                    key={r.name}
                    className="md:basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/5 3xl:basis-1/5"
                  >
                    <div className="p-1">
                      <div className="bg-white rounded-xl px-6 py-4 w-full">
                        <p className="line-clamp-1">{r.name}</p>
                        <div
                          className={`font-bold ${
                            r.value < 0 ? "text-[#DE0D1B]" : "text-[#208C35]"
                          } flex gap-4 items-center`}
                        >
                          <Image
                            src={r.value < 0 ? "/down.png" : "/top.png"}
                            alt="top"
                            width={13}
                            height={13}
                            className="h-3"
                          />
                          <p>{r.value}%</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious src="/arrowleft.png" />
              <CarouselNext src="/arrowright.png" />
            </Carousel>
            <SearchHome />
          </div>
        </div>
      </div>
      <div className="container py-6">
        <div className="grid grid-cols-4 gap-9">
          {session?.user && (
            <div className="pb-12 col-span-4">
              <div className="pb-6 flex justify-between">
                <p className="font-bold text-2xl text-[#081440]">RFQ</p>
                <Link href={"/rfq"} className="text-xl text-blue-800">
                  Xem thêm
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {rfq.map((dt) => (
                  <RFQItem dt={dt} key={dt.code} user={user}/>
                ))}
              </div>
            </div>
          )}
          <div className="col-span-4 lg:col-span-3">
            <div>
              <div className="pb-6 flex justify-between">
                <p className="font-bold text-2xl text-[#081440]">Latest</p>
                <p className="text-xl text-blue-800">Xem thêm</p>
              </div>
              <div>
                <Carousel>
                  <CarouselContent className="p-1">
                    {suggest.map((data: any) => (
                      <CarouselItem
                        key={data.title_slug}
                        className="lg:basis-1/3 cursor-pointer"
                      >
                        <Link
                          href={data.title_slug}
                          className="p-4"
                          target="_blank"
                        >
                          <div className="flex flex-col gap-4 shadow-lg rounded-lg p-4">
                            <div>
                              <Badge>{data.category.name}</Badge>
                            </div>
                            <p className="font-bold text-xl line-clamp-2">
                              {data.title}
                            </p>
                            <div className="flex justify-between pt-14">
                              <p>{data.author}</p>
                              <p>
                                {formatDistanceToNow(
                                  new Date(convertToISO8601(data.public_date))
                                )}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious src="/left.png" />
                  <CarouselNext src="/right.png" />
                </Carousel>
              </div>
            </div>
            <div className="py-12">
              <div className="pb-6 flex justify-between">
                <p className="font-bold text-2xl text-[#081440]">Trending</p>
                <p className="text-xl text-blue-800">Xem thêm</p>
              </div>
              <div className="grid lg:grid-cols-3 gap-10">
                {trending.map((data: any) => (
                  <Link
                    target="_blank"
                    href={data.title_slug}
                    className="flex flex-col gap-4 cursor-pointer p-4 shadow-lg rounded-lg"
                    key={data.title_slug}
                  >
                    <div>
                      <Badge>{data.category.name}</Badge>
                    </div>
                    <p className="font-bold text-xl line-clamp-2">
                      {data.title}
                    </p>
                    <p className="text-xl line-clamp-2">{data.content}</p>
                    <div className="flex justify-between pt-5">
                      <p>{data.author}</p>
                      <p>
                        {formatDistanceToNow(
                          new Date(convertToISO8601(data.public_date))
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex flex-col justify-center gap-3 py-10">
              {session?.user ? (
                <div className="flex flex-col justify-center items-center gap-3">
                  <div className="flex gap-7 w-full">
                    <Avatar className="w-28 h-28">
                      <AvatarImage
                        src={session.user?.avatar}
                        alt={session.user?.last_name}
                      />
                      <AvatarFallback>
                        {session.user?.last_name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between gap-3 items-center">
                        <p className="text-xl font-bold">{user.last_name}</p>
                        <Link
                          href={"/my-account"}
                          className="text-sm font-bold text-[#081342] flex gap-1 items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-[#081342]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          Setting
                        </Link>
                      </div>
                      <p className="truncate">{user.email}</p>
                      <SwitchRole user={user} />
                    </div>
                  </div>
                  <div className="w-3/5">
                    <Separator className="my-10 bg-[#081342]" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-3 px-10">
                  <Image src={"/lock.png"} alt="lock" width={58} height={58} />
                  <p className="font-medium text-xl text-center">
                    Sign in to get personalized recommendations
                  </p>
                  <Button>
                    <Link href={"/api/auth/signin"}>Sign in</Link>
                  </Button>

                  <Separator className="my-10 bg-[#081342]" />
                </div>
              )}
              <div className="flex flex-col gap-3">
                <div>
                  <Button className="bg-[#2D9541] hover:bg-[#2D9541]">
                    Premium
                  </Button>
                </div>
                <div>
                  <p className="text-[#081342] font-bold text-3xl">
                    Price Data
                  </p>
                  <p className="text-xl">
                    Millet / Pearl / FAQ / Other Variety: Other ....{" "}
                  </p>
                  <p className="text-xl">India/Jaipur, Rajasthan</p>
                </div>
                <Image
                  src={"/image.png"}
                  alt="image"
                  className="pt-1"
                  width={1000}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-9 pb-10">
          <div className="col-span-3 flex flex-col gap-7">
            <div className="flex justify-between pb-2 items-end">
              <p className="font-bold text-2xl text-[#081440]">
                Recommended Supplier
              </p>
              <Link href={"/supplier"} className="text-xl text-blue-800">
                Xem thêm
              </Link>
            </div>
            <div className="grid xl:grid-cols-6 gap-10">
              {suppliers?.map((supplier, index: any) => {
                return (
                  <SupplierItem key={index} country={countries} pd={supplier} />
                );
              })}
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-7">
            <div className="flex justify-between pb-2 items-end">
              <p className="font-bold text-2xl text-[#081440]">
                Recommended Products
              </p>
              <Link href={"/product"} className="text-xl text-blue-800">
                Xem thêm
              </Link>
            </div>
            <div className="grid xl:grid-cols-6 gap-10">
              {products.map((product, index: any) => {
                return (
                  <ProductItem key={index} country={countries} pd={product} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
