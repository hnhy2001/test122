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
import { getRequest, postRequest } from "@/hook/apiClient";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

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
  const { toast } = useToast();
  useEffect(() => {
    (() => {
      getRequest("/product/list-category-by-level").then((data: any) => {
        const arr: any[] = [];
        setProductList(data);
        allProductSearch(data);
      });
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
      code: countryOfResidence.dial_code.slice(1, countryOfResidence.dial_code),
      name: countryOfResidence.name,
    };
    const level = JSON.parse(profile.jobLevel);
    const jobExpertise = JSON.parse(profile.departmentRole);
    const reason = JSON.parse(profile.type);
    const businessType = company.businessType[0];
    const companyInf = {
      name: company.companyName,
      type: JSON.parse(businessType),
      location: country,
      revenue: 20,
      number_members: 100,
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
    console.log(payload)
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
        toast({
          variant: "default",
          title: "Success!",
          description: "Register success",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => setTab("emailVerification")}
            >
              Done
            </ToastAction>
          ),
        });
      }
    });
    return;
  };
  return (
    <div className="py-16">
      <Tabs
        defaultValue="emailPassword"
        value={tab}
        onValueChange={(e) => setTab(e)}
        className="flex items-center flex-col gap-16 w-full relative"
      >
        {/* title */}
        <TabsList className="!flex !justify-content !w-1/2 bg-white">
          <div className="flex flex-col gap-2 items-center w-1/4">
            <div className="text-lg">Email & password</div>
            <div
              className="w-6 h-6 rounded-full !bg-black"
              onClick={() => setTab("emailPassword")}
            ></div>
          </div>

          <div className="flex flex-col gap-2 items-center w-1/4">
            <div className="text-lg">Company information</div>
            <div
              onClick={() => setTab("companyInformation")}
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
            <div className="text-lg">Profile information</div>
            <div
              onClick={() => setTab("profileInformation")}
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
            <div className="text-lg">Email verification</div>
            <div
              onClick={() => setTab("emailVerification")}
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
        <TabsContent value="emailPassword">
          <EmailPasswordForm
            setTab={setTab}
            updateParentData={setEmailPassword}
          ></EmailPasswordForm>
        </TabsContent>

        {/* Company Information */}
        <TabsContent value="companyInformation" className="container">
          <CompanyInformationForm
            setTab={setTab}
            updateParentData={setCompany}
          ></CompanyInformationForm>
        </TabsContent>

        {/* selectProduct */}
        <TabsContent value="selectProduct" className="w-2/3">
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-4xl font-black">
                Select the products you want to sell
              </span>
              <span className="text-lg">
                Choose at least 1 product youre interested in to receive
                personalized content and recommendations.
              </span>
            </div>

            <div className="flex gap-4">
              <div className="w-[70%] h-full">
                <div className="flex flex-col gap-2 w-full h-[60vh] border border-black rounded-lg">
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder="Search products in food and agriculture"
                      className="border-black border-b w-full h-16 text-lg"
                      onChange={(event) => setFilter(event.target.value)}
                      onKeyDown={filterProductSearch}
                      value={filter}
                    />
                  </div>

                  <div className="flex w-full !h-20 border-b-2 border-neutral-300 gap-5 text-sm font-semibold overflow-x-scroll"
                  style={
                    {
                      scrollbarWidth: "thin"
                    }
                  }
                  >
                    <span
                      className={
                        !productSeclect
                          ? "px-5 w-1/2 flex items-center justify-items-center border-b-4 border-[#081342]"
                          : "px-5 w-1/2 flex items-center justify-items-center"
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
                                  ? "px-5 w-1/2 flex items-center justify-items-center border-b-4 border-[#081342] whitespace-nowrap"
                                  : "px-5 w-1/2 flex items-center justify-items-center whitespace-nowrap"
                              }
                              onClick={() => choiceProductSearch(e)}
                            >
                              {e.name}
                            </span>
                          )
                        )
                      : ""}
                  </div>

                  <div className="w-full flex flex-col overflow-y-scroll h-[50vh]">
                    {productSearch?.map((e: any, index: any) => (
                      <div
                        className="flex pb-2 px-2 justify-between items-center"
                        key={index}
                      >
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/image33.png"
                            alt="image"
                            width={48}
                            height={48}
                          ></Image>
                          <span className="text-sm">{e.name}</span>
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

              <div className="w-[30%] h-[60vh] border border-black rounded-lg flex flex-col gap-8 py-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold">Product Selected</span>
                  <Button className="!w-6 !h-6">
                    {productFollowed.length}
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {productFollowed?.map((e: any, index: any) => (
                    <div
                      className="flex pb-2 px-4 justify-between items-center text-2xl"
                      key={index}
                    >
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
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

            <div className="flex justify-end gap-4">
              <Button
                className="!w-[15%] h-16 border-2 border-black"
                variant="outline"
                onClick={() => setTab("profileInformation")}
              >
                Back
              </Button>

              <Button className="!w-[15%] h-16" onClick={register}>
                Continue
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Email Verification */}
        <TabsContent value="emailVerification" className="w-1/2">
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2 w-full">
              <span className="text-4xl font-black">Email verification</span>
              <span className="text-xl">
                We just sent a verification link to{" "}
                <span className="text-lg font-bold">
                  tomnguyen3006@gmail.com
                </span>
                . Please check your inbox and verify your account to complete
                your sign-up.{" "}
                <Link href="/" className="font-bold underline">
                  Resend email
                </Link>{" "}
                or check your spam holder
              </span>
            </div>

            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-semibold">
                  1. Open your inbox
                </span>
                <img
                  src="/image34.png"
                  alt="image34"
                  className="w-[55%] h-[15vh]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xl font-semibold">
                  2. Search for Tridge email
                </span>
                <img
                  src="/image35.png"
                  alt="image34"
                  className="w-[55%] h-[15vh]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xl font-semibold">
                  3. Click on ‘Verify’ button
                </span>
                <img
                  src="/image36.png"
                  alt="image34"
                  className="w-[55%] h-[15vh]"
                />
              </div>

              <span>
                <Link href="/" className="font-bold underline">
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
          <SetupProfileForm updateParentData={setProfile} setTab={setTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Data;
