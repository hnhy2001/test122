import { Badge } from "@/components/ui/badge";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const metadata: Metadata = {
  title: "Weekly Product Updates  Insight",
  description: "Weekly Product Updates Insight",
};
const WeeklyProductUpdates = () => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between pt-[4.3125rem]">
        <div>
          <p className="text-[2rem] font-bold text-[#081440]">
            Weekly Product Updates
          </p>
          <p className="text-[#081440] font-normal">
            Trending agricultural topics, delivered by our global market
            analysts
          </p>
        </div>
        <div className="flex gap-[0.875rem] items-center">
          <p className="text-081342">20977 content</p>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Command className="bg-transparent mx-auto pt-8 pb-[3.125rem]">
        <CommandInput placeholder="Search For on-the-ground analysis" />
        <CommandList></CommandList>
      </Command>
      <div className="grid xl:grid-cols-2 gap-[2.3125rem] pb-28">
        <div className="flex flex-col gap-[0.8125rem]">
          <Link href={"#"} className="" target="_blank">
            <div className="flex flex-col gap-4 justify-end aspect-[2.3] relative">
              <Image
                src={
                  "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
                }
                alt="banhmi"
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
                <p className="font-bold text-xl">
                  W11 Avocado Update: Colombia's Hass Avocado Exports Increased
                  in Jan-24, Peruvian Avocado Prices Surge 40% to 50% YoY, and
                  Israel's Avocado Industry Thrives with High Harvest and
                  European Demand{" "}
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
            </div>
          </Link>
          <div className="grid lg:grid-cols-2 gap-[0.8125rem]">
            <Link href={"#"} className="" target="_blank">
              <div className="flex flex-col gap-4 justify-end aspect-[1.3] relative">
                <Image
                  src={
                    "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
                  }
                  alt="banhmi"
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
                  <p className="font-bold text-xl">
                    W11 Avocado Update: Colombia's Hass Avocado Exports
                    Increased in Jan-24, Peruvian Avocado Prices Surge 40% to
                    50% YoY, and Israel's Avocado Industry Thrives with High
                    Harvest and European Demand
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
              </div>
            </Link>
            <Link href={"#"} className="" target="_blank">
              <div className="flex flex-col gap-4 justify-end aspect-[1.3] relative">
                <Image
                  src={
                    "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
                  }
                  alt="banhmi"
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
                  <p className="font-bold text-xl">
                    W10 Oat Update: Russian Transbaikal Region Forecasts
                    Increased Crop Harvest in 2024, Lviv Region in Ukraine
                    Initiates Early Spring Sowing{" "}
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
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-[1.0625rem]">
            {Array.from({ length: 4 }).map((value, index) => (
              <Link
                key={index}
                href={"#"}
                target="_blank"
                className="flex gap-[1.3125rem]"
              >
                <Image
                  src={
                    "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
                  }
                  alt="banhmi"
                  width={132}
                  height={132}
                  className="w-[8.25rem] aspect-square object-cover"
                />
                <div>
                  <div className="flex flex-col">
                    <p className="font-bold text-[#4A4A4A] text-base">
                      Weekly Product Updates
                    </p>
                    <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                      Peru: Non-traditional agricultural exports increased by
                      16.9% in January 2024
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
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-end gap-1 text-[#081342] font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5 bg-[#081342] text-white text-center font-bold p-[0.125rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            <div className="w-5 h-5 bg-[#081342] text-white text-center font-bold my-auto">
              {"1"}
            </div>
            <div className="w-5 h-5  text-center font-bold">{"2"}</div>
            <div className="w-5 h-5 text-center font-bold">{"..."}</div>
            <div className="w-5 h-5 text-center font-bold">{"10"}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-5 h-5 bg-[#081342] text-white text-center font-bold p-[0.125rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProductUpdates;
