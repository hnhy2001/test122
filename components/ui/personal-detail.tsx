"use client";
import { Separator } from "@/components/ui/separator";
import { Button } from "./button";
import Image from "next/image";
import { IUserProfile } from "@/type/user-profile.interface";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./card";
import { Avatar } from "./avatar";
import { Skeleton } from "./skeleton";
import {
  getRequest,
  postRequest,
  postRequestWithFormData,
} from "@/hook/apiClient";
import { useToast } from "./use-toast";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Loader2 } from "lucide-react";
import SwitchRole from "../SwitchRole";

const PersonalDetail = () => {
  const [info, setInfo] = useState<any>();
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [listSocial, setListSocial] = useState([
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
  ]);
  const getInfoUser = () => {
    getRequest("/user/profile").then((res: any) => {
      if (res.code == 200) {
        setInfo(res.data);
      }
    });
  };

  const switchRole = () => {
    const payload = { role: "" };
    setBtnLoading(true);
    if (info.role && info.role == "SELLER") {
      payload.role = "BUYER";
    } else {
      payload.role = "SELLER";
    }
    postRequest("/user/switch-role", payload).then((data: any) => {
      if (data.code == 200) {
        setBtnLoading(false);
        return setInfo(data.data);
      }
    });
  };

  const handleUploadAvatar = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    postRequestWithFormData("/user/upload", formData)
      .then((res: any) => {
        if (res.code == 200) {
          toast({
            title: "Success",
            description: "Change Avatar Successfully",
          });
          getInfoUser();
        } else {
          toast({
            title: "Fail",
            description: "Somethings went wrong",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Fail",
          description: "Somethings went wrong",
        });
      });
  };
  useEffect(() => {
    getInfoUser();
  }, []);
  if (!info) {
    return (
      <div className="flex items-center space-x-4 w-1/4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-2 px-8">
        <div className="flex flex-col items-center">
          <span className="text-4xl leading-[48px] font-[900] text-[#081342]">
            Personal details
          </span>

          <div className="relative">
            <Avatar
              style={{ width: "188.06px", height: "188.06px" }}
              className="border-primary border-4"
            >
              <Image
                src={info.avatar}
                alt="avatar"
                width={188}
                height={188}
              ></Image>
            </Avatar>
            <button
              className="rounded-full w-40px h-40px flex justify-center items-center border-[3px] border-primary absolute right-[3px] bottom-[12px] bg-white cursor-pointer"
              onClick={() => uploadFileRef?.current?.click()}
            >
              <Image
                src={"/images/plan/pen.svg"}
                alt=""
                width={25}
                height={25}
              ></Image>
            </button>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={uploadFileRef}
              onChange={(event: any) => handleUploadAvatar(event)}
            />
          </div>
          <span className="text-4xl leading-[60px] font-bold whitespace-nowrap text-[#081342]">
            {info.first_name + " " + info.last_name}
          </span>

          <span className="text-xl">{info.email}</span>
        </div>

        <Separator className="!w-full bg-[#081342]" />

        <div className="flex flex-col items-center gap-1">
          <span className="font-bold text-2xl leading-9 text-[#081342]">Role Setting</span>
          <span className="text-sm">You are using Tridge as a</span>
          <div className="flex w-64 justify-between items-center">
            <SwitchRole user={info}/>
          </div>
          <span className="text-sm">Your current plan is</span>
          <span className="font-bold text-2xl leading-9">{}</span>
        </div>

        <Separator className="!w-full bg-[#081342]" />

        <div className="flex flex-col gap-2 items-center w-full">
          <span className="font-bold text-2xl leading-9 text-[#081342]">Linked Accounts</span>
          {listSocial.map((item, index) => (
            <Card key={item.src} className="!w-full xl:!w-[280px]">
              <CardContent className="flex items-center justify-between p-3 !w-full xl:w-[280px]">
                <div className="flex gap-[8px] items-center w-full">
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
                    className="text-base !px-[28px]"
                    variant="destructive"
                  >
                    Unlink
                  </Button>
                ) : (
                  <Button className="text-base !px-[28px]">Link</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
};

export default PersonalDetail;
