import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CreateCompanyContact from "./UpdateCompanyContact";
import UpdateCompanyContact from "./UpdateCompanyContact";
import CreateRFQ from "./CreateRFQ";
import Data from "./data";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IUserProfile } from "@/type/user-profile.interface";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const Create = async () => {
  const session = await getServerSession(options);
  const user: IUserProfile = session?.user;
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
    <Data></Data>
  );
};

export default Create;
