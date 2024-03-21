import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PersonalDetail from "@/components/ui/personal-detail";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea";
import PersonalTab from "@/components/ui/personal-tab";

export const metadata: Metadata = {
  title: "My Account",
  description: "My Account",
};

const CompanyInformation = () => {
  return (
    <div className="container">
      <PersonalTab key="company-information"></PersonalTab>
      <div className="flex gap-8 py-8">
        {/* Personal Detail */}
        <PersonalDetail />

        {/* Company Logo */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <span className="text-3xl leading-[48px] font-[900]">
              Company Logo
            </span>
            <span className="text-sm">
              Upload your company logo. This will be the default image of your
              account.
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-20 h-20 bg-slate-500"></div>
            <Button>Upload Image</Button>
          </div>
          <span className="font-bold text-[32px] text-[#081342]">Country of residence</span>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Company Name</span>
            <Select>
              <SelectTrigger className="border-[1px] border-black">
                <SelectValue placeholder="laodiha" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Việt Nam</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="">If you wish to update your company name, please let us know. <strong className="underline">Contact us</strong></span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Business Type</span>
            <Select>
              <SelectTrigger className="border-[1px] border-black">
                <SelectValue placeholder="-Select business type-" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Việt Nam</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="">Non-food manufacturing</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Country</span>
            <Select>
              <SelectTrigger className="border-[1px] border-black">
                <SelectValue placeholder="Company Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Việt Nam</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Year Established</span>
            <Select>
              <SelectTrigger className="border-[1px] border-black">
                <SelectValue placeholder="Việt Nam" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Việt Nam</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Number of Employees</span>
            <Select>
              <SelectTrigger className="border-[1px] border-black">
                <SelectValue placeholder="Việt Nam" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Việt Nam</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Annual Sales Revenue</span>
            <Select>
              <SelectTrigger className="border-[1px] border-black">
                <SelectValue placeholder="Việt Nam" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Việt Nam</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Business Registration Number</span>
            <Select>
              <SelectTrigger className="border-[1px] border-black">
                <SelectValue placeholder="Việt Nam" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Việt Nam</SelectLabel>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Owns Warehouse</span>
            <RadioGroup defaultValue="yes" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r1" />
                <Label htmlFor="r1">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r2" />
                <Label htmlFor="r2">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Phone Number</span>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="border-[1px] border-black w-40">
                  <SelectValue placeholder="VN: +84" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>VN: +84</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Enter office phone number"
                className="border-black border-[1px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Business Registration Number</span>
            <Input
              type="text"
              placeholder="Enter Old password"
              className=" border-black border-[1px]"
              value={'Enter business registration number'}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Office Address</span>
            <Textarea className="border-black border-[1px]" placeholder="Provide the address of your main office" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Company Description</span>
            <Textarea className="border-black border-[1px]" placeholder="Briefly describe your company" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Company Website</span>
            <Input
              type="text"
              placeholder="Enter company website URL"
              className=" border-black border-[1px]"
              value={'Enter business registration number'}
            />
          </div>
          <div className="flex flex-col gap-2">
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="r1" />
                  <Label htmlFor="r1">My company has no website.</Label>
                </div>
              </RadioGroup>
            </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Your Position</span>
            <Input
              type="text"
              placeholder="Enter company website URL"
              className=" border-black border-[1px]"
              value={'Enter the name of your position in the company'}
            />
          </div>
        </div>

        {/* Members */}
        <div className="flex flex-col w-full">
          <span className="text-3xl leading-[48px] font-[900]">Members</span>
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
                Invite fellow members from your company. Once an invitation has
                been sent out, you cannot cancel it.
              </span>
              <Button className="w-40 h-12 text-lg font-bold">+ Invite</Button>
            </div>

            <div className="flex flex-col px-2 border-l-[1px] border-black">
              <span className="text-sm font-semibold">Total available member limit 2</span>
              <span className="text-sm italic">Upgrade your account to have more members in your workspace.</span>
            </div>
            <span className="text-xg underline font-semibold">Contact sales</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
