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
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-3/4 gap-12">
              <div className="flex flex-col gap-2 w-full items-center">
                <span className="text-4xl font-black">
                  To get started, add your work email
                </span>
                <div className="px-16 w-full text-center">
                  <span className="text-lg">
                    Built for trust, our platform allows verified businesses to
                    get exclusive access to advanced Tridge features and
                    benefits.
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col items-center gap-8">
                <div className="flex flex-col gap-4 w-3/4">
                  <span className="text-xl font-bold">Work email</span>
                  <Input
                    type="text"
                    placeholder="Work email"
                    className="border-black border w-full h-16 text-lg"
                  />
                </div>

                <div className="flex flex-col gap-4 w-3/4">
                  <span className="text-xl font-bold">Password</span>
                  <Input
                    type="text"
                    placeholder="Password"
                    className="border-black border w-full h-16 text-lg"
                  />
                </div>

                <div>
                  <span className="text-lg">
                    By signing up, you agree to our{" "}
                    <Link href="/" className="font-bold underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/" className="font-bold underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </div>
              </div>
              {/* <TabsList className="!p-0 !m-0 !w-full bg-white border-0">
                <TabsTrigger value="profileInformation" className="!w-full !p-0"> */}
              <Button className="w-3/4 flex justify-center !h-16 text-xl">
                Create an account
              </Button>
              {/* </TabsTrigger>
              </TabsList> */}
              <div className="flex justify-center gap-2">
                <span className="text-lg">Already have account?</span>{" "}
                <Link href={"/"} className="text-xl font-bold">
                  Sign in now!
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Company Information */}
        <TabsContent value="companyInformation" className="container">
          <div className="!w-ful flex flex-col gap-12">
            <div className="flex flex-col gap-2 w-1/2">
              <span className="text-4xl font-black">
                Create your company profile
              </span>
              <span className="text-lg">
                Please note that your company details will be used to verify
                your account.
              </span>
            </div>

            <div className="flex gap-16">
              <div className="flex flex-col gap-8 w-[40%]">
                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">Company name*</span>
                  <Input
                    type="text"
                    className="border-black border w-full h-16 text-lg"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">Location</span>
                  <Select>
                    <SelectTrigger className="border border-black !h-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Việt Nam"> Việt Nam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">Company Website*</span>
                  <Input
                    type="text"
                    className="border-black border w-full h-16 text-lg"
                  />
                  <div className="flex gap-2 w-full items-center">
                    <Checkbox className="!w-6 !h-6 rounded-full" />
                    <span className="text-lg">My company has no website.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8 w-[60%]">
                <div className="flex flex-col gap-4">
                  <span className="text-xl font-bold">Business type*</span>
                  <div className="flex gap-4">
                    <div className="w-[45%] flex flex-col gap-4">
                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">
                          Farming / Production / Processing / Packing
                        </span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">
                          Non-food manufacturing
                        </span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Retail</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16]">HORECA</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16]">Government</span>
                      </div>
                    </div>
                    <div className="w-[30%] flex flex-col gap-4">
                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Food manufacturing</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">
                          Distribution / Wholesale
                        </span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Trade</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Logistics</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Academic</span>
                      </div>
                    </div>

                    <div className="w-[25%] flex flex-col gap-4">
                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Agtech</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Consulting</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Financial</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Market Research</span>
                      </div>

                      <div className="flex gap-2 items-center">
                        <Checkbox className="w-5 h-5" />
                        <span className="text-[16px]">Others</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-lg">
                    Please check all relevant business types.
                  </span>
                  <div className="flex gap-8">
                    <div className="flex flex-col gap-[9px] w-1/2">
                      <span className="text-xl font-bold">
                        Annual Sales Revenue (USD)
                      </span>
                      <Select>
                        <SelectTrigger className="border border-black !h-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Việt Nam"> Việt Nam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-[9px] w-1/2">
                      <span className="text-xl font-bold">
                        Number of employees
                      </span>
                      <Select>
                        <SelectTrigger className="border border-black !h-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Việt Nam"> Việt Nam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <TabsList className="!p-0 !m-0 !w-1/4  bg-white border-0">
                <TabsTrigger
                  value="profileInformation"
                  className="!w-full !p-0"
                >
                  <Button className="!w-full h-16">Continue</Button>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
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
          className="flex justify-center w-full"
        >
          <div className="w-2/3 flex flex-col gap-12">
            <div className="flex flex-col gap-2 w-1/2">
              <span className="text-4xl font-black">
                Set up your account information
              </span>
              <span className="text-lg">
                Please note that your company details will be used to verify
                your account.
              </span>
            </div>

            <div className="flex gap-16 w-full">
              <div className="flex flex-col gap-8 w-1/2">
                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">First name*</span>
                  <Input
                    type="text"
                    className="border-black border w-full h-16 text-lg"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">Last name*</span>
                  <Input
                    type="text"
                    className="border-black border w-full h-16 text-lg"
                  />
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">
                    Country of residence*
                  </span>
                  <Select>
                    <SelectTrigger className="border border-black !h-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Việt Nam"> Việt Nam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">Department role*</span>
                  <Select>
                    <SelectTrigger className="border border-black !h-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Việt Nam"> Việt Nam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-8 w-1/2">
                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">Job level*</span>
                  <Select>
                    <SelectTrigger className="border border-black !h-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Việt Nam"> Việt Nam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <span className="text-xl font-bold">
                    I’m most interested in..*
                  </span>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex px-2 items-center justify-between border-black border h-16 rounded-lg gap-16">
                      <span className="text-lg">
                        Sourcing and purchasing the best quality of agri
                        products
                      </span>
                      <Checkbox className="!w-6 !h-6 rounded-full" />
                    </div>

                    <div className="flex px-2 items-center justify-between border-black border h-16 rounded-lg gap-16">
                      <span className="text-lg">
                        Selling and marketing agri products and services
                      </span>
                      <Checkbox className="!w-6 !h-6 rounded-full" />
                    </div>

                    <div className="flex px-2 items-center justify-between border-black border h-16 rounded-lg gap-16">
                      <span className="text-lg">
                        Conducting academic research in agriculture, including
                        all non-trading activities
                      </span>
                      <Checkbox className="!w-6 !h-6 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <TabsList className="!p-0 !m-0 !w-[15%]  bg-white border-0">
                <TabsTrigger
                  value="companyInformation"
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
                <TabsTrigger value="selectProduct" className="!w-full !p-0">
                  <Button className="!w-full h-16">Continue</Button>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Signup;
