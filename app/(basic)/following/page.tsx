import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import PersonalTab from "@/components/ui/personal-tab";
import PersonalDetail from "@/components/ui/personal-detail";
import ManageFollowing from "./manage-following";

export const metadata: Metadata = {
  title: "Following",
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
  ];
  // const changeLinkSocial = (index: any, status: boolean) => {
  //   const listUpdate = [...listSocial]
  //   listSocial[index].isLink = status;
  //   setListSocial(listUpdate);
  // };
  return (
    <div className="container text-primary">
      <PersonalTab key="following"></PersonalTab>
      <div className="flex flex-col lg:flex-row gap-10">
        <PersonalDetail />

        <div className="pl-[72px] py-2.5">
          <div className="text-black font-bold text-3xl">
            My followings for Insights
          </div>
          <div className="pt-[4px] flex flex-row gap-[16px]">
            <div className="text-[24px] leading-[36px] w-600 text-justify">
              Your following products will be reflected in our newsletters
              recommendations. They will also indirectly influence the latest
              news and trending opinions shown on the home main screen.
            </div>
            <div className="flex flex-col justify-center items-center gap-[8px]">
              <div className=" text-end ">
                <ManageFollowing/>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-start text-[16px] leading-[36px] gap-2">
            <div>
              <Card className="w-full">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/plan/image meat.svg"}
                      alt=""
                      width={38}
                      height={38}
                    />
                    <div>Fresh Whole Beef</div>
                    <Image
                      src={"/images/plan/close.svg"}
                      alt=""
                      width={21}
                      height={21}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="w-full">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/plan/image meat.svg"}
                      alt=""
                      width={38}
                      height={38}
                    />
                    <div>Fresh Whole Beef</div>
                    <Image
                      src={"/images/plan/close.svg"}
                      alt=""
                      width={21}
                      height={21}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="w-full">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/plan/image meat.svg"}
                      alt=""
                      width={38}
                      height={38}
                    />
                    <div>Fresh Whole Beef</div>
                    <Image
                      src={"/images/plan/close.svg"}
                      alt=""
                      width={21}
                      height={21}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="w-full">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/plan/image meat.svg"}
                      alt=""
                      width={38}
                      height={38}
                    />
                    <div>Fresh Whole Beef</div>
                    <Image
                      src={"/images/plan/close.svg"}
                      alt=""
                      width={21}
                      height={21}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
