"use client";
import { useEffect, useState } from "react";
import AddProduct from "./add-product";
import Image from "next/image";
import ProductItem from "./ProductItem";
import { getRequest } from "@/hook/apiClient";
import { getSession } from "next-auth/react";
import Loading from "@/components/Loading";
import LoadMoreProduct from "./LoadMoreProduct";

const ProductTab = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>();
  const [reload, setReload] = useState(true)

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const user = session?.user;
      setUser(user);
      setLoading(true);
      getRequest(
        "/product/list?supplier_code=" +
          user?.code +
          // "&user_role=" +
          // user?.role +
          "&page=1&limit=2"
      )
        .then((data: any) => setData(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    })();
  }, [reload]);
  if (loading) return <Loading />;
  return (
    <div className="py-8 grid md:grid-cols-2 gap-12 relative container">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-primary">Products</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 col-span-2">
            <div className="text-xs text-[#8C8585]">
              List out all the products that your business has to offer. This
              will help your potential buyers know what they could expect of
              your business.
            </div>
            {/* <div className="text-lg text-[#8C8585]">
              There is no product to be shown yet.
            </div> */}
          </div>
          <div className="flex justify-end items-end">
            <AddProduct />
          </div>
        </div>
        <div>
          {data?.data.map((item: any, index: any) => (
            <ProductItem item={item} key={index} setReload={setReload}/>
          ))}
        </div>
        {data?.data && (
          <LoadMoreProduct
            id={user?.code}
            length={data?.data.length}
            total={data?.total}
          />
        )}
      </div>
    </div>
  );
};
export default ProductTab;
