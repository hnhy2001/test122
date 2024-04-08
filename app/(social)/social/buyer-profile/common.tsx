'use client'
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Overview from "./overview";
import Posts from "./posts";
import ProductTab from "./products-tabs";
import CertificateTab from "./certificate-tab";

const Common = ({user}:any) => {
  const [type, setType] = useState('')
  const [listType, setListType] = useState([
    {
      name: "Overview",
      type: "overview",
    },
    {
      name: "Product",
      type: "product",
    }
  ]);
  const getParams = (params: string) => {
    setType(params)
  }
  const searchParams = useSearchParams();
  const router = useRouter()
  useEffect(() => {
    const params = searchParams.get("type") ?? ''
    if (params) {
      getParams(params);
    } else {
      router.push(`?type=overview`);
    }
  }, [searchParams, type]);
  const renderContent = () => {
    switch (type) {
      case "overview":
        return <Overview />
      case "product":
        return <ProductTab />
      default:
        return <Overview />;
    }
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-[#FBE7C6] p-8 text-xl border border-[#E0A23E] flex flex-col gap-4">
        <div>
          Become a verified supplier to publish your basic profile on{" "}
          <a href="#" className="underline">
            Social Marketplace
          </a>{" "}
          and gain full access to Social Marketplace features: submit quotes,
          participate in the social feed, and exchange messages with verified
          buyers and suppliers worldwide.{" "}
          <a href="#" className="underline">
            Learn More
          </a>
        </div>
        <ul className="list-disc pl-14">
          <li>
            Upload your{" "}
            <a href="#" className="underline">
              business documents
            </a>{" "}
            or sign in with a Tridge-verified work email.
          </li>
          <li>
            Add your{" "}
            <a href="#" className="underline">
              product(s).
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="w-full border border-dashed py-8 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-base gap-2">
          <Image src="/camera.png" width={22} height={17} alt="" />
          <div className="cursor-pointer hover:underline">
            Add thumbnail image for your profile
          </div>
        </div>
      </div> */}
      <div className="flex items-center gap-8">
        <Image src={user?.avatar} alt="" width={245} height={245} />
        <div>
          <div className="text-4xl text-primary font-bold">{user?.last_name}</div>
          <div className="flex gap-4 flex-col md:flex-row text-[#8C8585]">
            <p className="text-3xl underline">8 Follower</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex text-xl font-bold gap-3">
          {listType.map((item: any) => (
            <Link
              key={item.type}
              className={`p-2  ${
                !type || type == item.type ? "border-b-4 border-primary" : ""
              }`}
              href={"?type=" + item.type}
            >
              {item.name}
            </Link>
          ))}
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
export default Common;