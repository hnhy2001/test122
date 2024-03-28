import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import React from "react";
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

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup",
};

const Signup = () => {
  return (
    <div className="py-16">
      <Tabs
        defaultValue="emailPassword"
        className="flex items-center flex-col gap-16 w-full relative"
      >
        {/* title */}
        <TabsList className="!flex !justify-content !w-1/2 bg-white">
          <div className="flex flex-col gap-2 items-center w-1/4">
            <div className="text-lg">Email & password</div>
            <TabsTrigger
              value="emailPassword"
              className="w-6 h-6 rounded-full !bg-neutral-400 hover:!bg-black z-10"
            ></TabsTrigger>
          </div>

          <div className="flex flex-col gap-2 items-center w-1/4">
            <div className="text-lg">Company information</div>
            <TabsTrigger
              value="companyInformation"
              className="w-6 h-6 rounded-full !bg-neutral-400 hover:!bg-black z-10"
            ></TabsTrigger>
          </div>

          <div className="flex flex-col gap-2 items-center w-1/4">
            <div className="text-lg">Profile information</div>
            <TabsTrigger
              value="profileInformation"
              className="w-6 h-6 rounded-full !bg-neutral-400 hover:!bg-black z-10"
            ></TabsTrigger>
          </div>

          <div className="flex flex-col gap-2 items-center w-1/4">
            <div className="text-lg">Email verification</div>
            <TabsTrigger
              value="emailVerification"
              className="w-6 h-6 rounded-full !bg-neutral-400 hover:!bg-black z-10"
            ></TabsTrigger>
          </div>
        </TabsList>
        <div className="w-1/2 absolute top-[38px]  px-28 z-0">
          <Separator className="bg-neutral-400" />
        </div>

        {/* Email & password */}
        <TabsContent value="emailPassword">
          <EmailPasswordForm></EmailPasswordForm>
        </TabsContent>

        {/* Company Information */}
        <TabsContent value="companyInformation" className="container">
          <CompanyInformationForm></CompanyInformationForm>
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
                    />
                  </div>

                  <div className="w-full h-16 border-b-2 border-neutral-300 flex gap-5 text-sm font-semibold">
                    <div className="px-5 w-auto flex items-center justify-items-center hover:border-b-4 border-[#081342]">
                      All
                    </div>

                    <div className="px-5 w-auto flex items-center justify-items-center hover:border-b-4 border-[#081342]">
                      Seafood
                    </div>

                    <div className="px-5 w-auto flex items-center justify-items-center hover:border-b-4 border-[#081342]">
                      Vegetable
                    </div>

                    <div className="px-5 w-auto flex items-center justify-items-center hover:border-b-4 border-[#081342]">
                      Packaged Fruits & Vegetables
                    </div>

                    <div className="px-5 w-auto flex items-center justify-items-center hover:border-b-4 border-[#081342]">
                      Fruits
                    </div>

                    <div className="px-5 w-auto flex items-center justify-items-center hover:border-b-4 border-[#081342]">
                      Simple Processed Fruits
                    </div>
                  </div>

                  <div className="w-full flex flex-col overflow-y-scroll">
                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>

                    <div className="flex pb-2 px-2 justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/image33.png"
                          alt="image33"
                          width={48}
                          height={48}
                        ></Image>
                        <span className="text-sm">Fresh Whole Beef</span>
                      </div>
                      <Checkbox className="!w-6 !h-6" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[30%] h-[60vh] border border-black rounded-lg flex flex-col gap-8 py-6">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold">Product Selected</span>
                  <Button className="!w-6 !h-6">3</Button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex pb-2 px-4 justify-between items-center text-2xl">
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/image33.png"
                        alt="image33"
                        width={48}
                        height={48}
                      ></Image>
                      <span className="text-xl">Fresh Whole Beef</span>
                    </div>
                    <span className="font-bold">x</span>
                  </div>

                  <div className="flex pb-2 px-4 justify-between items-center text-2xl">
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/image33.png"
                        alt="image33"
                        width={48}
                        height={48}
                      ></Image>
                      <span className="text-xl">Fresh Whole Beef</span>
                    </div>
                    <span className="font-bold">x</span>
                  </div>

                  <div className="flex pb-2 px-4 justify-between items-center text-2xl">
                    <div className="flex gap-2 items-center">
                      <Image
                        src="/image33.png"
                        alt="image33"
                        width={48}
                        height={48}
                      ></Image>
                      <span className="text-xl">Fresh Whole Beef</span>
                    </div>
                    <span className="font-bold">x</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <TabsList className="!p-0 !m-0 !w-[15%]  bg-white border-0">
                <TabsTrigger
                  value="profileInformation"
                  className="!w-full !p-0"
                >
                  <Button
                    className="!w-full h-16 border-2 border-black"
                    variant="outline"
                  >
                    Back
                  </Button>
                </TabsTrigger>
              </TabsList>

              <TabsList className="!p-0 !m-0 !w-[15%]  bg-white border-0">
                <TabsTrigger value="emailVerification" className="!w-full !p-0">
                  <Button className="!w-full h-16">Continue</Button>
                </TabsTrigger>
              </TabsList>
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
          <SetupProfileForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Signup;
