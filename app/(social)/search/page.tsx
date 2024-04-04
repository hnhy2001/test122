import { getRequest } from "@/hook/api";
import React from "react";
import PostSocial from "../social/PostSocial";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Search = async (props: any) => {
  const session = await getServerSession(options);
  const user = session?.user;
  const category_post = props.searchParams?.category || "";
  const keyword_post = props.searchParams?.keyword || "";
  const data = await getRequest(
    "/social/search?type=ALL&&category_code=" +
      category_post +
      "&keyword=" +
      keyword_post
  );
  const { post, product, buyer, supplier, rfq } = data;
  console.log(data);
  return (
    <div className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-16 relative">
      {user ? (
        <div className="flex-col gap-3 sticky h-16 py-8 top-0 hidden md:flex">
          <Link href="/social/company-profile" className="text-[#8C8585]">
            Company profile
          </Link>
          <div className="flex gap-2 items-center">
            <Image
              src={user.avatar}
              unoptimized
              alt={user.last_name}
              width={64}
              height={64}
              className="p-1 h-16 w-16 rounded-md object-cover"
            />
            <div className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center">
                <div>
                  <p className="text-xl font-bold text-[#081342]">
                    {user.company.name}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-[#081342]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
                <div>
                  <p className="text-sm text-[#081342]">Switch role</p>
                </div>
              </div>
              <p className="text-[#8C8585]">Supplier · {user.last_name}</p>
            </div>
          </div>
          <div className="flex gap-2 underline text-[#8C8585]">
            <p>0 Follower</p>
            <p>0 Following</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#8C8585]">
              Inform suppliers about your requirements by creating an RFQ.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-11 h-11"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
          <Button>Create RFQ</Button>
        </div>
      ) : (
        <div className="hidden md:flex flex-col gap-3 sticky h-16 py-8 top-0">
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-medium">
              Sign in or join Tridge to fully utilize our Social Marketplace.
            </p>
            <Button className="w-full">
              <Link href={"/api/auth/signin"}>Sign in</Link>
            </Button>
            <p className="font-medium">
              Inform suppliers about your requirements by creating an RFQ.
            </p>
            <Button variant={"outline"} className="w-full">
              <Link href={"/api/auth/signin"}>Create RFQ</Link>
            </Button>
          </div>
        </div>
      )}
      <div className="col-span-2">
        <div className="flex justify-between pb-8 items-center">
          <p className="font-bold text-3xl">Posts</p>
          <Link
            href={
              "/social?category_post=" +
              category_post +
              "&keyword_post=" +
              keyword_post
            }
          >
            Xem thêm
          </Link>
        </div>
        <div className="">
          {post.slice(0, 2).map((p: any) => (
            <PostSocial key={p.code} dt={p} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
