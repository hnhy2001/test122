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
  return (
    <div className="container text-primary">
      <PersonalTab key="plans"></PersonalTab>
      <div className="flex flex-col lg:flex-row gap-10">
        <PersonalDetail />
        <div className="px-20 py-2.5">
          <div>
            <div className="text-primary text-3xl font-bold">Current Plan</div>
            <div className="pt-[32px] flex flex-col gap-4">
              <div className="text-black text-3xl font-bold">Basic plan</div>
              <div className="text-2xl text-black text-justify">
                You have only basic access to content, data, and features on
                Tridge.com at the moment. Upgrade your plan to get more benefits
                from Tridge.
              </div>
              {/* <div className="text-end">
                <Button className="text-base !px-[28px]">Upgrade Plan</Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
