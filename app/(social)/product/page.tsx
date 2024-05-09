import CategoryItems from "@/components/CategoryItems";
import LoadMore from "@/components/LoadMore";
import SearchBar from "@/components/Search";
import { Button } from "@/components/ui/button";
import { getRequest } from "@/hook/api";
import { IProduct } from "@/type/product.interface";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductItem from "./ProductItem";
import Category from "@/components/Category";

export const metadata: Metadata = {
  title: "Product",
  description: "Product",
};

const Product = async (props: any) => {
  const page = +props?.searchParams?.page || 1;
  const keyword = props?.searchParams?.keyword || " ";
  const category = props?.searchParams?.category || " ";
  const supplier_code = props?.searchParams?.supplier_code || " ";
  const limit = 6 * page;
  const [productData, countryData] = await Promise.all([
    getRequest(
      "/product/list?limit=" +
      limit +
      "&keyword=" +
      keyword +
      "&category_code=" +
      category +
      "&supplier_code=" + supplier_code +
      "&level=1"
    ),
    getRequest("/config/countries"),
  ]);
  const products: IProduct[] = productData?.data;
  const countries: any[] = countryData?.data;
  return (
    <div className="container">
      <div className="relative">
        <Image
          src={"/banner2.png"}
          alt="Jeollanamdo"
          width={1683}
          height={547}
          className="w-full h-52 object-cover"
        />
        {/* <div className="absolute flex flex-col gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 text-white text-center">
          <p className="font-bold text-2xl">Jeollanamdo</p>
          <p>We delivery nature, health, and the taste of Korea </p>
          <div>
            <Button className="text-[#081440]" variant={"outline"}>
              View details
            </Button>
          </div>
        </div> */}
      </div>
      <p className="text-3xl font-bold py-7 text-[#081440]">Products</p>
      <div>
        <SearchBar placeholder="Search products" category_number="10" />
        <Category />
      </div>
      <p className="py-3 text-[#081342]">
        {productData?.total_record + " Results"}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {products.map((pd: any, index: any) => {
          const country = countries.find(
            (country) => country.code == pd.origin_country?.code
          );
          return (
            <ProductItem key={index} pd={pd} country={country} />

          );
        })}
      </div>
      <div className="flex justify-center text-[#081342] py-20">
        {products.length < productData?.total_record && (
          <Link scroll={false} href={"/product?page=" + (+page + 1) + "&category=" + category + "&keyword=" + keyword}>
            <LoadMore />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Product;
