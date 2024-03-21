import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import PersonalTab from "@/components/ui/personal-tab";

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
        <div className="flex flex-col justify-center items-center gap-[8px] py-[16px] px-[32px]">
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <div className="text-primary text-[32px] font-bold leading-[36px]">
              Personal details
            </div>
            <div className="relative">
              <Avatar
                style={{ width: "188.06px", height: "188.06px" }}
                className="border-primary border-4"
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <div className="rounded-full w-40px h-40px flex justify-center items-center border-[3px] border-primary absolute right-[3px] bottom-[12px] bg-white cursor-pointer">
                <Image
                  src={"/images/plan/pen.svg"}
                  alt=""
                  width={25}
                  height={25}
                ></Image>
              </div>
            </div>
            <div className="text-primary text-[48px] font-bold leading-11">
              Tom Invi
            </div>
            <div className="text-[24px] leading-[36px]">
              tomnguyen3006@gmail.com
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="text-[24px] leading-[36px]">Laodiha</div>
              <Badge className="!rounded-sm !bg-primary">Unverified</Badge>
            </div>
          </div>
          <div className="w-4/5 h-[2px] bg-primary"></div>
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <div className="text-[24px] leading-[36px] font-bold">
              Role Setting
            </div>
            <div className="text-[16px] leading-[24px]">
              You are using Tridge as a
            </div>
            <div className="flex items-center gap-[8px]">
              <Badge className="!rounded-sm !bg-primary text-[20px] !px-[28px]">
                Suplier
              </Badge>
              <div className="text-[16px] flex items-center gap-[4px] cursor-pointer hover:text-blue-900 transition">
                <Image
                  src={"/images/plan/switch.svg"}
                  alt=""
                  width={21}
                  height={21}
                ></Image>
                <div>Switch role</div>
              </div>
            </div>
            <div className="text-[16px] leading-[24px]">
              Your current plan is
            </div>
            <div className="text-[24px] leading-[36px] font-medium">
              Basic Plan
            </div>
          </div>
          <div className="w-4/5 h-[2px] bg-primary"></div>
          <div className="flex flex-col justify-center items-center gap-[8px] w-full">
            <div className="text-[24px] leading-[36px] font-bold">
              Linked Accounts
            </div>
            <div className="w-full gap-[16px] flex flex-col">
              {listSocial.map((item, index) => (
                <Card key={item.src} className="w-full">
                  <CardContent className="flex items-center justify-between p-3 w-full">
                    <div className="flex gap-[8px] items-center">
                      <Image
                        src={"/images/plan/" + item.src}
                        alt=""
                        width={38}
                        height={38}
                      ></Image>
                      <div>{item.content}</div>
                    </div>
                    {item.isLink ? (
                      <Button
                        className="text-[16px] !px-[28px]"
                        variant="destructive"
                      >
                        Unlink
                      </Button>
                    ) : (
                      <Button
                        className="text-[16px] !px-[28px]"
                      >
                        Link
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[72px] py-[16px]">
          <div>
            <div className="text-primary text-[32px] font-bold leading-[36px]">
              Current Plan
            </div>
            <div className="pt-[32px] flex flex-col gap-[16px]">
              <div className="text-black text-[32px] leading-11">
                Basic plan
              </div>
              <div className="text-[24px] leading-[36px] text-black text-justify">
                You have only basic access to content, data, and features on
                Tridge.com at the moment. Upgrade your plan to get more
                benefits from Tridge.
              </div>
              <div className="text-end">
                <Button className="text-[16px] !px-[28px]">
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
