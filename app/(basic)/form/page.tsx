"use client";
import { Checkbox } from "@/components/ui/checkbox";
import PersonalDetail from "@/components/ui/personal-detail";
import PersonalTab from "@/components/ui/personal-tab";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import FormSchema from "./FormSchema";
import { Metadata } from "next";
import { Progress } from "@/components/ui/progress";

// export const metadata: Metadata = {
//   title: "Form",
//   description: "Form",
// };

const Forms = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] z-50 flex justify-center items-center"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Forms;
