import ContactInformation from "./contact"
import CompanyInformation from "./company"
import { Metadata } from "next"
import Request from "./request";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IUserProfile } from "@/type/user-profile.interface";
import { getRequest } from "@/hook/api";

// export const metadata: Metadata = {
//   title: "Create RFQ",
//   description: "Create RFQ",
// };

const Create = async () => {
  const session = await getServerSession(options);
  const user: IUserProfile = session?.user;
  const [userData, countryData, companyData] = await Promise.all([
    user ? getRequest("/user/profile") : null,
    user ? getRequest("/config/countries") : null,
    user ? getRequest("/user/company") : null,
  ]);
  const userProfile: IUserProfile = {
    ...userData.data,
    country: {
      ...userData.data.country,
      code: "+" + userData.data.country.code
    },
  };
  const countries: any[] = countryData.data;
  const company: any = companyData.data
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
        <div className="text-3xl font-bold">My Information</div>
        <div className="text-base">
          You must fill out this section to insert your request details.
        </div>
      </div>
      <div>
        <ContactInformation info={userProfile} country={countries} />
      </div>
      <div>
        <CompanyInformation
          infoUser={userProfile}
          country={countries}
          company={company}
        />
      </div>
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