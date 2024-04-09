"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteRFQ = ({ code }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  const handleDelte = () => {
    setLoading(true);
    getRequest("/rfq/delete/" + code)
      .then(() => {
        toast({
          title: "Sucess",
          description: "Delete RFQ",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Delete RFQ",
        });
      })
      .finally(() => {
        route.refresh();
        setLoading(false);
      });
  };
  if (loading)
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    );
  return (
    <Button variant={"destructive"} onClick={handleDelte}>
      Delete
    </Button>
  );
};

export default DeleteRFQ;
