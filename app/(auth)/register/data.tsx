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
import { Loader2, Search, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Command, CommandInput } from "@/components/ui/command";
import Loading from "@/components/Loading";
import { Skeleton } from "@/components/ui/skeleton";

const formatTab = (value: string) => {
  if (value == "emailPassword") {
    return "w-[0%]";
  }
  if (value == "companyInformation") {
    return "w-[33%]";
  }
  if (value == "profileInformation" || value == "selectProduct")
    return "w-[66%]";
  else {
    return "w-[100%]";
  }
};

const Data = () => {
  const [emailPassword, setEmailPassword] = useState<any>();
  const [tab, setTab] = useState<any>("selectProduct");
  const [company, setCompany] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [productFollowed, setProductFollowed] = useState<any>([]);
  const [productList, setProductList] = useState<any>();
  const [productLevel1, setProductLevel1] = useState<any>([]);
  const [filter, setFilter] = useState<any>('');
  const [productSearch, setProductSearch] = useState<any>([]);
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [websiteCheck, setWebsiteCheck] = useState<any>(false);
  const [registerLoading, setRegisterLoading] = useState<any>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(999);
  const [productLoading, setProductLoading] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      // setIsLoading(true);
      await Promise.all([
        // getRequest("/product/list-category-by-level").then((data: any) => {
        //   const arr: any[] = [];
        //   setProductList(data);
        // }),
        allProductSearch(),
        getRequest("/product/list-category").then((data: any) => {
          setProductLevel1(data?.data);
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

  const fetchData = () => {
    const check = productSeclect?`&code=${productSeclect.code}&level=1`:''
    getRequest(
      `/product/list-category-level-3?keyword=${filter}&page=${page}&limit=5` + check
    )
      .then((data) => {
        setPage((prev) => prev + 1);
        setTotal(() => data?.total_records);
        setProductSearch((prev: any) => [...prev, ...data?.data]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loading) {
      fetchData();
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("myContainer");
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollHeight - scrollTop - clientHeight < 200) {
          if (!loading && productSearch.length < total) {
            setLoading(true);
          }
        }
      }
    };

    const container = document.getElementById("myContainer");
    if (container) {
      // Thêm điều kiện kiểm tra popover đã mở hay chưa
      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loading, productSearch, total, productSeclect]);

  const allProductSearch = () => {
    setPage(2);
    setProductSelect(undefined);
    // const arr: any[] = [];
    // Object.values(data.data).forEach((e: any) => {
    //   e.children?.forEach((e: any) => {
    //     e.children?.forEach((e: any) => {
    //       arr.push(e);
    //     });
    //   });
    // });
    // setProductSearch(arr);
    setProductLoading(true);
    getRequest(`/product/list-category-level-3?keyword=${filter}&page=1&limit=10`).then(
      (data: any) => {
        setTotal(() => data?.total_records);
        setProductLoading(false);
        setProductSearch(data?.data);
      }
    );
  };

  const choiceProductSearch = (data: any) => {
    setProductSelect(data);
    // const arr: any[] = [];
    // data.children?.forEach((e: any) => {
    //   e.children?.forEach((e: any) => {
    //     arr.push(e);
    //   });
    // });
    // setProductSearch(arr);
    setProductLoading(true);
    const check = data?`&code=${data.code}&level=1`:''
    getRequest(`/product/list-category-level-3?keyword=${filter}&page=1&limit=10` + check).then(
      (data: any) => {
        setTotal(() => data?.total_records);
        setProductLoading(false);
        setProductSearch(data?.data);
      }
    );
  };

  const filterProductSearch = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setProductLoading(true);
      const check = productSeclect?`&code=${productSeclect.code}&level=1`:''
      getRequest(
        `/product/list-category-level-3?keyword=${filter}&page=1&limit=8` + check
      ).then((data: any) => {
        setPage((prev) => prev + 1);
        setTotal(() => data?.total_records);
        setProductLoading(false);
        setProductSearch(data?.data);
      });
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
    setRegisterLoading(true);
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
          variant: "success",
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
        setToken(data?.data.access_token);
        setRegisterLoading(false);
      }
    });
    return;
  };
  const resendEmail = () => {
    getRequestWithBear("/auth/resend-email/", token).then((data: any) => {
      toast({
        variant: "success",
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
      <div className={`${isLoading ? "hidden" : "block"} relative`}>
        <Tabs
          defaultValue="emailPassword"
          value={tab}
          onValueChange={(e) => setTab(e)}
          className="flex items-center flex-col gap-16 w-full z-20"
        >
          {/* title */}
          <TabsList className="!flex !justify-content w-full xl:w-1/2 bg-white pt-24">
            <div className="flex flex-col gap-2 items-center w-1/4">
              <div className="hidden xs:inline xs:text-sm xl:text-lg font-bold text-[#081342]">
                Email & password
              </div>
              <div
                className="w-6 h-6 rounded-full !bg-[#081342] z-20"
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
                    ? "hidden xs:inline xs:text-sm xl:text-lg font-bold text-[#081342]"
                    : "hidden xs:inline xs:text-sm xl:text-lg text-[#081342]"
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
                    ? "w-6 h-6 rounded-full bg-[#081342] z-20 "
                    : "w-6 h-6 rounded-full !bg-neutral-400 z-20"
                }
              ></div>
            </div>

            <div className="flex flex-col gap-2 items-center w-1/4">
              <div
                className={
                  tab == "profileInformation" ||
                  tab == "selectProduct" ||
                  tab == "emailVerification"
                    ? "hidden xs:inline xs:text-sm xl:text-lg font-bold text-[#081342]"
                    : "hidden xs:inline xs:text-sm xl:text-lg text-[#081342]"
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
                    ? "w-6 h-6 rounded-full bg-[#081342] z-20"
                    : "w-6 h-6 rounded-full !bg-neutral-400 z-20"
                }
              ></div>
            </div>

            <div className="flex flex-col gap-2 items-center w-1/4">
              <div
                className={
                  tab == "emailVerification"
                    ? "hidden xs:inline xs:text-sm xl:text-lg font-bold text-[#081342]"
                    : "hidden xs:inline xs:text-sm xl:text-lg text-[#081342]"
                }
              >
                Email verification
              </div>
              <div
                // onClick={() => setTab("emailVerification")}
                className={
                  tab == "emailVerification"
                    ? "w-6 h-6 rounded-full bg-[#081342] z-20"
                    : "w-6 h-6 rounded-full !bg-neutral-400 z-20"
                }
              ></div>
            </div>
            {/* <div className=" w-1/2 absolute top-[38px] left-[481px] px-28 z-0">
            <Separator className="bg-black" />
          </div> */}
          </TabsList>

          {/* Email & password */}
          <TabsContent value="emailPassword">
            <div className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
              <EmailPasswordForm
                setTab={setTab}
                updateParentData={setEmailPassword}
                updateEmail={setEmail}
              ></EmailPasswordForm>
            </div>
          </TabsContent>

          {/* Company Information */}
          <TabsContent
            value="companyInformation"
            className="w-4/5 xl:container py-16 max-h-[60vh]"
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
              // className="pb-10 lg:pb-0"
            ></CompanyInformationForm>
          </TabsContent>

          {/* selectProduct */}
          <TabsContent
            value="selectProduct"
            className="w-4/5 xl:w-2/3 max-h-[60vh]"
          >
            <div className="w-full flex flex-col gap-12">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-[2.5rem] font-black text-[#081342]">
                  Select the products you want to sell
                </span>
                <span className="hidden xs:inline text-[1.25rem]">
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
                        onClick={() => allProductSearch()}
                      >
                        All
                      </span>
                      {productLevel1?.map((e: any, index: any) => (
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
                      ))}
                    </div>

                    <div className="w-full flex h-[20vh] lg:h-[48vh] py-6 px-6">
                      <div
                        id="myContainer"
                        className="w-full flex flex-col overflow-y-scroll max-h-[18vh] lg:max-h-[45vh]"
                      >
                        {!productLoading && setProductSearch.length == 0 && (
                          <div className="text-xl font-bold text-center py-7">
                            No category found.
                          </div>
                        )}
                        {productLoading ? (
                          <div className="flex items-center justify-center pt-6 h-[80%]">
                            <Loader2 className="h-6 w-6 animate-spin" />
                          </div>
                        ) : (
                          productSearch?.map((e: any, index: any) => (
                            <div
                              className="flex pr-6 justify-between items-center"
                              key={index}
                            >
                              <div className="flex gap-2 items-center h-[8%]">
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
                          ))
                        )}
                        {loading && (
                          <div className="flex flex-col gap-3 w-full">
                            <Skeleton className="h-5 w-full px-3 py-2" />
                            <Skeleton className="h-5 w-full px-3 py-2" />
                            <Skeleton className="h-5 w-full px-3 py-2" />
                          </div>
                        )}
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
                  {registerLoading ? (
                    <Loader2 className=" w-6 animate-spin mr-2 h-full text-white" />
                  ) : (
                    <span className="!text-xl text-white">Continue</span>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Email Verification */}
          <TabsContent value="emailVerification" className="w-4/5 xl:w-1/2">
            <div className="w-full flex flex-col gap-12">
              <div className="flex flex-col gap-2 w-full">
                <span className="text-4xl font-black text-[#081342]">
                  Email verification
                </span>
                <span className="hidden xs:inline text-[1.25rem]">
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
            className="flex justify-center w-3/4 xl:w-2/3"
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
        <div className="w-full absolute top-[6rem] xl:top-[7rem] xs:top-[6.75rem] z-10">
          <div className=" border-b border-gray-400 w-[75%] xl:w-[37%] mx-auto z-0"></div>
        </div>
        <div className="w-full absolute top-[6rem] xl:top-[7rem] xs:top-[6.75rem] z-10">
          <div className=" w-[75%] xl:w-[37%] mx-auto">
            <div
              className={`border-b-2 border-[#081342] z-0 transition-all duration-500 ease-in-out ${formatTab(
                tab
              )} `}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
