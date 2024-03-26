import { Checkbox } from "@/components/ui/checkbox";
import PersonalDetail from "@/components/ui/personal-detail";
import PersonalTab from "@/components/ui/personal-tab";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React from "react";
import FormSchema from "./FormSchema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form",
  description: "Form",
};

const Form = () => {
  
  return (
    <div className="container">
      <PersonalTab key="my-account"></PersonalTab>
      <div className="flex gap-8 py-8">
        {/* Personal details */}
        <PersonalDetail />

        {/* Account Information */}
        <FormSchema />

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

export default Form;
