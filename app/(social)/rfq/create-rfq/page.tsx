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

const Create = () => {
  return (
    <div className="flex justify-center w-full py-6">
      <div className="flex flex-col gap-4 items-center w-1/3">
        <UpdateCompanyContact></UpdateCompanyContact>
        <CreateRFQ></CreateRFQ>
      </div>
    </div>
  );
};

export default Create;
