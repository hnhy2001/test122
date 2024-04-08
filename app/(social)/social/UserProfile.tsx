"use client";
import SwitchRole from "@/components/SwitchRole";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const UserProfile = ({ user }: any) => {
  const [isBuyer, setIsBuyer] = useState(user.role == "BUYER");
  return (
    <div className="flex-col gap-3 sticky h-80 px-4 justify-center rounded-lg shadow-lg bg-white top-8 mt-8 hidden md:flex">
      <Link
        href={
          isBuyer
            ? "/social/buyer-profile"
            : "/social/company-profile?type=overview"
        }
        className="text-[#081440] font-bold text-xl"
      >
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
            {/* <svg
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
                  </div> */}
          </div>
          <p className="text-[#8C8585]"> {user.last_name}</p>
        </div>
      </div>
      <SwitchRole user={user} isBuyer={isBuyer} setIsBuyer={setIsBuyer} />
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
  );
};

export default UserProfile;
