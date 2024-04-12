"use client";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRequest, getRequestWithBear, postRequest } from "@/hook/apiClient";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Command, CommandInput } from "@/components/ui/command";
import Loading from "@/components/Loading";

const Data = () => {
  const [emailPassword, setEmailPassword] = useState<any>();
  const [tab, setTab] = useState<any>("emailPassword");
  const [company, setCompany] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [productFollowed, setProductFollowed] = useState<any>([]);
  const [productList, setProductList] = useState<any>();
  const [filter, setFilter] = useState<any>();
  const [productSearch, setProductSearch] = useState<any>();
  const [productSeclect, setProductSelect] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [token, setToken] = useState<any>();
  const [businessType, setBusinessType] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [salesRevenue, setSalesRevenue] = useState<any>();
  const [numberOfEmployees, setNumberOfEmployees] = useState<any>();
  const [role, setRole] = useState<any>();
  const [jobLevel, setJobLevel] = useState<any>();
  const [thing, setThing] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [websiteCheck, setWebsiteCheck] = useState<any>(false);
  const { toast } = useToast();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await Promise.all([
        getRequest("/product/list-category-by-level").then((data: any) => {
          const arr: any[] = [];
          setProductList(data);
          allProductSearch(data);
        }),
        getRequest("/config/type_bussines").then((data) =>
          setBusinessType(data)
        ),
        getRequest("/config/countries").then((data) => setLocation(data)),
        getRequest("/config/annual_sale_revenue").then((data) =>
          setSalesRevenue(data)
        ),
        getRequest("/config/number_of_employee").then((data) =>
          setNumberOfEmployees(data)
        ),
        getRequest("/config/department_role").then((data) => setRole(data)),
        getRequest("/config/job_level").then((data) => setJobLevel(data)),
        getRequest("/config/thing_of_interest").then((data) => setThing(data)),
      ]);
      setIsLoading(false);
    })();
  }, []);

  const allProductSearch = (data: any) => {
    setProductSelect(undefined);
    const arr: any[] = [];
    Object.values(data.data).forEach((e: any) => {
      e.children?.forEach((e: any) => {
        e.children?.forEach((e: any) => {
          arr.push(e);
        });
      });
    });
    setProductSearch(arr);
  };

  const choiceProductSearch = (data: any) => {
    setProductSelect(data);
    const arr: any[] = [];
    data.children?.forEach((e: any) => {
      e.children?.forEach((e: any) => {
        arr.push(e);
      });
    });
    setProductSearch(arr);
  };

  const filterProductSearch = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (filter == "") {
        productSeclect
          ? choiceProductSearch(productSeclect)
          : allProductSearch(productList);
      } else {
        setProductSearch(
          productSearch.filter((e: any) => e.name.includes(filter))
        );
      }
    }
  };

  const mapProductFollowed = (e: any) => {
    const obj = {
      code: e.code,
      name: e.name,
      avatar: e.avatar,
    };
    setProductFollowed((item: any) => {
      if (item.some((i: any) => i.code == obj.code && i.name == obj.name)) {
        const arr = [...item].filter(
          (i: any) => i.code != obj.code && i.name != obj.name
        );
        return arr;
      } else {
        return [...item, obj];
      }
    });
  };
  const register = () => {
    const countryOfResidence = JSON.parse(profile?.countryOfResidence);
    const country = {
      code: countryOfResidence.code,
      name: countryOfResidence.name,
    };
    const level = JSON.parse(profile.jobLevel);
    const jobExpertise = JSON.parse(profile.departmentRole);
    const reason = JSON.parse(profile.type);
    const businessType = company.businessType[0];
    const companyInf = websiteCheck
      ? {
          name: company.companyName,
          type: JSON.parse(businessType),
          location: country,
          revenue: JSON.parse(company.annualSalesRevenue),
          number_members: JSON.parse(company.numberOfEmployees),
        }
      : {
          name: company.companyName,
          type: JSON.parse(businessType),
          location: country,
          revenue: JSON.parse(company.annualSalesRevenue),
          number_members: JSON.parse(company.numberOfEmployees),
          website: company.companyWebsite,
        };

    const payload = {
      first_name: profile.firstName,
      last_name: profile.lastName,
      email: emailPassword.emailAddress,
      password: emailPassword.password,
      password_confirmation: emailPassword.password,
      country: country,
      level: level,
      job_expertise: jobExpertise,
      reason: reason,
      company: companyInf,
      products_followed: productFollowed,
    };

    postRequest("/auth/register", payload).then((data) => {
      if (data.code !== 200) {
        toast({
          variant: "destructive",
          title: "Went wrong!",
          description: JSON.stringify(data.data),
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => setTab("emailPassword")}
            >
              Try again
            </ToastAction>
          ),
        });
      } else {
        setTab("emailVerification");
        // getRequestWithBear("/auth/resend-email/",data?.data.access_token)
        toast({
          variant: "default",
          title: "Success!",
          description: "Register success",
          action: (
            <ToastAction
              altText="Try again"
              // onClick={() => setTab("emailVerification")}
            >
              Done
            </ToastAction>
          ),
        });
        // getRequestWithBear("/auth/resend-email/",data?.data.access_token).then((data:any)=>{
        //   toast({
        //     variant: "default",
        //     title: "Success!",
        //     description: "resend email success",
        //     action: (
        //       <ToastAction
        //         altText="Try again"
        //         // onClick={() => setTab("emailVerification")}
        //       >
        //         Done
        //       </ToastAction>
        //     ),
        //   });
        // })

        setToken(data?.data.access_token);
      }
    });
    return;
  };
  const resendEmail = () => {
    getRequestWithBear("/auth/resend-email/", token).then((data: any) => {
      toast({
        variant: "default",
        title: "Success!",
        description: "resend email success",
        action: (
          <ToastAction
            altText="Try again"
            // onClick={() => setTab("emailVerification")}
          >
            Done
          </ToastAction>
        ),
      });
    });
  };
  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <div className={`py-16 ${isLoading ? "hidden" : "block"}`}>
        <Tabs
          defaultValue="emailPassword"
          value={tab}
          onValueChange={(e) => setTab(e)}
          className="flex items-center flex-col gap-16 w-full relative"
        >
          {/* title */}
          <TabsList className="!flex !justify-content w-full xl:w-1/2 bg-white">
            <div className="flex flex-col gap-2 items-center w-1/4">
              <div className="text-xs xs:text-sm xl:text-lg font-bold">
                Email & password
              </div>
              <div
                className="w-6 h-6 rounded-full !bg-black"
                // onClick={() => setTab("emailPassword")}
              ></div>
            </div>

            <div className="flex flex-col gap-2 items-center w-1/4">
              <div
                className={
                  tab == "companyInformation" ||
                  tab == "profileInformation" ||
                  tab == "selectProduct" ||
                  tab == "emailVerification"
                    ? "text-xs xs:text-sm xl:text-lg font-bold"
                    : "text-xs xs:text-sm xl:text-lg"
                }
              >
                Company information
              </div>
              <div
                // onClick={() => setTab("companyInformation")}
                className={
                  tab == "companyInformation" ||
                  tab == "profileInformation" ||
                  tab == "selectProduct" ||
                  tab == "emailVerification"
                    ? "w-6 h-6 rounded-full bg-black"
                    : "w-6 h-6 rounded-full !bg-neutral-400"
                }
              ></div>
            </div>

            <div className="flex flex-col gap-2 items-center w-1/4">
              <div
                className={
                  tab == "profileInformation" ||
                  tab == "selectProduct" ||
                  tab == "emailVerification"
                    ? "text-xs xs:text-sm xl:text-lg font-bold"
                    : "text-xs xs:text-sm xl:text-lg"
                }
              >
                Profile information
              </div>
              <div
                // onClick={() => setTab("profileInformation")}
                className={
                  tab == "profileInformation" ||
                  tab == "selectProduct" ||
                  tab == "emailVerification"
                    ? "w-6 h-6 rounded-full bg-black"
                    : "w-6 h-6 rounded-full !bg-neutral-400"
                }
              ></div>
            </div>

            <div className="flex flex-col gap-2 items-center w-1/4">
              <div
                className={
                  tab == "emailVerification"
                    ? "text-xs xs:text-sm xl:text-lg font-bold"
                    : "text-xs xs:text-sm xl:text-lg"
                }
              >
                Email verification
              </div>
              <div
                // onClick={() => setTab("emailVerification")}
                className={
                  tab == "emailVerification"
                    ? "w-6 h-6 rounded-full bg-black"
                    : "w-6 h-6 rounded-full !bg-neutral-400"
                }
              ></div>
            </div>
            {/* <div className=" w-1/2 absolute top-[38px] left-[481px] px-28 z-0">
            <Separator className="bg-black" />
          </div> */}
          </TabsList>

          {/* Email & password */}
          <TabsContent value="emailPassword" className="py-20">
            <EmailPasswordForm
              setTab={setTab}
              updateParentData={setEmailPassword}
              updateEmail={setEmail}
            ></EmailPasswordForm>
          </TabsContent>

          {/* Company Information */}
          <TabsContent
            value="companyInformation"
            className="container py-20 max-h-[60vh]"
          >
            <CompanyInformationForm
              setTab={setTab}
              updateParentData={setCompany}
              businessType={businessType}
              location={location}
              salesRevenue={salesRevenue}
              numberOfEmployees={numberOfEmployees}
              websiteCheck={websiteCheck}
              setWebsiteCheck={setWebsiteCheck}
              className="pb-10 lg:pb-0"
            ></CompanyInformationForm>
          </TabsContent>

          {/* selectProduct */}
          <TabsContent value="selectProduct" className="w-2/3 max-h-[60vh]">
            <div className="w-full flex flex-col gap-12">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-4xl font-black text-[#081342]">
                  Select the products you want to sell
                </span>
                <span className="text-lg text-[#081342]">
                  Choose at least 1 product youre interested in to receive
                  personalized content and recommendations.
                </span>
              </div>

              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-10 lg:col-span-7 h-full">
                  <div className="flex flex-col gap-2 w-full h-[30vh] lg:h-[60vh] border-b border-l border-r border border-[#081342] rounded-lg">
                    <div className="flex">
                      <Input
                        type="text"
                        className="flex px-8 py-3 bg-[#E7D8D8] rounded-lg w-full leading-5 pl-14 h-16 !text-xl"
                        startIcon={() => <Search className="h-6 w-6" />}
                        placeholder="Search products in food and agriculture"
                        onChange={(event) => setFilter(event.target.value)}
                        onKeyDown={filterProductSearch}
                        value={filter}
                      />
                    </div>

                    <div
                      className="flex w-full !h-16 border-b-2 border-neutral-300 gap-5 text-sm font-semibold overflow-x-scroll  scrollbar-thin"
                      style={{
                        scrollbarWidth: "none",
                      }}
                    >
                      <span
                        className={
                          !productSeclect
                            ? "px-5 py-4 w-1/2 flex items-center justify-items-center border-b-4 border-[#081342] text-xl text-[#081342]"
                            : "px-5 py-4 w-1/2 flex items-center justify-items-center text-xl text-[#081342]"
                        }
                        onClick={() => allProductSearch(productList)}
                      >
                        All
                      </span>
                      {productList
                        ? Object.values(productList?.data).map(
                            (e: any, index: any) => (
                              <span
                                key={index}
                                className={
                                  productSeclect?.name == e.name
                                    ? "px-5 py-4 w-1/2 flex items-center justify-items-center border-b-4 border-[#081342] whitespace-nowrap text-xl text-[#081342]"
                                    : "px-5 py-4 w-1/2 flex items-center justify-items-center whitespace-nowrap text-xl text-[#081342]"
                                }
                                onClick={() => choiceProductSearch(e)}
                              >
                                {e.name}
                              </span>
                            )
                          )
                        : ""}
                    </div>

                    <div className="w-full flex h-[20vh] lg:h-[48vh] py-6 px-6">
                      <div className="w-full flex flex-col overflow-y-scroll max-h-[18vh] lg:max-h-[45vh]">
                        {productSearch?.map((e: any, index: any) => (
                          <div
                            className="flex pr-6 justify-between items-center "
                            key={index}
                          >
                            <div className="flex gap-2 items-center">
                              <Image
                                src={e.avatar}
                                alt="image"
                                width={48}
                                height={48}
                              ></Image>
                              <span className="text-lg text-[#081342]">
                                {e.name}
                              </span>
                            </div>
                            <Checkbox
                              className="!w-6 !h-6"
                              checked={productFollowed.some(
                                (item: any) =>
                                  item.code == e.code && item.name == e.name
                              )}
                              onClick={() => mapProductFollowed(e)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-10 lg:col-span-3 h-[30vh] lg:h-[60vh] border border-black rounded-lg flex flex-col gap-8 py-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl font-bold text-[#081342]">
                      Product Selected
                    </span>
                    <Button className="!w-6 !h-6">
                      {productFollowed.length}
                    </Button>
                  </div>
                  <div className="h-[20vh] lg:h-[50vh] pr-6 overflow-y-scroll">
                    <div className="flex flex-col gap-2">
                      {productFollowed?.map((e: any, index: any) => (
                        <div
                          className="flex pb-2 px-4 justify-between items-center text-2xl"
                          key={index}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="w-12 h-12">
                              <Image
                                src={e.avatar}
                                alt="image33"
                                width={48}
                                height={48}
                              ></Image>
                            </div>
                            <span className="text-xl">{e.name}</span>
                          </div>
                          <span
                            className="font-bold"
                            onClick={() => mapProductFollowed(e)}
                          >
                            x
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  className="!w-1/2 lg:!w-1/4 border !h-[4.5rem] border-#939AA1 !text-xl text-[#081342]"
                  variant="outline"
                  onClick={() => setTab("profileInformation")}
                >
                  Back
                </Button>

                <Button
                  className="!w-1/2 lg:!w-1/4 border !h-[4.5rem] border-#939AA1 !text-xl"
                  onClick={register}
                >
                  Continue
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Email Verification */}
          <TabsContent value="emailVerification" className="w-1/2">
            <div className="w-full flex flex-col gap-12">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-4xl font-black text-[#081342]">
                  Email verification
                </span>
                <span className="text-xl text-[#081342]">
                  We just sent a verification link to{" "}
                  <span className="text-lg font-bold text-[#081342]">
                    {email}
                  </span>
                  . Please check your inbox and verify your account to complete
                  your sign-up.{" "}
                  <Link
                    href="/"
                    className="font-bold underline text-[#081342]"
                    onClick={resendEmail}
                  >
                    Resend email
                  </Link>{" "}
                  or check your spam holder
                </span>
              </div>

              <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold text-[#081342]">
                    1. Open your inbox
                  </span>
                  <img
                    src="/image34.png"
                    alt="image34"
                    className="w-full md:w-[55%] aspect-[3/1] object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold text-[#081342]">
                    2. Search for Tridge email
                  </span>
                  <img
                    src="/image35.png"
                    alt="image34"
                    className="w-full md:w-[55%] aspect-[3/1] object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold text-[#081342]">
                    3. Click on ‘Verify’ button
                  </span>
                  <img
                    src="/image36.png"
                    alt="image34"
                    className="w-full md:w-[55%] aspect-[3/1] object-cover"
                  />
                </div>

                <span className="text-[#081342]">
                  <Link
                    href="/"
                    className="font-bold underline text-[#081342]"
                    onClick={resendEmail}
                  >
                    Resend email
                  </Link>{" "}
                  or check your spam holder
                </span>
              </div>
            </div>
          </TabsContent>

          {/* Profile information */}
          <TabsContent
            value="profileInformation"
            className="flex justify-center w-2/3"
          >
            <SetupProfileForm
              updateParentData={setProfile}
              setTab={setTab}
              country={location}
              role={role}
              jobLevel={jobLevel}
              thing={thing}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Data;
