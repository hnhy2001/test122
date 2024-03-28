import ContactInformation from "./contact"
import CompanyInformation from "./company"
import { Metadata } from "next"
import Request from "./request";

export const metadata: Metadata = {
  title: "Create RFQ",
  description: "Create RFQ",
};

const Create = () => {
  return (
    <div className="w-1/3 mx-auto py-8 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="text-base">
          Your RFQ will be uploaded and visible on Social Marketplace once you
          become a verified buyer. Fill in the fields below and submit to
          proceed.
        </div>
        <div className="text-[32px] leading-[40px] font-bold">
          Create New RFQ
        </div>
        <div className="text-base">
          Relevant suppliers will be notified through email when your RFQ is
          successfully uploaded. Once uploaded, an RFQ will be valid for 30
          days.
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold">
          My Information
        </div>
        <div className="text-base">
          You must fill out this section to insert your request details.
        </div>
      </div>
      <div>
        <ContactInformation />
      </div>
      <div>
        <CompanyInformation />
      </div>
      <button className="h-[42px] bg-primary text-white font-bold leading-[20px] w-full rounded-[6px]">
        Save
      </button>
      <div>
        <Request />
      </div>
      <button className="h-[42px] bg-primary text-white font-bold leading-[20px] w-full rounded-[6px]">
        Submit RFQ
      </button>
    </div>
  );
}
export default Create