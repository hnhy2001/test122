import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import EmailPassword from "./EmailPasswordForm";
import EmailPasswordForm from "./EmailPasswordForm";
import CompanyInformationForm from "./CompanyInformationForm";
import SetupProfileForm from "./SetupProfileForm";
import Data from "./data";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Register",
  description: "Register",
};

const Signup = () => {
  return (
    <div>
      <Data />
      <Toaster />
    </div>
  );
};

export default Signup;
