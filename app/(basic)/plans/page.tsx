import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import PersonalTab from "@/components/ui/personal-tab";
import PersonalDetail from "@/components/ui/personal-detail";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IUserProfile } from "@/type/user-profile.interface";
import { getRequest } from "@/hook/api";

export const metadata: Metadata = {
  title: "Plans",
  robots: {
    index: false,
    follow: true,
  },
}

const Page = async () => {
  const session = await getServerSession(options);
  const user: IUserProfile = session?.user;
  const userProfile: IUserProfile = user ? await getRequest("/auth/user-profile") : null
  return (
    <div className="container text-primary">
      <PersonalTab key="plans"></PersonalTab>
      <div className="flex">
        <PersonalDetail info={userProfile} />
        <div className="px-[72px] py-[16px]">
          <div>
            <div className="text-primary text-3xl font-bold">Current Plan</div>
            <div className="pt-[32px] flex flex-col gap-[16px]">
              <div className="text-black text-3xl">Basic plan</div>
              <div className="text-[24px] text-black text-justify">
                You have only basic access to content, data, and features on
                Tridge.com at the moment. Upgrade your plan to get more benefits
                from Tridge.
              </div>
              <div className="text-end">
                <Button className="text-base !px-[28px]">Upgrade Plan</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
