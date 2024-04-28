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
const Create = async () => {
  const session = await getServerSession(options);
  const user: IUserProfile = session?.user;
  return (
    <Data user={user}></Data>
  );
};

export default Create;
