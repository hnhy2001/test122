import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import PersonalTab from "@/components/ui/personal-tab";

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
      <div className="flex">
        <div className="flex flex-col justify-center items-center gap-[8px] py-[16px] px-[32px]">
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <div className="text-primary text-[32px] font-bold leading-[36px]">
              Personal details
            </div>
            <div>
              <Avatar
                style={{ width: "188.06px", height: "188.06px" }}
                className="border-primary border-4"
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
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

        <div className="pl-[72px] py-[16px]">
          <div className="text-primary text-[32px] font-bold leading-[36px]">
            My followings for Insights
          </div>
          <div className="pt-[4px] flex flex-row gap-[16px]">
            <div className="text-[24px] leading-[36px] w-600 text-justify">
              Your following products will be reflected in our newsletters recommendations.
              They will also indirectly influence the latest news and trending opinions shown on the home main
              screen.
            </div>
            <div className="flex flex-col justify-center items-center gap-[8px]">
              <div className=" text-end ">
                <Button className="text-[16px] !px-[28px]">
                  <Image
                    src={"/images/plan/management.svg"}
                    alt=""
                    width={21}
                    height={21}
                    className="px-[4px]"
                  ></Image>
                  Manage following
                </Button>
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
