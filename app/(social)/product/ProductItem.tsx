import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductItem = ({ pd, country }:any) => {
  return (
    <Link
      href={"/product/" + pd.name.split(" ").join("-") + "-*" + pd.code}
      className="flex flex-col gap-2 shadow-lg rounded-lg p-4"
      key={pd.code}
    >
      <Image
        src={pd.avatar}
        alt={pd.name}
        width={266}
        height={266}
        className="aspect-video w-full object-cover"
      />
      <p className="font-bold text-[#081440] line-clamp-1">{pd.name}</p>
      <p className="font-bold text-xs text-[#939AA1] line-clamp-2 min-h-[2rem]">
        {Object.keys(pd.summary)
          .map((key: any) => `${key}: ${pd.summary[key]}`)
          .join(", ")}
      </p>
      <div className="flex gap-2 items-center">
        <Image
          src={country?.image}
          alt="flag"
          width={21}
          height={18}
          className="w-6 h-5"
        />
        <p className="font-bold text-xs">{country?.name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-blue-600"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
};

export default ProductItem;
