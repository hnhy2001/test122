import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PersonalDetail from "@/components/ui/personal-detail";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea";
import PersonalTab from "@/components/ui/personal-tab";
import FormSchema from "./FormSchema";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IUserProfile } from "@/type/user-profile.interface";
import { getRequest } from "@/hook/api";
import Data from "./data";

export const metadata: Metadata = {
  title: "My Account",
  description: "My Account",
};

const CompanyInformation = async () => {
  
  return (
    <div>
      <Data />
    </div>
  );
};

export default CompanyInformation;
