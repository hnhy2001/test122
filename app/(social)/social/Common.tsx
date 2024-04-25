"use client";
import ListImage, {
  RenderImageVdieo,
  isVideoUrl,
} from "@/components/ListImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { enAU, vi } from "date-fns/locale";
import Image from "next/image";
import React, { useState } from "react";
import Action from "./Action";
import SendMessenger from "./SendMessenger";
import Comment from "./Comment";
import { postRequest } from "@/hook/apiClient";

const Common = ({ dt, user }: any) => {
  const [like, setLike] = useState(dt?.like);
  const [isLike, setIsLike] = useState(
    Array.isArray(dt?.liked_user) ? dt?.liked_user?.includes(user?.code) : false
  );
  const [comment, setComment] = useState(dt?.comment_list);
  const [view, setViews] = useState(dt?.view);
  const handleClick = () => {
    if (user) {
      postRequest("/post/update", {
        code: dt.code,
        view: 1,
        user_role: user.role,
      }).then(() => {
        setViews((prev: any) => prev + 1);
      });
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <Dialog>
        <DialogTrigger asChild onClick={handleClick}>
          <div className="cursor-pointer">
            <ListImage images={dt.galleries} />
          </div>
        </DialogTrigger>
        <DialogContent className="!max-w-[80%] md:!max-w-[60%] h-[70vh] p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh] py-3 pl-10 pr-10 md:pr-0">
            <div className="flex flex-col gap-1">
              <Carousel className="h-full">
                <CarouselContent className="h-full">
                  {dt.galleries.map((data: any, index: any) => (
                    <CarouselItem
                      key={index}
                      className="h-full w-full flex items-center"
                    >
                      <RenderImageVdieo
                        key={index}
                        url={data}
                        isVideo={isVideoUrl(data)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious src="/left.png" />
                <CarouselNext src="/right.png" />
              </Carousel>
            </div>
            <div className="flex flex-col gap-1 min-h-full">
              <div className="flex flex-col gap-3 overflow-auto h-full md:px-10 flex-1 py-4 md:py-0">
                <div className="flex justify-between w-full">
                  <div className="flex gap-4">
                    <Image
                      src={dt.company_logo}
                      alt="Logo"
                      width={45}
                      height={45}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-bold text-[#081342] flex gap-1 items-center">
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
                          src={dt.user_avatar}
                          alt="Logo"
                          width={16}
                          height={16}
                          className="h-4 w-4 rounded-full object-cover"
                        />
                        <p className="text-xs">{dt.user_name}</p>
                        <p className="text-xs text-[#8C8585]">
                          {formatDistanceToNow(new Date(dt.created_at), {
                            addSuffix: true,
                            locale: enAU,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
                <p>{dt.content}</p>
                <Action
                  action={dt}
                  user={user}
                  isLike={isLike}
                  setIsLike={setIsLike}
                  numLike={like}
                  setNumLike={setLike}
                  comment={comment}
                  view={view}
                />
                <div className="flex flex-col gap-5">
                  {comment?.map((comment: any, index: any) => (
                    <div className="flex justify-between" key={index}>
                      <div className="flex gap-4">
                        <Image
                          src={comment.user.avatar}
                          alt="Logo"
                          width={45}
                          height={45}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-bold text-[#081342] flex gap-1 items-center">
                            {comment.user.last_name}{" "}
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
                            <p className="text-xs text-[#8C8585]">
                              {formatDistanceToNow(
                                new Date(comment.created_at),
                                { addSuffix: true, locale: enAU }
                              )}
                            </p>
                          </p>
                          <div className="flex gap-1">{comment?.content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:px-10">
                <SendMessenger
                  user={user}
                  code={dt.code}
                  setComment={setComment}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Action
        action={dt}
        user={user}
        isLike={isLike}
        setIsLike={setIsLike}
        numLike={like}
        setNumLike={setLike}
        comment={comment}
        view={view}
      />
      <Comment comment_list={comment} />
      <SendMessenger
        user={user}
        code={dt.code}
        comment={dt.comment_list}
        setComment={setComment}
      />
    </div>
  );
};

export default Common;
