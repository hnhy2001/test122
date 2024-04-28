import Image from "next/image";
import Link from "next/link";
import React from "react";

const Product = ({ pd }: any) => {
  return (
    <Link
      href={"/product/" + pd.name.split(" ").join("-") + "-i." + pd.code}
      className="flex justify-between items-center pb-4 border-b border-gray-400"
    >
      <div className="w-full flex gap-5">
        <Image
          src={pd.avatar}
          alt="buyer"
          width={320}
          height={320}
          className="w-80 h-80 object-cover"
        />
        <div className="flex flex-col gap-3">
          <p className="font-bold underline text-2xl line-clamp-2">{pd.name}</p>
          <div className="grid grid-cols-3 gap-4 w-full">
            <p className="col-span-1 text-lg text-[#8C8585]">
              Sourcing Countries
            </p>
            <p className="col-span-2 text-lg text-[#404040]">
              {pd.origin_country?.name}
            </p>
            <p className="col-span-1 text-lg text-[#8C8585]">Packaging Type</p>
            <p className="col-span-2 text-lg text-[#404040]">
              {pd.summary["VARIETY"]}
            </p>
          </div>
          {/* <div>
          <Button>Contacts Now</Button>
        </div> */}
        </div>
      </div>
    </Link>
  );
};

export default Product;
