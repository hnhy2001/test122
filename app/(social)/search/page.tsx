import { getRequest } from "@/hook/api";
import React from "react";
import PostSocial from "../social/PostSocial";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductItem from "../product/ProductItem";
import BuyerItem from "../buyer/BuyerItem";
import SupplierItem from "../supplier/SupplierItem";
import RFQItem from "../rfq/RFQItem";
import UserProfile from "../social/UserProfile";

const Search = async (props: any) => {
  const session = await getServerSession(options);
  const user = session?.user;
  const category_post = props.searchParams?.category || "";
  const keyword_post = props.searchParams?.keyword || "";
  const data = await getRequest(
    "/social/search?type=ALL&category_code=" +
    category_post +
    "&keyword=" +
    keyword_post
  );
  const [countryData] = await Promise.all([getRequest("/config/countries")]);
  const countries: any[] = countryData?.data;
  const { post, product, buyer, supplier, rfq } = data;
  return (
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-16 relative">
      {user ? (
        <UserProfile user={user} />
      ) : (
        <div className="flex-col gap-3 sticky h-64 p-4 rounded-lg shadow-sm bg-white top-8 mt-8 hidden md:flex">
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-medium">
              Sign in or join Tridge to fully utilize our Social Marketplace.
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
      <div className="col-span-3 flex flex-col gap-10 py-8">
        <p className="font-bold text-3xl">Search Social</p>
        {post.length > 0 && (
          <div>
            <div className="flex justify-between pb-8 items-center">
              <p className="font-bold text-3xl">Posts</p>
              <Link
                className="text-blue-900 font-medium"
                href={
                  "/social?category_post=" +
                  category_post +
                  "&keyword_post=" +
                  keyword_post
                }
              >
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-3 md:px-20">
              {post.slice(0, 2).map((p: any) => (
                <PostSocial key={p.code} dt={p} user={user} />
              ))}
            </div>
          </div>
        )}
        {
          product.length > 0 && <div>
            <div className="flex justify-between pb-8 items-center">
              <p className="font-bold text-3xl">Products</p>
              <Link
                className="text-blue-900 font-medium"
                href={
                  "/product?category=" +
                  category_post +
                  "&keyword=" +
                  keyword_post
                }
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-10">
              {product.slice(0, 6).map((pd: any, index: any) => {
                const country = countries.find(
                  (country) => country.code == pd.origin_country?.code
                );
                return <ProductItem key={index} pd={pd} country={country} />;
              })}
            </div>
          </div>
        }
        {buyer?.data?.length > 0 && (
          <div>
            <div className="flex justify-between pb-8 items-center">
              <p className="font-bold text-3xl">Buyers</p>
              <Link
                className="text-blue-900 font-medium"
                href={
                  "/buyer?category=" +
                  category_post +
                  "&keyword=" +
                  keyword_post
                }
              >
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {buyer?.data?.slice(0, 6).map((pd: any, index: any) => {
                const country = countries.find(
                  (country) => country.code == pd.country.name
                );
                return <BuyerItem pd={pd} country={country} key={index} />;
              })}
            </div>
          </div>
        )}
        {supplier?.basic_supplier?.length > 0 && (
          <div>
            <div className="flex justify-between pb-8 items-center">
              <p className="font-bold text-3xl">Suppliers</p>
              <Link
                className="text-blue-900 font-medium"
                href={
                  "/supplier?category=" +
                  category_post +
                  "&keyword=" +
                  keyword_post
                }
              >
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {supplier?.basic_supplier
                .slice(0, 6)
                .map((pd: any, index: any) => {
                  const country = countries.find(
                    (country) => country.code == pd.supplier_country.code
                  );
                  return <SupplierItem key={index} pd={pd} country={country} />;
                })}
            </div>
          </div>
        )}
        {rfq?.length > 0 && (
          <div>
            <div className="flex justify-between pb-8 items-center">
              <p className="font-bold text-3xl">RFQs</p>
              <Link
                className="text-blue-900 font-medium"
                href={
                  "/rfq?category=" + category_post + "&keyword=" + keyword_post
                }
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-10">
              {rfq.slice(0, 2).map((dt: any, index: any) => (
                <RFQItem dt={dt} key={index} user={user} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
