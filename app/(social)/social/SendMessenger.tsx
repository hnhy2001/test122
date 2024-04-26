"use client";
import { Textarea } from "@/components/ui/textarea";
import { postRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const SendMessenger = ({ user, code, setComment }: any) => {
  const [mess, setMess] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const actionComment = () => {
    setLoading(true);
    postRequest("/post/update", {
      code: code,
      comment: mess,
      user_role: user.role,
    })
      .then(() => {
        setComment((prev: any) => [
          ...prev,
          {
            content: mess,
            user: { ...user, name: user.last_name },
            created_at: new Date(),
          },
        ]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setMess("");
        setLoading(false);
      });
  };

  return (
    <div>
      {user && (
        <div className=" flex gap-4 items-start">
          <Image
            src={user?.avatar}
            unoptimized
            alt={user.name}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
          <Textarea value={mess} onChange={(e) => setMess(e.target.value)} className="!min-h-14" />
          {loading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={() => actionComment()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default SendMessenger;
