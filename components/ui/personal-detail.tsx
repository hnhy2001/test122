'use client'
import { Separator } from "@/components/ui/separator";
import { Button } from "./button";
import Image from "next/image";
import { IUserProfile } from "@/type/user-profile.interface";
import { getRequest } from "@/hook/api";
import { useState } from "react";
import { Card, CardContent } from "./card";

const PersonalDetail = async () => {
  const [listSocial, setListSocial] = useState([
    {
      src: "linkedIn.svg",
      isLink: false,
      content: "",
    },
    {
      src: "google.svg",
      isLink: true,
      content: "Minion Tuan",
    },
    {
      src: "facebook.svg",
      isLink: false,
      content: "",
    },
  ])
  const userProfile : IUserProfile = await getRequest("/auth/user-profile")
  return (
    <div className="flex flex-col items-center gap-2 px-8">
      <div className="flex flex-col items-center">
        <span className="text-3xl leading-[48px] font-[900]">
          Personal details
        </span>

        <Image src="/avatar.png" alt="avatar" width={188} height={188}></Image>

        <span className="text-5xl leading-[72px] font-bold">
          {userProfile.last_name}
        </span>

        <span className="text-xl leading-[36px]">{userProfile.email}</span>
      </div>

      <Separator className="!w-[250px] bg-[#081342]" />

      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-2xl leading-9">Role Setting</span>
        <span className="text-sm">You are using Tridge as a</span>
        <div className="flex w-64 justify-between items-center">
          <Button className="!px-7 !py-2">Suplier</Button>
          <Image
            src="/connection.png"
            alt="connection"
            width={24}
            height={24}
          ></Image>
          <span className="text-sm">Switch role</span>
        </div>
        <span className="text-sm">Your current plan is</span>
        <span className="font-bold text-2xl leading-9">Basic Plan</span>
      </div>

      <Separator className="!w-[250px] bg-[#081342]" />

      <div className="flex flex-col gap-2 items-center">
        <span className="font-bold text-2xl leading-9">Linked Accounts</span>
        {listSocial.map((item, index) => (
          <Card key={item.src} className="w-full">
            <CardContent className="flex items-center justify-between p-3 w-full">
              <div className="flex gap-[8px] items-center">
                <Image
                  src={"/images/plan/" + item.src}
                  alt=""
                  width={38}
                  height={38}
                ></Image>
                <div>{item.content}</div>
              </div>
              {item.isLink ? (
                <Button
                  className="text-base !px-[28px]"
                  variant="destructive"
                >
                  Unlink
                </Button>
              ) : (
                <Button className="text-base !px-[28px]">Link</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonalDetail;
