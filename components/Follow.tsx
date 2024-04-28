"use client";
import { postRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const Follow = ({ code, followers, products, user }: any) => {
  const [loading, setLoading] = useState(false);
  const [fl, setFl] = useState(followers);
  const { toast } = useToast();
  const handleFollow = () => {
    setLoading(true);
    postRequest("/user/upload", {
      follow_user_code: code,
    })
      .then(() => {
        toast({
          variant: "success",
          title: "Succes",
        });
        setFl((prev: any) => [...prev, code])
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex gap-4 underline items-center">
      <p>{fl.length} Followers</p>
      <p>{products} Products</p>
      <div>
        {
          loading ?
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button> : <Button onClick={handleFollow}>{followers.includes(code) ? "+ UnFollow" : "+ Follow"}</Button>
        }
      </div>
    </div>
  );
};

export default Follow;
