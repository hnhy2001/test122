"use client";
import { Button } from "@/components/ui/button";
import PersonalDetail from "@/components/ui/personal-detail";
import Image from "next/image";
import React, { useState } from "react";
import PersonalTab from "@/components/ui/personal-tab";
import FormSchema from "./FormSchema";
import Loading from "@/components/Loading";

const Data = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <div className={`container ${isLoading?'hidden':'block'}`}>
        <PersonalTab key="company-information"></PersonalTab>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-y-10 xl:gap-10 py-6">
          {/* Personal Detail */}
          <PersonalDetail />

          {/* Company Logo */}
          <FormSchema loading={setIsLoading} className="col-span-2"/>

          {/* Members */}
          <div className="flex flex-col w-full col-span-2">
            <span className="text-4xl leading-[48px] font-[900] text-[#081342]">Members</span>
            <div className="flex flex-col gap-4">
              <span className="text-lg font-bold">Joined (1)</span>

              <div className="flex gap-4 items-center">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  width={60}
                  height={60}
                ></Image>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Tom invi</span>
                  <span className="text-lg">tomnguyen3006@gmail.com (You)</span>
                </div>
              </div>

              <span className="text-lg font-bold">Invited (0)</span>
              <div className="flex justify-between gap-8 items-center">
                <span className="text-sm">
                  Invite fellow members from your company. Once an invitation
                  has been sent out, you cannot cancel it.
                </span>
                <Button className="w-40 h-12 text-lg font-bold">
                  + Invite
                </Button>
              </div>

              <div className="flex flex-col px-2 border-l-[1px] border-black">
                <span className="text-sm font-semibold">
                  Total available member limit 2
                </span>
                <span className="text-sm italic">
                  Upgrade your account to have more members in your workspace.
                </span>
              </div>
              <span className="text-xg underline font-semibold">
                Contact sales
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
