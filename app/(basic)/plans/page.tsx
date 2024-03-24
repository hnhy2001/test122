import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import PersonalTab from "@/components/ui/personal-tab";
import PersonalDetail from "@/components/ui/personal-detail";

export const metadata: Metadata = {
  title: "Plans",
  robots: {
    index: false,
    follow: true,
  },
}

const Page = () => {
  const listSocial = [
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
  ]
  // const changeLinkSocial = (index: any, status: boolean) => {
  //   const listUpdate = [...listSocial]
  //   listSocial[index].isLink = status;
  //   setListSocial(listUpdate);
  // };
  return (
    <div className="container text-primary">
      <PersonalTab key="plans"></PersonalTab>
      <div className="flex">
        <PersonalDetail/>
        <div className="px-[72px] py-[16px]">
          <div>
            <div className="text-primary text-3xl font-bold">
              Current Plan
            </div>
            <div className="pt-[32px] flex flex-col gap-[16px]">
              <div className="text-black text-3xl">
                Basic plan
              </div>
              <div className="text-[24px] text-black text-justify">
                You have only basic access to content, data, and features on
                Tridge.com at the moment. Upgrade your plan to get more
                benefits from Tridge.
              </div>
              <div className="text-end">
                <Button className="text-base !px-[28px]">
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
