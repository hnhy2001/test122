"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getRequest } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const DeleteSubmit = ({ rfqcode, code }: any) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const handleDelte = () => {
    setLoading(true);
    getRequest("/rfq/delete-quote/" + rfqcode + "/" + code)
      .then(() => {
        toast({
          title: "Sucess",
          description: "Delete Submit RFQ",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Delete Submit RFQ",
        });
      })
      .finally(() => setLoading(false));
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

export default DeleteSubmit;
