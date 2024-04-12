import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import PersonalDetail from "@/components/ui/personal-detail";
import PersonalTab from "@/components/ui/personal-tab";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getRequest } from "@/hook/api";
import { IUserProfile } from "@/type/user-profile.interface";
import { Metadata } from "next";
import Image from "next/image";
import React, { use } from "react";
import FormSchema from "./FormSchema";
import MyAccountComponent from "./my-account";
import Data from "./data";

// export const metadata: Metadata = {
//   title: "My Account",
//   description: "My Account",
// };

const MyAccount = () => {
  // const userProfile: IUserProfile = await getRequest("/auth/user-profile")
  // console.log(userProfile)


  return (
    <Data />
  );
};

export default MyAccount;
