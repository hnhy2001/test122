import { getRequest } from '@/hook/api';
import React from 'react'
import LoadMore from './LoadMore';
import ProductItem from "./ProductItem";

const ProductTab = async ({ user, id }: any) => {
    let products = [];
    let total_product;
    try {
        let p_ = await getRequest(
            "/product/list?supplier_code=" + id + "&page=1&limit=2"
        );
        products = p_?.data;
        total_product = p_?.total_record;
    } catch (error) { }
    return (
        <div className="flex flex-col gap-4 col-span-2 ">
            <p className="text-3xl font-bold">Products</p>
            <div className="flex flex-col gap-3">
                {products.map((pd: any) => (
                    <ProductItem pd={pd} key={pd.code} />
                ))}
                <LoadMore
                    id={id}
                    length={products.length}
                    total={total_product}
                />
            </div>
        </div>
    )
}

export default ProductTab