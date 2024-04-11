"use client";
import { postRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const Follow = ({ code }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleFollow = () => {
    setLoading(true);
    postRequest("/user/upload", {
      follow_user_code: code,
    })
      .then(() => {
        toast({
          title: "Succes",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
        });
      })
      .finally(() => setLoading(false));
  };
  if (loading) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );
  }
  return <Button onClick={handleFollow}>+ Follow</Button>;
};

export default Follow;
