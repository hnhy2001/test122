import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ContactInformation from "./contact"
import CompanyInformation from "./company"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create RFQ",
  description: "Create RFQ",
};

const Create = () => {
  return (
    <div className="w-1/3 mx-auto py-[32px] flex flex-col gap-[42px]">
      <div className="flex flex-col gap-[16px]">
        <div className="text-[16px] leading-[30px]">
          Your RFQ will be uploaded and visible on Social Marketplace once you become a verified buyer. Fill in the fields below and submit to proceed.
        </div>
        <div className="text-[32px] leading-[40px] font-bold">
          Create New RFQ
        </div>
        <div className="text-[16px] leading-[30px]">
          Relevant suppliers will be notified through email when your RFQ is successfully uploaded. Once uploaded, an RFQ will be valid for 30 days.
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div className="text-[32px] leading-[40px] font-bold">
          My Information
        </div>
        <div className="text-[16px] leading-[30px]">
          You must fill out this section to insert your request details.
        </div>
      </div>
      <div>
        <ContactInformation/>
      </div>
      <div>
        <CompanyInformation/>
      </div>
    </div>
  )
}
export default Create