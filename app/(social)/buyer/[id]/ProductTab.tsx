import { getRequest } from '@/hook/api';
import Image from 'next/image';
import React from 'react'
import LoadMore from './LoadMoreProduct';

const ProductTab = async ({ id }: any) => {
    let products = [];
    let total_product;
    try {
        let pro_ = (
            await getRequest("/product/list-for-buyer?buyer_code=" + id + "&page=1&limit=2")
        );
        products = pro_?.data;
        total_product = pro_?.total_record;
    } catch (error) { }
    return (
        <div className="flex flex-col gap-4 col-span-2 ">
            <p className="text-3xl font-bold">Products</p>

            {products.map((pd: any) => (
                <div
                    key={pd.code}
                    className="flex justify-between items-center pb-4 border-b border-gray-400"
                >
                    <div className="w-full flex flex-col md:flex-row gap-5">
                        <Image
                            src={pd.avatar}
                            alt="buyer"
                            width={320}
                            height={320}
                            className="w-80 h-80 object-cover"
                        />
                        <div className="flex flex-col gap-3">
                            <p className="font-bold text-2xl break-all line-clamp-2">
                                {pd.name}
                            </p>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                <p className="lg:col-span-1 text-lg text-[#8C8585]">
                                    Sourcing Countries
                                </p>
                                <p className="md:col-span-2 text-lg text-[#404040]">
                                    {pd.origin_country?.name}
                                </p>
                                <p className="lg:col-span-1 text-lg text-[#8C8585]">Packaging Type</p>
                                <p className="md:col-span-2 text-lg text-[#404040]">
                                    {pd.summary["VARIETY"]}
                                </p>
                            </div>
                            {/* <div>
                        <Button>Contacts Now</Button>
                      </div> */}
                        </div>
                    </div>
                </div>
            ))}
            <LoadMore id={id} length={products.length} total={total_product} />
        </div>
    )
}

export default ProductTab