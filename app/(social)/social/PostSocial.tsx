import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { enAU, vi } from "date-fns/locale";
import Image from "next/image";
import React from "react";
import Comment from "./Comment";
import Action from "./Action";
import SendMessenger from "./SendMessenger";
import ListImage, {
  RenderImageVdieo,
  isVideoUrl,
} from "@/components/ListImage";
import Link from "next/link";
import Common from "./Common";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ButtonShare from "./ButtonShare";
import ButtonDelete from "./ButtonDelete";

const PostSocial = ({ dt, user }: { dt: any; user: any }) => {
  console.log(dt)
  return (
    <div className="pb-6 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Link
            href={
              "/" + dt.user_role == "BUYER"
                ? dt.user_role.toLocaleLowerCase()
                : "supplier" + "/" + dt.user_name + "*" + dt.user_code
            }
            className="flex gap-4"
          >
            <Image
              src={dt.company_logo}
              unoptimized
              alt="Logo"
              width={45}
              height={45}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold text-[#081342] flex gap-1 items-center">
                {dt.company_name}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-blue-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
              <div className="flex gap-1">
                <Image
                  unoptimized
                  src={dt.user_avatar}
                  alt="Logo"
                  width={15}
                  height={15}
                  className="h-[15px] w-[15px] rounded-full object-cover"
                />
                <p className="text-xs">{dt.user_name}</p>
                <p className="text-xs text-[#8C8585]">
                  {formatDistanceToNow(new Date(dt.created_at), {
                    addSuffix: true,
                    locale: enAU
                  })}
                </p>
              </div>
            </div>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <ButtonShare dt={dt} user={user} />
              </DropdownMenuItem>
              {
                user?.code == dt?.user_code &&
                <DropdownMenuItem>
                  <ButtonDelete dt={dt}/>
                </DropdownMenuItem>
              }
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <p className="text-lg font-semibold">{dt.content}</p>
        <Common dt={dt} user={user} />
      </div>
    </div>
  );
};

export default PostSocial;
