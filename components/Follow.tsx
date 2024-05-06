"use client";
import { postRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const checkFollow = (follows: any, code: any) => {
  console.log(code)
  return follows.find((follow: any) => follow.code == code)
}


const Follow = ({ code, followers, products, user, type }: any) => {
  console.log(followers)
  const [loading, setLoading] = useState(false);
  const [fl, setFl] = useState(followers);
  const [isFollow, setFollow] = useState(checkFollow(followers, user?.code))
  useEffect(() => {
    setFollow(checkFollow(fl, user?.code))
  }, [fl])
  const { toast } = useToast();
  const handleFollow = () => {
    setLoading(true);
    if (isFollow) {
      postRequest("/user/unfollow-user", {
        user_code: code,
        user_role: type
      })
        .then(() => {
          toast({
            variant: "success",
            title: "Unfollow User",
          });
          setFl((prev: any) => prev.filter((p: any) => p.code != user?.code))
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Fail",
          });
        })
        .finally(() => setLoading(false));
    }
    else {
      postRequest("/user/follow-user", {
        user_code: code,
        user_role: type
      })
        .then(() => {
          toast({
            variant: "success",
            title: "Follow User",
          });
          setFl((prev: any) => [...prev, { code: user?.code }])
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Fail",
          });
        })
        .finally(() => setLoading(false));
    }

  };
  return (
    <div className="flex gap-4 underline items-center">
      <p>{fl?.length} Followers</p>
      <p>{products} Products</p>
      <div>
        {
          loading ?
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button> : <Button onClick={() => handleFollow()}>{isFollow ? "+ UnFollow" : "+ Follow"}</Button>
        }
      </div>
    </div>
  );
};

export default Follow;
