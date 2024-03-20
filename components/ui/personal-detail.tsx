import { Separator } from "@/components/ui/separator";
import { Button } from "./button";
import Image from "next/image";
import { Metadata } from "next";
import { IUserProfile } from "@/type/user-profile.interface";
import { getRequest } from "@/hook/api";

export const metadata: Metadata = {
  title: "PersonalDetail",
  description: "PersonalDetail",
};

const PersonalDetail = async () => {
  const userProfile : IUserProfile = await getRequest("/auth/user-profile")
  return (
    <div className="flex flex-col items-center gap-2 px-8">
      <div className="flex flex-col items-center">
        <span className="text-3xl leading-[48px] font-[900]">
          Personal details
        </span>

        <Image src="/avatar.png" alt="avatar" width={188} height={188}></Image>

        <span className="text-5xl leading-[72px] font-bold">{userProfile.last_name}</span>

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
        <div className="w-80 h-12 border border-gray-500 rounded-lg flex justify-between items-center px-2">
          <Image
            src="/social-icons.png"
            alt="social-icon"
            width={36}
            height={36}
          ></Image>
          <Button className="!h-7">Link</Button>
        </div>

        <div className="w-80 h-12 border  border-gray-500 rounded-lg flex justify-between items-center px-2">
          <div className="flex gap-2 items-center">
            <Image
              src="/social-icons-g.png"
              alt="social-icon"
              width={36}
              height={36}
            ></Image>
            <span className="text-sm">Minion Tuan</span>
          </div>
          <Button className="!h-7 bg-[#DE0D1B]">Unlink</Button>
        </div>

        <div className="w-80 h-12 border border-gray-500 rounded-lg flex justify-between items-center px-2">
          <Image
            src="/social-icon-f.png"
            alt="social-icon"
            width={36}
            height={36}
          ></Image>
          <Button className="!h-7">Link</Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetail;
