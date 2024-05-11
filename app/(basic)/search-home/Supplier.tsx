import LoadMore from "@/components/LoadMore";
import { getRequest } from "@/hook/api";
import { IProduct } from "@/type/product.interface";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductItem from "@/app/(social)/product/ProductItem";
import LoadMoreProduct from "./LoadmoreProduct";
import SupplierItem from "@/app/(social)/supplier/SupplierItem";
import { ISupplier } from "@/type/supplier.interface";
import LoadmoreSupplier from "./LoadmoreSupplier";

export const metadata: Metadata = {
    title: "Supplier",
    description: "Product",
};

const Supplier = async (props: any) => {
    const keyword = props?.keyword || "";
    const category = props?.category || "";
    const countries = props?.countries;

    const [supplierData] = await Promise.all([
        getRequest(
            "/supplier/list?limit=" +
            6 +
            "&keyword=" +
            keyword +
            "&category_code=" +
            category +
            "&level=1"
        ),
    ]);
    const suppliers: ISupplier[] = supplierData?.basic_supplier || [];
    return (
        <div >
            <p className="text-3xl font-bold pb-3 text-[#081440]">Suppliers</p>
            <p className="py-3 text-[#081342]">
                {supplierData?.total_record + " Results"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {suppliers.map((pd: any, index: any) => {
                    const country = countries.find(
                        (country: any) => country.code == pd.origin_country?.code
                    );
                    return (
                        <SupplierItem key={index} pd={pd} country={country} />
                    );
                })}
            </div>
            <div className="flex justify-center text-[#081342] py-20">
                <LoadmoreSupplier countries={countries} keyword={keyword} category={category} length={suppliers.length} total={supplierData?.total_record} />
            </div>
        </div>
    );
};

export default Supplier;
