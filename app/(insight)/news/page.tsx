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
  title: "News Insight",
  description: "News Insight",
};
const News = () => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row justify-between pt-[4.3125rem]">
        <div>
          <p className="text-[2rem] font-bold text-[#081440]">News</p>
          <p className="text-[#081440] font-normal">
            The latest agricultural news, including updates on policy, business,
            technology, and more
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
        <CommandInput placeholder="Search For news" />
        <CommandList></CommandList>
      </Command>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[1.6875rem] gap-y-[3.125rem]">
        {Array.from({ length: 12 }).map((value, index) => (
          <Link key={index} href={"#"} target="_blank">
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
        ))}
      </div>
      <div className="py-[4.625rem] flex justify-end gap-1 text-[#081342] font-bold">
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
  );
};

export default News;
