import { options } from "@/app/api/auth/[...nextauth]/options";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getRequest } from "@/hook/api";
import { ISocial } from "@/type/social.interface";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import PostSocial from "./PostSocial";
import { IProduct } from "@/type/product.interface";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SocialMarketplaceSearch from "./Search";
import SearchBar from "@/components/Search";
import CreatePost from "./CreatePost";
import CategoryItems from "@/components/CategoryItems";
import SwitchRole from "@/components/SwitchRole";
import UserProfile from "./UserProfile";

export const metadata: Metadata = {
  title: "Social",
  description: "Social",
};

const Social = async (props: any) => {
  const keyword = props?.searchParams?.keyword || " ";
  const keyword_post = props?.searchParams?.keyword_post || " ";
  const category = props?.searchParams?.category || " ";
  const category_post = props?.searchParams?.category_post || " ";
  const session = await getServerSession(options);
  const user = session?.user;
  const [socialData, productData, countryData] = await Promise.all([
    getRequest(
      "/post/list?category=" + category_post + "&keyword=" + keyword_post
    ),
    getRequest(
      "/product/list?limit=6" +
        "&keyword=" +
        keyword +
        "&category_code=" +
        category +
        "&level=1"
    ),
    getRequest("/config/countries"),
  ]);
  const social: ISocial[] = socialData.data;
  const product: IProduct[] = productData.data;
  const countries: any[] = countryData.data;
  return (
    <div className="bg-[#f8f4fc]">
      <div className="container">
        <div className="pt-16">
          <SocialMarketplaceSearch />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 relative">
          {user ? (
            <UserProfile user={user} />
          ) : (
            <div className="hidden md:flex flex-col gap-3 sticky h-16 py-8 top-0">
              <div className="flex flex-col justify-center items-center gap-3">
                <p className="font-medium">
                  Sign in or join Tridge to fully utilize our Social
                  Marketplace.
                </p>
                <Button className="w-full">
                  <Link href={"/api/auth/signin"}>Sign in</Link>
                </Button>
                <p className="font-medium">
                  Inform suppliers about your requirements by creating an RFQ.
                </p>
                <Button variant={"outline"} className="w-full">
                  <Link href={"/api/auth/signin"}>Create RFQ</Link>
                </Button>
              </div>
            </div>
          )}
          <div className="col-span-2 flex flex-col gap-4 py-8">
            <CreatePost user={user} />
            {social.map((dt) => (
              <PostSocial dt={dt} key={dt.code} user={user} />
            ))}
          </div>
          <div className="hidden md:flex col-span-2 sticky h-screen flex-col top-8 mt-8 right-0 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <p className="text-2xl text-[#081440] font-bold">
                Browse Products
              </p>
              <Link href={"/product"} className="text-[#081440] text-xl">
                View all
              </Link>
            </div>
            <div className="pt-4">
              <SearchBar
                placeholder="Search products in food and agriculture"
                category_number="2"
              />
              <CategoryItems />
            </div>
            <div className="flex-1 overflow-auto">
              <div className="grid grid-cols-2 gap-6">
                {product.map((pd) => {
                  const country = countries.find(
                    (country) => country.code == pd.origin_country?.code
                  );
                  return (
                    <Link
                      target="_blank"
                      href={
                        "/product/" +
                        pd.name.split(" ").join("-") +
                        "-*" +
                        pd.code
                      }
                      className="flex flex-col gap-1"
                      key={pd.code}
                    >
                      <Image
                        src={pd.avatar}
                        alt={pd.name}
                        width={266}
                        height={266}
                        className="aspect-square w-full object-cover"
                      />
                      <p className="font-bold text-[#081440]">{pd.name}</p>
                      <p className="font-bold text-xs text-[#939AA1]">
                        Variety: {pd.summary?.VARIETY}
                      </p>
                      <div className="flex gap-2 items-center">
                        <Image
                          src={country?.image}
                          alt="flag"
                          width={21}
                          height={18}
                          className="w-6 h-5"
                        />
                        <p className="font-bold text-xs">{country?.name}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-blue-600"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
