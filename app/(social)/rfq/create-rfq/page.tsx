import ContactInformation from "./contact"
import CompanyInformation from "./company"
import { Metadata } from "next"
import Request from "./request";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IUserProfile } from "@/type/user-profile.interface";
import { getRequest } from "@/hook/api";
import CreateRFQ from "./create";

export const metadata: Metadata = {
  title: "Create RFQ",
  description: "Create RFQ",
};

const Create = async () => {
  const session = await getServerSession(options);
  const user: IUserProfile = session?.user;
  const [userData, countryData, companyData, bussinesTypeData, productCategoryData, productUnitData, deliveryTermData] = await Promise.all([
    user ? getRequest("/user/profile") : null,
    user ? getRequest("/config/countries") : null,
    user ? getRequest("/user/company") : null,
    user ? getRequest("/config/type_bussines") : null,
    user ? getRequest("/product/list-category") : null,
    user ? getRequest("/config/product_unit") : null,
    user ? getRequest("/config/delivery_term") : null
  ]);
  const userProfile: IUserProfile = {
    ...userData.data,
    country: {
      ...userData.data.country,
      code: "+" + userData.data.country.code
    },
  };
  const countries: any[] = countryData.data;
  const company: any[]= companyData.data
  const bussiness: any[] = bussinesTypeData.data
  const productCategory: any[] = productCategoryData.data
  const productUnit: any[] = productUnitData.data
  const deliveryTerm: any[] = deliveryTermData.data
  return (
    <CreateRFQ
      countries={countries}
      company={company}
      bussiness={bussiness}
      userProfile={userProfile}
      productCategory={productCategory}
      productUnit={productUnit}
      deliveryTerm={deliveryTerm}
    />
  );
}
export default Create