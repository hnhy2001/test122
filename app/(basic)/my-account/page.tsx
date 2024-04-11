import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import PersonalDetail from "@/components/ui/personal-detail";
import PersonalTab from "@/components/ui/personal-tab";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getRequest } from "@/hook/api";
import { IUserProfile } from "@/type/user-profile.interface";
import { Metadata } from "next";
import Image from "next/image";
import React, { use } from "react";
import FormSchema from "./FormSchema";

// export const metadata: Metadata = {
//   title: "My Account",
//   description: "My Account",
// };

const MyAccount = () => {
  // const userProfile: IUserProfile = await getRequest("/auth/user-profile")
  // console.log(userProfile)


  return (
    <div className="container">
      <PersonalTab key="my-account"></PersonalTab>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10 py-4">
        {/* Personal details */}
        <PersonalDetail />

        {/* Account Information */}
        <div className="flex flex-col gap-8 w-full col-span-2">
          <FormSchema />
        </div>

        {/* Notification */}
        <div className="flex flex-col gap-4 w-full col-span-2">
          <span className="text-3xl leading-[48px] font-[900]">
            Notification
          </span>

          <div className="flex justify-between w-full">
            <span className="font-bold text-lg ">Allow Email Notification</span>
            <Switch />
          </div>

          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Transactional Emails
              </span>
              <span className="text-sm">
                Receive transactional emails related to your activities on
                Tridge.
              </span>
            </div>
            <Checkbox />
          </div>

          <Separator className="w-3/4 bg-[#081342]" />

          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Reminder Emails </span>
              <span className="text-sm">
                Receive reminder emails related to things that need your
                attention on Tridge.
              </span>
            </div>
            <Checkbox />
          </div>

          <Separator className="w-3/4 bg-[#081342]" />

          <div className="flex justify-between w-full">
            <span className="font-bold text-lg ">Newsletter</span>
          </div>

          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Tridge Daily Market Digest
              </span>
              <span className="text-sm">
                Receive customized digest emails with media contents curated by
                your following product preferences.
              </span>
            </div>
            <Checkbox />
          </div>

          <Separator className="w-3/4 bg-[#081342]" />

          <div className="flex justify-between items-center gap-8">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Reminder Emails </span>
              <span className="text-sm">
                Receive updates based on your activity on our website, and the
                latest announcements about our products and services.
              </span>
            </div>
            <Checkbox />
          </div>

          <Separator className="w-3/4 bg-[#081342]" />

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
