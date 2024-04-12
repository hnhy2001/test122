import LoadMore from "@/components/LoadMore";
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
  title: "Retailer Trend Insight",
  description: "Retailer Trend Insight",
};
const RetailerTrend = () => {
  return (
    <div>
      <div className="relative">
        <Image
          src={
            "https://cdn-new.tridge.com/assets/XO5FGPVF.png"
          }
          alt="Jeollanamdo"
          width={1500}
          height={500}
          className="w-full aspect-[3] object-cover"
        />
        <div className="absolute md:scale-100 flex flex-col gap-4 top-8 left-1/2 transform -translate-x-1/2 w-4/5 md:w-1/2 lg:w-1/3 text-white text-center">
          <p className="font-semibold md:text-xl">Retail Trend</p>
          <p className="font-semibold md:text-5xl">
            Build a better retail straegy with Retailer Trends
          </p>
          <p className="font-semibold hidden md:block md:text-xl">
            Our extensive research and analysis of shelf trends of key retails
            worldwide
          </p>
        </div>
      </div>
      <div className="container">
        <div className="flex justify-between py-[4.3125rem]">
          <div></div>
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
        <div className="grid md:grid-cols-3 gap-[3.75rem]">
          {Array.from({ length: 9 }).map((value, index) => (
            <Link key={index} href={"#"} target="_blank">
              <Image
                src={
                  "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/785ba328-1dae-4c4c-9694-5bcc16587cc3.jpg?v=1686137364653"
                }
                alt="khaoi tay"
                width={160}
                height={100}
                className="w-full aspect-[1.6] object-cover pb-[1.1875rem]"
              />
              <div className="flex flex-col">
                <div className="text-base flex gap-[0.625rem] items-center">
                  <span className="font-bold text-[#4A4A4A] ">Retailer Trends</span>{" "}
                  <div className="text-white bg-[#2C2FF2] px-3 py-1 text-[0.625rem] font-bold">
                    Premium
                  </div>
                </div>
                <p className="font-bold text-xl pt-[0.625rem] pb-[0.8125rem]">
                  Peru: Non-traditional agricultural exports increased by 16.9%
                  in January 2024
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
          ))}
        </div>
        <div className="py-[4.625rem] flex justify-center gap-1 text-[#081342] font-bold">
          <LoadMore />
        </div>
      </div>
    </div>
  );
};

export default RetailerTrend;
