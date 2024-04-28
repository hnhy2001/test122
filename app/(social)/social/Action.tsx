"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { postRequest } from "@/hook/apiClient";
import React from "react";

const Action = ({
  user,
  isLike,
  action,
  numLike,
  setNumLike,
  setIsLike,
  comment,
  view
}: any) => {
  const actionLike = () => {
    const newLike = !isLike;
    const likeChange = newLike ? 1 : -1;
    postRequest("/post/update", {
      code: action.code,
      like: likeChange,
      user_role: user.role,
    })
      .then(() => {
        setIsLike(newLike);
        setNumLike((prevNumLike: any) => prevNumLike + likeChange);
      })
      .catch((err) => console.log(err));
  };
  const { toast } = useToast();
  return (
    <div>
      <div className="flex justify-between">
        {/* <p className="text-[#081342]">{numLike} Likes</p> */}
        <div className="flex gap-4 text-[#4A4A4A]">
          <p className="text-[#081342]">{numLike} Likes</p>
          <p>{view} views</p>
        </div>
        <div className="flex gap-4 text-[#4A4A4A]">
          <p>{comment?.length} comments</p>
          <p>{action?.share} shares</p>
        </div>
      </div>
      <Separator className=" bg-[#8C8585] w-full" />
      <div className="flex px-5 justify-between py-2">
        <Button variant="ghost" onClick={() => actionLike()}>
          <div
            className={`flex gap-1 items-center ${isLike ? "text-blue-700" : " "
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            Like
          </div>
        </Button>
        <Button variant="ghost">
          <div className="flex gap-1 items-center">
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
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            Comment
          </div>
        </Button>

        <Button variant="ghost" onClick={() => {
          navigator.clipboard.writeText(window.location.origin + '/social/' + action.content.split(' ').join('-') + "-i." + action.code).then(() => {
            postRequest("/post/update", {
              code: action.code,
              share: 1,
              user_role: user.role,
            })
            toast({
              variant: "success",
              title: "Success",
              description: "Copy link post",
            })
          }).catch(err => {
            console.error('Không thể sao chép: ', err);
          });
        }}>
          <div className="flex gap-1 items-center">
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
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            Share
          </div>
        </Button>
      </div>
      <Separator className=" bg-[#8C8585] w-full" />
    </div>
  );
};

export default Action;
