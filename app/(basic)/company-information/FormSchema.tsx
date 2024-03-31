"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getRequest } from "@/hook/apiClient";
import { IUserProfile } from "@/type/user-profile.interface";
import { da } from "date-fns/locale";
const FormSchema = () => {
  const [data, setData] = useState<any>();
  const [country, setCountry] = useState<any>();
  useEffect(() => {
    (() => {
      getRequest("/config/countries").then((data) => setCountry(data));
      getRequest("/auth/user-profile").then((data: IUserProfile) => {
        setData(data);
        return form.reset({
          companyName: data?.company.name,
          businessType: JSON.stringify(data?.company.type),
          country: JSON.stringify(data?.country),
          yearEstablished: "",
          numberOfEmployees: data?.company.number_members.toString(),
          annualSalesRevenue: data?.company.revenue.toString(),
          businessRegistrationNumber: "",
          ownsWarehouse: "",
          officeAddress: "",
          companyDescription: "",
          companyWebsite: "",
          yourPosition: "",
        });
      });
    })();
  }, []);
  const formSchema = z.object({
    companyName: z.string(),
    businessType: z.string(),
    country: z.string(),
    yearEstablished: z.string(),
    numberOfEmployees: z.string(),
    annualSalesRevenue: z.string(),
    businessRegistrationNumber: z.string(),
    ownsWarehouse: z.string(),
    officeAddress: z.string(),
    companyDescription: z.string(),
    companyWebsite: z.string(),
    yourPosition: z.string(),
    nationCode: z.string(),
    phoneNumber: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      businessType: "",
      country: "",
      yearEstablished: "",
      numberOfEmployees: "",
      annualSalesRevenue: "",
      businessRegistrationNumber: "",
      ownsWarehouse: "",
      officeAddress: "",
      companyDescription: "",
      companyWebsite: "",
      yourPosition: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <span className="text-3xl leading-[48px] font-[900]">
              Company Logo
            </span>
            <span className="text-sm">
              Upload your company logo. This will be the default image of your
              account.
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-20 h-20 bg-slate-500"></div>
            <Button>Upload Image</Button>
          </div>
          <span className="font-bold text-[32px] text-[#081342]">
            Country of residence
          </span>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Company name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        type="text"
                        {...field}
                        className="border-black border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <span className="">
              If you wish to update your company name, please let us know.{" "}
              <strong className="underline">Contact us</strong>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Business Type
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border border-black">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value={JSON.stringify(data?.company.type)}>{data?.company.type.name}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <span className="">Non-food manufacturing</span>
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">Country</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border border-black">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value={JSON.stringify(data?.country)}>{data?.country.name}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="yearEstablished"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Year Established
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border border-black">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value="+84">Việt Nam</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="numberOfEmployees"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Number Of Employees
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border border-black">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value={data?.company.number_members}>{data?.company.number_members}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="annualSalesRevenue"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Annual Sales Revenue
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border border-black">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value={data?.company.revenue}>{data?.company.revenue}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="businessRegistrationNumber"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Business Registration Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="border-black border"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Owns Warehouse</span>
            <RadioGroup defaultValue="yes" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r1" />
                <Label htmlFor="r1">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r2" />
                <Label htmlFor="r2">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Phone Number</span>
            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="nationCode"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/4">
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="border border-black">
                            <SelectValue placeholder="Select an nation code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border border-black">
                          <SelectItem value="+84">Việt Nam</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => {
                  return (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="Enter office phone number"
                          type="text"
                          {...field}
                          className="border-black border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Office Address</span>
            <Textarea
              className="border-black border-[1px]"
              placeholder="Provide the address of your main office"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Company Description</span>
            <Textarea
              className="border-black border-[1px]"
              placeholder="Briefly describe your company"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Company Website</span>
            <Input
              type="text"
              placeholder="Enter company website URL"
              className=" border-black border-[1px]"
              value={"Enter business registration number"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <RadioGroup defaultValue="yes">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r1" />
                <Label htmlFor="r1">My company has no website.</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg ">Your Position</span>
            <Input
              type="text"
              placeholder="Enter company website URL"
              className=" border-black border-[1px]"
              value={"Enter the name of your position in the company"}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default FormSchema;
