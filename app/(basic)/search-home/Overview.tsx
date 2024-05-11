import BuyerItem from '@/app/(social)/buyer/BuyerItem';
import ProductItem from '@/app/(social)/product/ProductItem';
import RFQItem from '@/app/(social)/rfq/RFQItem';
import SupplierItem from '@/app/(social)/supplier/SupplierItem';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import React from 'react'

const Overview = ({ data, countries, user }: any) => {
    const { products, basic_supplier, insights, rfqs, buyers } = data;

    return (
        <div className='flex flex-col gap-28'>
            {products?.length > 0 && (
                <div>
                    <div className="flex justify-between pb-8 items-center">
                        <p className="font-bold text-3xl">Products</p>
                        <TabsList className="p-0 bg-transparent">
                            <TabsTrigger value="product" className="bg-transparent text-blue-900 font-medium">View all</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="grid md:grid-cols-6 gap-10">
                        {products
                            ?.slice(0, 6)
                            .map((pd: any, index: any) => {
                                const country = countries.find(
                                    (country: any) => country.code == pd.country?.name
                                );
                                return (
                                    <ProductItem pd={pd} country={country} key={index} />
                                );
                            })}
                    </div>
                </div>
            )}
            {basic_supplier?.length > 0 && (
                <div>
                    <div className="flex justify-between pb-8 items-center">
                        <p className="font-bold text-3xl">Suppliers</p>
                        <TabsList className="p-0 bg-transparent">
                            <TabsTrigger value="supplier" className="bg-transparent text-blue-900 font-medium">View all</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="grid md:grid-cols-6 gap-10">
                        {basic_supplier.slice(0, 6).map((pd: any, index: any) => {
                            const country = countries.find(
                                (country: any) => country.code == pd.supplier_country.code
                            );
                            return (
                                <SupplierItem key={index} pd={pd} country={country} />
                            );
                        })}
                    </div>
                </div>
            )}
            {insights?.length > 0 && (
                <div>
                    <div className="flex justify-between pb-8 items-center">
                        <p className="font-bold text-3xl">Insights</p>
                        <TabsList className="p-0 bg-transparent">
                            <TabsTrigger value="insight" className="bg-transparent text-blue-900 font-medium">View all</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="grid md:grid-cols-4 gap-10">
                        {insights.slice(0, 6).map((pd: any, index: any) => {
                            return (
                                <Link
                                    target="_blank"
                                    href={pd.title_slug}
                                    className="flex flex-col gap-4 cursor-pointer p-4 shadow-sm rounded-lg"
                                    key={pd.title_slug}
                                >
                                    <div>
                                        {/* <Badge>{pd.category.name}</Badge> */}
                                    </div>
                                    <p className="font-bold text-xl line-clamp-2">
                                        {pd.title}
                                    </p>
                                    <p>{pd.post_date}</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
            {rfqs?.length > 0 && (
                <div>
                    <div className="flex justify-between pb-8 items-center">
                        <p className="font-bold text-3xl">Rfqs</p>
                        <TabsList className="p-0 bg-transparent">
                            <TabsTrigger value="rfq" className="bg-transparent text-blue-900 font-medium">View all</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                        {rfqs
                            ?.slice(0, 6)
                            .map((pd: any, index: any) => {
                                return (
                                    <RFQItem dt={pd} user={user} key={index} />
                                );
                            })}
                    </div>
                </div>
            )}
            {buyers.data?.length > 0 && (
                <div>
                    <div className="flex justify-between pb-8 items-center">
                        <p className="font-bold text-3xl">Buyer</p>
                        <TabsList className="p-0 bg-transparent">
                            <TabsTrigger value="buyer" className="bg-transparent text-blue-900 font-medium">View all</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="grid md:grid-cols-4 gap-10">
                        {buyers?.data
                            ?.slice(0, 6)
                            .map((pd: any, index: any) => {
                                const country = countries.find(
                                    (country: any) => country.code == pd.country?.name
                                );
                                return (
                                    <BuyerItem pd={pd} country={country} key={index} />
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Overview