"use client";
import React, { useState } from "react";
import UpdateCompanyContact from "./UpdateCompanyContact";
import CreateRFQ from "./CreateRFQ";
import Loading from "@/components/Loading";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Data = ({ user }:any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myInformationCheck, setMyInformationCheck] = useState<boolean>(false);
  const { toast } = useToast();
  const route = useRouter()
  if (!user) {
    toast({
      variant: "warning",
      title: "Warning!",
      description: "Please Login",
      action: <ToastAction altText="Try again">Done</ToastAction>,
    });
    route.push('/signin')
  }
  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <div className={`flex justify-center w-full py-6 ${isLoading ? 'hidden' : 'block'}`}>
        <div className="flex flex-col gap-4 items-center w-full md:w-2/3 xl:w-1/3">
          <UpdateCompanyContact setMyInformationCheck={setMyInformationCheck}></UpdateCompanyContact>
          <CreateRFQ loading={setIsLoading}></CreateRFQ>
        </div>
      </div>
    </div>
  );
};

export default Data;
