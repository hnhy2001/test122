import { Separator } from "@/components/ui/separator";
import { Button } from "./button";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PersonalDetail",
  description: "PersonalDetail",
};

const PersonalDetail = () => {
  return (
    <div className="flex flex-col items-center gap-2 px-8">
      <div className="flex flex-col items-center">
        <span className="text-3xl leading-[48px] font-[900]">
          Personal details
        </span>

        <Image src="/avatar.png" alt="avatar" width={188} height={188}></Image>

        <span className="text-5xl leading-[72px] font-bold">Tom Invi</span>

        <span className="text-xl leading-[36px]">tomnguyen3006@gmail.com</span>
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

      <div className="flex flex-col gap-1 items-center">
        <span className="font-bold text-2xl leading-9">Linked Accounts</span>
        <div className="w-80 h-12 border-[1px] border-black flex justify-between items-center px-2">
          <Image
            src="/social-icons.png"
            alt="social-icon"
            width={36}
            height={36}
          ></Image>
          <Button className="!h-7">Link</Button>
        </div>

        <div className="w-80 h-12 border-[1px] border-black flex justify-between items-center px-2">
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

        <div className="w-80 h-12 border-[1px] border-black flex justify-between items-center px-2">
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
