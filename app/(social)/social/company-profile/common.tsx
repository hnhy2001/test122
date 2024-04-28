"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Overview from "./overview";
import Posts from "./posts";
import ProductTab from "./products-tabs";
import CertificateTab from "./certificate-tab";

const Common = ({ user }: any) => {
  const [type, setType] = useState("");
  const [certifications, setCertifications] = useState<any>([]);
  const [listType, setListType] = useState([
    {
      name: "Overview",
      type: "overview",
    },
    {
      name: "Posts",
      type: "posts",
    },
    {
      name: "Product",
      type: "product",
    },
    {
      name: "Certification",
      type: "certification",
    },
  ]);
  const getParams = (params: string) => {
    setType(params);
  };
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const params = searchParams.get("type") ?? "";
    if (params) {
      getParams(params);
    } else {
      router.push(`?type=overview`);
    }
  }, [searchParams, type, router]);
  const renderContent = () => {
    switch (type) {
      case "overview":
        return <Overview ce={certifications} setCertifications={setCertifications} />;
      case "posts":
        return <Posts />;
      case "product":
        return <ProductTab />;
      case "certification":
        return <CertificateTab certifications={certifications} setCertifications={setCertifications} />;
      default:
        return <Overview ce={certifications} setCertifications={setCertifications} />;
    }
  };
  return (
    <div className="flex flex-col gap-8">
      {/* <div className="bg-[#FBE7C6] p-8 text-xl border border-[#E0A23E] flex flex-col gap-4">
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
      </div> */}
      {/* <div className="w-full border border-dashed py-8 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-base gap-2">
          <Image src="/camera.png" width={22} height={17} alt="" />
          <div className="cursor-pointer hover:underline">
            Add thumbnail image for your profile
          </div>
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row md:items-center gap-8 container">
        <Image
          src={user?.company?.logo_seller}
          alt={user?.last_name}
          width={245}
          height={245}
          className="w-60 h-60 cursor-pointer"
        />
        <div>
          <div className="text-4xl text-primary font-bold">
            {user?.company.name}
          </div>
          <div className="flex gap-4 flex-col md:flex-row text-[#8C8585]">
            <p className="text-3xl underline">
              {user?.followers?.length} Follower
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-wrap text-xl font-bold border-b border-gray-400">
        <div className="container flex gap-10">
          {listType.map((item: any) => (
            <Link
              key={item.type}
              className={`p-2 ${!type || type == item.type ? "border-b-2 border-primary" : ""
                }`}
              href={"?type=" + item.type}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      {renderContent()}
    </div>
  );
};
export default Common;
