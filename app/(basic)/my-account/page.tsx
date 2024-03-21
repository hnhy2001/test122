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

export const metadata: Metadata = {
  title: "My Account",
  description: "My Account",
};

const MyAccount = async () => {
  const userProfile : IUserProfile = await getRequest("/auth/user-profile")
  return (
    <div className="container">
      <PersonalTab key="my-account"></PersonalTab>
      <div className="flex gap-8 py-8">
        {/* Personal details */}
        <PersonalDetail />

        {/* Account Information */}
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-4">
            <span className="text-3xl leading-[48px] font-[900]">
              Account Information
            </span>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-lg ">First Name</span>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="border-black border"
                  value={userProfile.first_name}
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <span className="font-bold text-lg ">Last Name</span>
                <Input
                  type="text"
                  placeholder="Last Name"
                  className="border-black border"
                  value={userProfile.last_name}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg ">Email Address</span>
              <Input
                type="email"
                placeholder="Email Address"
                className=" border-black border"
                value={userProfile.email}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg ">Phone Number</span>
              <div className="flex gap-4">
                <Select>
                  <SelectTrigger className="border border-black w-40">
                    <SelectValue placeholder="VN: +84" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>VN: {userProfile.country.code}</SelectLabel>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Enter office phone number"
                  className="border-black border"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg ">Country of residence</span>
              <Select>
                <SelectTrigger className="border border-black">
                  <SelectValue placeholder={userProfile.country.name} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Việt Nam</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-3xl leading-[48px] font-bold text-lg ">
              Password Change
            </span>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg ">Old password</span>
              <Input
                type="text"
                placeholder="Enter Old password"
                className=" border-black border"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg ">New Password</span>
              <Input
                type="text"
                placeholder="Enter New Password"
                className=" border-black border"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg ">Confirm New Password</span>
              <Input
                type="text"
                placeholder="Enter Confirm New Password"
                className=" border-black border"
              />
            </div>
            <div className="flex justify-end">
              <Button className="px-7 py-2">Save</Button>
            </div>
          </div>
        </div>

        {/* Notification */}
        <div className="flex flex-col gap-4 w-full">
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
