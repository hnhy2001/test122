import SearchBar from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { getRequest } from "@/hook/api";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment";
export const metadata: Metadata = {
  title: "Overview Insight",
  description: "Overview Overview Insight",
};
const Overview = async () => {
  const [
    suggestInsightData,
    opinioData,
    newsData,
    groundUpdateData,
    weeklyProductData,
    topicData
  ] = await Promise.all([
    getRequest("/insight/suggest?number_posts=5"),
    getRequest("/insight/on-the-ground-update?total_page=3&page=1"),
    getRequest("/insight/news?total_page=3&page=1"),
    getRequest("/insight/on-the-ground-update?total_page=2&page=1"),
    getRequest("/insight/weekly-product-update?total_page=5&page=1"),
    getRequest("/insight/topic?id=6&total_page=5")
  ]);
  const suggest: any[] = suggestInsightData?.data;
  const opinio: any[] = opinioData?.data?.data;
  const news: any[] = newsData?.data?.data;
  const groundUpdate: any[] = groundUpdateData?.data?.data;
  const weeklyProduct: any[] = weeklyProductData?.data?.data;
  const topics: any[] = topicData?.data?.data;


  console.log(topics[0]);
  return (
    <div className="container py-16">
      <Command className="bg-transparent mx-auto">
        <CommandInput placeholder="Search Insight" />
        <CommandList></CommandList>
      </Command>
      {/* <SearchBar placeholder="Search Insight" category_number="3" /> */}
      <div className="pt-9">
        <div className="pb-6 flex justify-between">
          <p className="font-bold text-2xl text-[#081440]">Latest</p>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
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
            Manage following
          </Button>
        </div>
        <div>
          <Carousel length={suggest?.length}>
            <CarouselContent className="p-1 flex gap-[4.4375rem]">
              {suggest.map((data: any) => (
                <CarouselItem
                  key={data.title_slug}
                  className="md:basis-1/2 lg:basis-1/4 cursor-pointer"
                >
                  <Link href={data.title_slug} className="" target="_blank">
                    <div className="flex flex-col">
                      <p className="font-bold text-[#4A4A4A] text-base">
                        {data.content_type}
                      </p>
                      <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                        {data.title}
                      </p>
                      <div className="flex justify-between text-bold text-[#939AA1]">
                        <div className="flex gap-[0.4375rem]">
                          <Image
                            src={"/penci.png"}
                            alt="penci"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-cover"
                          />
                          <span className="text-bold">{data.author}</span>
                        </div>
                        <div className="flex gap-[0.4375rem]">
                          <Image
                            src={"/time.png"}
                            alt="penci"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-cover"
                          />
                          <span>
                            {moment(data.public_date).format("MMM Do, YYYY")}
                          </span>
                          {/* <span>{data.public_date}</span> */}
                        </div>
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
      <Separator className="my-4" />
      <div className="flex flex-col lg:grid lg:grid-cols-5 gap-[4.5rem] py-8">
        <div className="flex flex-col">
          <span className="font-bold text-2xl text-[#081440] pb-9">
            Featured
          </span>

          <Link href={"#"} target="_blank">
            <div className="flex flex-col pb-[2.3125rem]">
              <Image
                src={opinio[0]?.thumbnail_url}
                alt="khai tay"
                width={362}
                height={121}
                className="w-full aspect-[3/1] object-cover"
              />
              <p className="font-bold text-[#4A4A4A] text-base py-[1.1875rem]">
                News
              </p>
              <p className="font-bold text-xl line-clamp-2 pb-[0.8125rem]">
                {opinio[0].title}
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>{opinio[0].author}</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>
                    {moment(opinio[0].public_date).format("MMM Do, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col pb-[2.3125rem]">
              <Image
                src={opinio[0]?.thumbnail_url}
                alt="khai tay"
                width={362}
                height={121}
                className="w-full aspect-[3/1] object-cover"
              />
              <p className="font-bold text-[#4A4A4A] text-base py-[1.1875rem]">
                News
              </p>
              <p className="font-bold text-xl line-clamp-2 pb-[0.8125rem]">
                {opinio[0].title}
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>{opinio[0].author}</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>
                    {moment(opinio[0].public_date).format("MMM Do, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-span-3 flex flex-col">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <Image
                src={opinio[0]?.thumbnail_url}
                alt={opinio[0]?.title}
                width={796}
                height={325}
                className="w-full aspect-[3.3] object-cover"
              />
              <div className="pt-[1.625rem]">
                <Badge>Opinion</Badge>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                {opinio[0]?.title}
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>{opinio[0].author}</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>
                    {moment(opinio[0].public_date).format("MMM Do, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[4.4375rem] pt-[3.1875rem]">
            <Link href={"#"} target="_blank">
              <div className="flex flex-col">
                <p className="font-bold text-[#4A4A4A] text-base">News</p>
                <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                  {groundUpdate[0].title}
                </p>
                <div className="flex justify-between text-bold text-[#939AA1]">
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/penci.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>{groundUpdate[0].author}</span>
                  </div>
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/time.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>
                      {moment(groundUpdate[0].public_date).format(
                        "MMM Do, YYYY"
                      )}
                    </span>{" "}
                  </div>
                </div>
              </div>
            </Link>
            <Link href={"#"} target="_blank">
              <div className="flex flex-col">
                <p className="font-bold text-[#4A4A4A] text-base">News</p>
                <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                  {groundUpdate[0].title}
                </p>
                <div className="flex justify-between text-bold text-[#939AA1]">
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/penci.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>{groundUpdate[0].author}</span>
                  </div>
                  <div className="flex gap-[0.4375rem]">
                    <Image
                      src={"/time.png"}
                      alt="penci"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover"
                    />
                    <span>
                      {moment(groundUpdate[0].public_date).format(
                        "MMM Do, YYYY"
                      )}
                    </span>{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="gap-4 flexflex-col">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
              <Separator className="my-10" />
            </div>
          </Link>

          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
              <Separator className="my-10" />
            </div>
          </Link>

          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="py-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Weekly Product Updates
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <Carousel length={suggest.length}>
          <CarouselContent className="p-1">
            {weeklyProduct.map((data: any) => (
              <CarouselItem
                key={data.title_slug}
                className=" md:basis-1/3 lg:basis-1/4 cursor-pointer"
              >
                <Link href={data.title_slug} className="p-4" target="_blank">
                  <div className="flex flex-col gap-4 shadow-lg justify-end aspect-[5/6] rounded-lg relative">
                    <Image
                      src={data.thumbnail_url}
                      alt={data.title}
                      width={392}
                      height={392}
                      className="w-full h-full absolute top-0 left-0 z-0 object-cover"
                    />
                    <div className="flex flex-col justify-between gap-4 z-10 text-white bg-gradient-to-b px-6 py-6 from-transparent to-black">
                      <div>
                        <Badge className="bg-white text-black">
                          Weekly Product Updates
                        </Badge>
                      </div>
                      <p className="font-bold text-xl">{data.title}</p>
                      <div className="flex justify-between text-bold text-[#939AA1] z-20">
                        <div className="flex gap-[0.4375rem]">
                          <Image
                            src={"/penci.png"}
                            alt="penci"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-cover"
                          />
                          <span>{data.author}</span>
                        </div>
                        <div className="flex gap-[0.4375rem]">
                          <Image
                            src={"/time.png"}
                            alt="penci"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-cover"
                          />
                          <span>
                            {moment(data.public_date).format("MMM Do, YYYY")}
                          </span>{" "}
                        </div>
                      </div>
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
      <Separator className="my-4" />
      <div className="py-8 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Innovation & Technology
          </p>
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
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src={
              "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
            }
            alt="banhmi"
            width={392}
            height={392}
            className="w-full h-full object-cover aspect-video"
          />
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 md:p-4">
              <p className="text-xl text-[#4A4A4A]">Opinion</p>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <p>
                The global banana industry, valued at USD 64.06 billion in 2023,
                is anticipated to reach USD 76.76 billion by 2030, with Latin
                America and the Caribbean leading in exports. Ecuador,
                Guatemala, the Philippines, Costa Rica, and Colombia dominate
                the market, leveraging favorable climates and sustainable
                practices. Emerging trends include a shift towards sustainable
                farming, increased demand for organic and specialty bananas, and
                a growing market for value-added products. Leading exporters are
                adapting to these trends by expanding product ranges and
                investing in technology. Despite challenges like climate change
                and disease outbreaks, the industry remains resilient, focusing
                on quality, sustainability, and fair labor practices to meet
                evolving consumer demands.
              </p>
              <div className="flex justify-between text-bold text-[#939AA1] z-20">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[4.4375rem]">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className="text-white bg-[#2C2FF2] px-3 py-1 text-[0.625rem] font-bold">
                  Premium
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className=" bg-[#D4CBCB] text-[#081342] px-3 py-1 text-[0.625rem] font-bold">
                  Free access
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="py-8 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Innovation & Technology
          </p>
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
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src={
              "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
            }
            alt="banhmi"
            width={392}
            height={392}
            className="w-full h-full object-cover aspect-video"
          />
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 md:p-4">
              <p className="text-xl text-[#4A4A4A]">Opinion</p>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <p>
                The global banana industry, valued at USD 64.06 billion in 2023,
                is anticipated to reach USD 76.76 billion by 2030, with Latin
                America and the Caribbean leading in exports. Ecuador,
                Guatemala, the Philippines, Costa Rica, and Colombia dominate
                the market, leveraging favorable climates and sustainable
                practices. Emerging trends include a shift towards sustainable
                farming, increased demand for organic and specialty bananas, and
                a growing market for value-added products. Leading exporters are
                adapting to these trends by expanding product ranges and
                investing in technology. Despite challenges like climate change
                and disease outbreaks, the industry remains resilient, focusing
                on quality, sustainability, and fair labor practices to meet
                evolving consumer demands.
              </p>
              <div className="flex justify-between text-bold text-[#939AA1] z-20">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[4.4375rem]">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className="text-white bg-[#2C2FF2] px-3 py-1 text-[0.625rem] font-bold">
                  Premium
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className=" bg-[#D4CBCB] text-[#081342] px-3 py-1 text-[0.625rem] font-bold">
                  Free access
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="py-8 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Innovation & Technology
          </p>
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
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src={
              "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
            }
            alt="banhmi"
            width={392}
            height={392}
            className="w-full h-full object-cover aspect-video"
          />
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 md:p-4">
              <p className="text-xl text-[#4A4A4A]">Opinion</p>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <p>
                The global banana industry, valued at USD 64.06 billion in 2023,
                is anticipated to reach USD 76.76 billion by 2030, with Latin
                America and the Caribbean leading in exports. Ecuador,
                Guatemala, the Philippines, Costa Rica, and Colombia dominate
                the market, leveraging favorable climates and sustainable
                practices. Emerging trends include a shift towards sustainable
                farming, increased demand for organic and specialty bananas, and
                a growing market for value-added products. Leading exporters are
                adapting to these trends by expanding product ranges and
                investing in technology. Despite challenges like climate change
                and disease outbreaks, the industry remains resilient, focusing
                on quality, sustainability, and fair labor practices to meet
                evolving consumer demands.
              </p>
              <div className="flex justify-between text-bold text-[#939AA1] z-20">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[4.4375rem]">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className="text-white bg-[#2C2FF2] px-3 py-1 text-[0.625rem] font-bold">
                  Premium
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className=" bg-[#D4CBCB] text-[#081342] px-3 py-1 text-[0.625rem] font-bold">
                  Free access
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="py-8 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Innovation & Technology
          </p>
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
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src={
              "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
            }
            alt="banhmi"
            width={392}
            height={392}
            className="w-full h-full object-cover aspect-video"
          />
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 md:p-4">
              <p className="text-xl text-[#4A4A4A]">Opinion</p>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <p>
                The global banana industry, valued at USD 64.06 billion in 2023,
                is anticipated to reach USD 76.76 billion by 2030, with Latin
                America and the Caribbean leading in exports. Ecuador,
                Guatemala, the Philippines, Costa Rica, and Colombia dominate
                the market, leveraging favorable climates and sustainable
                practices. Emerging trends include a shift towards sustainable
                farming, increased demand for organic and specialty bananas, and
                a growing market for value-added products. Leading exporters are
                adapting to these trends by expanding product ranges and
                investing in technology. Despite challenges like climate change
                and disease outbreaks, the industry remains resilient, focusing
                on quality, sustainability, and fair labor practices to meet
                evolving consumer demands.
              </p>
              <div className="flex justify-between text-bold text-[#939AA1] z-20">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[4.4375rem]">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className="text-white bg-[#2C2FF2] px-3 py-1 text-[0.625rem] font-bold">
                  Premium
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className=" bg-[#D4CBCB] text-[#081342] px-3 py-1 text-[0.625rem] font-bold">
                  Free access
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="py-8 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Innovation & Technology
          </p>
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
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src={
              "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
            }
            alt="banhmi"
            width={392}
            height={392}
            className="w-full h-full object-cover aspect-video"
          />
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 md:p-4">
              <p className="text-xl text-[#4A4A4A]">Opinion</p>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <p>
                The global banana industry, valued at USD 64.06 billion in 2023,
                is anticipated to reach USD 76.76 billion by 2030, with Latin
                America and the Caribbean leading in exports. Ecuador,
                Guatemala, the Philippines, Costa Rica, and Colombia dominate
                the market, leveraging favorable climates and sustainable
                practices. Emerging trends include a shift towards sustainable
                farming, increased demand for organic and specialty bananas, and
                a growing market for value-added products. Leading exporters are
                adapting to these trends by expanding product ranges and
                investing in technology. Despite challenges like climate change
                and disease outbreaks, the industry remains resilient, focusing
                on quality, sustainability, and fair labor practices to meet
                evolving consumer demands.
              </p>
              <div className="flex justify-between text-bold text-[#939AA1] z-20">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[4.4375rem]">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className="text-white bg-[#2C2FF2] px-3 py-1 text-[0.625rem] font-bold">
                  Premium
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <div className="text-base flex gap-[0.625rem] items-center">
                <span className="font-bold text-[#4A4A4A] ">News</span>{" "}
                <div className=" bg-[#D4CBCB] text-[#081342] px-3 py-1 text-[0.625rem] font-bold">
                  Free access
                </div>
              </div>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col">
              <p className="font-bold text-[#4A4A4A] text-base">News</p>
              <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                Peru: Non-traditional agricultural exports increased by 16.9% in
                January 2024
              </p>
              <div className="flex justify-between text-bold text-[#939AA1]">
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/penci.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Susantimes</span>
                </div>
                <div className="flex gap-[0.4375rem]">
                  <Image
                    src={"/time.png"}
                    alt="penci"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                  />
                  <span>Mar 18, 2024</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="pt-12 pb-32 flex flex-col gap-5 items-center">
        <p className="font-bold text-4xl text-center text-[#081342]">
          Always stay up-to-date with our daily newsletter
        </p>
        <p className="text-2xl text-[#081342] text-center">
          Our newsletter brings you regular updates on emerging trends and
          developments in agri-foods across the globe.
        </p>
        <Button>Learn more</Button>
      </div>
    </div>
  );
};

export default Overview;
