import LoadMore from "@/components/LoadMore";
import { getRequest } from "@/hook/api";
import { IProduct } from "@/type/product.interface";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductItem from "@/app/(social)/product/ProductItem";
import LoadMoreProduct from "./LoadmoreProduct";

export const metadata: Metadata = {
    title: "Product",
    description: "Product",
};

const Product = async (props: any) => {
    const keyword = props?.keyword || "";
    const category = props?.category || "";
    const countries = props?.countries;

    const [productData] = await Promise.all([
        getRequest(
            "/product/list?limit=" +
            6 +
            "&keyword=" +
            keyword +
            "&category_code=" +
            category +
            "&level=3"
        ),
    ]);
    const products: IProduct[] = productData?.data;
    console.log(productData)
    return (
        <div >
            <p className="text-3xl font-bold pb-3 text-[#081440]">Products</p>
            <p className="py-3 text-[#081342]">
                {productData?.total_record + " Results"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {products.map((pd: any, index: any) => {
                    const country = countries.find(
                        (country: any) => country.code == pd.origin_country?.code
                    );
                    return (
                        <ProductItem key={index} pd={pd} country={country} />
                    );
                })}
            </div>
            <div className="flex justify-center text-[#081342] py-20">
                <LoadMoreProduct countries={countries} keyword={keyword} category={category} length={products.length} total={productData?.total_record} />
            </div>
        </div>
    );
};

export default Product;
