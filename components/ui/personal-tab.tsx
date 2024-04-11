"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const PersonalTab = (props: any) => {
  const router = useRouter();
  const [listTabs, setListTabs] = useState([
    {
      name: "My Account",
      key: "my-account",
      path: "my-account",
    },
    {
      name: "Company Information",
      key: "company-information",
      path: "company-information",
    },
    {
      name: "Plans",
      key: "plans",
      path: "plans",
    },
    {
      name: "Following",
      key: "following",
      path: "following",
    },
    {
      name: "Company Verification",
      key: "company-verification",
      path: "company-verification",
    },
  ]);
  const [tabActive, setTabActive] = useState("");
  const changeTab = (tab: string) => {
    router.push(tab);
  };
  useEffect(() => {
    const path = window.location.pathname.replace("/", "");
    setTabActive(path);
  }, [router]);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {listTabs.map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/5">
            <div className="p-1">
              <div
                key={item.key}
                className={`text-2xl font-bold py-4 uppercase cursor-pointer transitions text-center ${
                  tabActive !== item.path
                    ? "text-[#939AA1]"
                    : "border-b-2 border-primary"
                }`}
                onClick={() => changeTab(item.path)}
              >
                {item.name}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious src="/arrowleft.png" />
      <CarouselNext src="/arrowright.png" />
    </Carousel>
    // <div className="flex gap-[48px]">
    //   {
    //     listTabs.map((item: any) => (
    //       <div key={item.key} className={`text-2xl font-bold py-4 px-8 uppercase cursor-pointer transitions ${tabActive !== item.path ? 'text-[#939AA1]' : 'border-b-2 border-primary'}`} onClick={() => changeTab(item.path)}>
    //         {item.name}
    //       </div>
    //     ))
    //   }
    // </div>
  );
};
export default PersonalTab;
