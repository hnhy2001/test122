"use client";
import React, { useState } from "react";
import UpdateCompanyContact from "./UpdateCompanyContact";
import CreateRFQ from "./CreateRFQ";
import Loading from "@/components/Loading";

const Data = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div>
      {isLoading ? <Loading /> : ""}  
      <div className={`flex justify-center w-full py-6 ${isLoading?'hidden':'block'}`}>
        <div className="flex flex-col gap-4 items-center w-full md:w-2/3 xl:w-1/3">
          <UpdateCompanyContact></UpdateCompanyContact>
          <CreateRFQ loading={setIsLoading}></CreateRFQ>
        </div>
      </div>
    </div>
  );
};

export default Data;
