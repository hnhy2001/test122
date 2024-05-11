import { getRequest } from "@/hook/api";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Overview from "./Overview";
import Product from "./Product";
import Supplier from "./Supplier";
import Rfq from "./Rfq";
import Buyer from "./Buyer";

export const metadata: Metadata = {
  title: "Search Home",
}


const Search = async (props: any) => {
  const session = await getServerSession(options);
  const user = session?.user;
  const category_post = props.searchParams?.category || "";
  const keyword_post = props.searchParams?.keyword || "";
  const data = await getRequest(
    keyword_post != ""
      ? "/home/search-by-keyword?keyword=" + keyword_post
      : "/home/search-by-category?category_code=" + category_post
  );
  const [countryData] = await Promise.all([getRequest("/config/countries")]);
  const countries: any[] = countryData?.data;
  return (
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-4 flex flex-col gap-10 py-8">
        <p className="font-bold text-3xl">
          Search Home "{keyword_post != "" ? keyword_post : category_post}"
        </p>
        <Tabs defaultValue={'overview'} className="w-full">
          <TabsList className="flex gap-3 md:gap-10 flex-wrap justify-start w-full mb-6 p-0 bg-transparent">
            <TabsTrigger value="overview" className="bg-transparent font-bold md:text-2xl data-[state=inactive]:text-gray-500 data-[state=active]:underline data-[state=active]:shadow-none p-0">Overview</TabsTrigger>
            <TabsTrigger value="product" className="bg-transparent font-bold md:text-2xl data-[state=inactive]:text-gray-500 data-[state=active]:underline data-[state=active]:shadow-none p-0">Products</TabsTrigger>
            <TabsTrigger value="supplier" className="bg-transparent font-bold md:text-2xl data-[state=inactive]:text-gray-500 data-[state=active]:underline data-[state=active]:shadow-none p-0">Suppliers</TabsTrigger>
            <TabsTrigger value="insight" className="bg-transparent font-bold md:text-2xl data-[state=inactive]:text-gray-500 data-[state=active]:underline data-[state=active]:shadow-none p-0">Insights</TabsTrigger>
            <TabsTrigger value="rfq" className="bg-transparent font-bold md:text-2xl data-[state=inactive]:text-gray-500 data-[state=active]:underline data-[state=active]:shadow-none p-0">Rfqs</TabsTrigger>
            <TabsTrigger value="buyer" className="bg-transparent font-bold md:text-2xl data-[state=inactive]:text-gray-500 data-[state=active]:underline data-[state=active]:shadow-none p-0">Buyers</TabsTrigger>

          </TabsList>
          <TabsContent value="overview">
            <Overview data={data} countries={countries} />
          </TabsContent>
          <TabsContent value="product">
            <Product countries={countries} keyword={keyword_post} category={category_post} />
          </TabsContent>
          <TabsContent value="supplier">
            <Supplier countries={countries} keyword={keyword_post} category={category_post} />
          </TabsContent>
          <TabsContent value="insight">

          </TabsContent>
          <TabsContent value="rfq">
            <Rfq user={user} keyword={keyword_post} category={category_post} />
          </TabsContent>
          <TabsContent value="buyer">
            <Buyer countries={countries} keyword={keyword_post} category={category_post} />
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
