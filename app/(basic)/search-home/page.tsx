import { getRequest } from "@/hook/api";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductItem from "@/app/(social)/product/ProductItem";
import SupplierItem from "@/app/(social)/supplier/SupplierItem";
import { Badge } from "@/components/ui/badge";

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
  const { suggest_product_list, basic_supplier, suggest_insight } = data;
  return (
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-4 flex flex-col gap-10 py-8">
        <p className="font-bold text-3xl">
          Search Home "{keyword_post != "" ? keyword_post : category_post}"
        </p>
        <Tabs defaultValue="product" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-10">
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="supplier">Suppliers</TabsTrigger>
            <TabsTrigger value="insight">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            {suggest_product_list?.length > 0 && (
              <div>
                <div className="flex justify-between pb-8 items-center">
                  <p className="font-bold text-3xl">Products</p>
                  <Link
                    href={
                      "/product?category=" +
                      category_post +
                      "&keyword=" +
                      keyword_post
                    }
                  >
                    Xem thêm
                  </Link>
                </div>
                <div className="grid md:grid-cols-4 gap-10">
                  {suggest_product_list
                    ?.slice(0, 6)
                    .map((pd: any, index: any) => {
                      const country = countries.find(
                        (country) => country.code == pd.country?.name
                      );
                      return (
                        <ProductItem pd={pd} country={country} key={index} />
                      );
                    })}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="supplier">
            {basic_supplier?.length > 0 && (
              <div>
                <div className="flex justify-between pb-8 items-center">
                  <p className="font-bold text-3xl">Suppliers</p>
                  <Link
                    href={
                      "/supplier?category=" +
                      category_post +
                      "&keyword=" +
                      keyword_post
                    }
                  >
                    Xem thêm
                  </Link>
                </div>
                <div className="grid md:grid-cols-4 gap-10">
                  {basic_supplier.slice(0, 6).map((pd: any, index: any) => {
                    const country = countries.find(
                      (country) => country.code == pd.supplier_country.code
                    );
                    return (
                      <SupplierItem key={index} pd={pd} country={country} />
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="insight">
            {suggest_insight?.length > 0 && (
              <div>
                <div className="flex justify-between pb-8 items-center">
                  <p className="font-bold text-3xl">Suppliers</p>
                  <Link
                    href={
                      "/supplier?category=" +
                      category_post +
                      "&keyword=" +
                      keyword_post
                    }
                  >
                    Xem thêm
                  </Link>
                </div>
                <div className="grid md:grid-cols-4 gap-10">
                  {suggest_insight.slice(0, 6).map((pd: any, index: any) => {
                    return (
                      <Link
                        target="_blank"
                        href={pd.title_slug}
                        className="flex flex-col gap-4 cursor-pointer p-4 shadow-lg rounded-lg"
                        key={pd.title_slug}
                      >
                        <div>
                          {/* <Badge>{pd.category.name}</Badge> */}
                        </div>
                        <p className="font-bold text-xl line-clamp-2">
                          {pd.title}
                        </p>
                        <p>{pd.post_date}</p>
                        {/* <p className="text-xl line-clamp-2">{pd.content}</p>
                        <div className="flex justify-between pt-5">
                          <p>{pd.author}</p>
                        </div> */}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
