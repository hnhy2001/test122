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
import { getRequest, postRequest } from "@/hook/apiClient";
import { IUserProfile } from "@/type/user-profile.interface";
import { da } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
const FormSchema = () => {
  const [data, setData] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [businessType, setBusinessType] = useState<any>();
  const [numberEmployess, setNumberEmployess] = useState<any>();
  const [salesRevenue, setSalesRevenue] = useState<any>();

  useEffect(() => {
    (() => {
      getRequest("/config/countries").then((data) => setCountry(data));
      getRequest("/config/type_bussines").then((data) => setBusinessType(data));
      getRequest("/config/number_of_employee").then((data) =>
        setNumberEmployess(data)
      );
      getRequest("/config/annual_sale_revenue").then((data) =>
        setSalesRevenue(data)
      );
      getRequest("/auth/user-profile").then((data: any) => {
        setData(data);
        return form.reset({
          companyName: data?.company.name,
          businessType: JSON.stringify(data?.company.type),
          country: JSON.stringify(data?.country),
          yearEstablished: "",
          numberOfEmployees: data?.company.number_members.toString(),
          annualSalesRevenue: data?.company.revenue.toString(),
          businessRegistrationNumber:
            data?.company.bussiness_registrantion_number,
          ownsWarehouse: data?.company.is_warehouse.toString(),
          officeAddress: data?.company.address,
          companyDescription: data?.company.description,
          companyWebsite: data?.company.website,
          yourPosition: data?.company.position,
          nationCode: JSON.stringify({
            code: data?.company.location.code,
            name: data?.company.location.name,
            dial_code: data?.company.location.phone[0],
          }),
          phoneNumber: data?.company.phone,
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
      ownsWarehouse: "false",
      officeAddress: "",
      companyDescription: "",
      companyWebsite: "",
      yourPosition: "",
    },
  });

  const { toast } = useToast();
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const location = JSON.parse(values.country);
    const payload = {
      name: values.companyName,
      location: location,
      type: {code: JSON.parse(values.businessType).code},
      website: values.companyWebsite,
      revenue: values.annualSalesRevenue,
      number_members: values.numberOfEmployees,
      position: values.yourPosition,
      address: values.officeAddress,
      description: values.companyDescription,
      is_warehouse: values.ownsWarehouse == "true",
      bussiness_registrantion_number: values.businessRegistrationNumber,
      phone: values.phoneNumber,
    };
    postRequest("/user/company-update", payload).then((data :any) => {
      if(data.code == 200){
        toast({
          variant: "default",
          title: "Success!",
          description: "Register success",
          action: (
            <ToastAction
              altText="Try again"
            >
              Done
            </ToastAction>
          ),
        });
      }
    })
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
                        {businessType?.data.map((e: any) => {
                          return (
                            <SelectItem
                              key={JSON.stringify(e)}
                              value={JSON.stringify(e)}
                            >
                              {e.name}
                            </SelectItem>
                          );
                        })}
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
                        {country?.data.map((e: any) => {
                          return (
                            <SelectItem
                              key={JSON.stringify(e)}
                              value={JSON.stringify({
                                code: e.code,
                                name: e.name,
                              })}
                            >
                              {e.name}
                            </SelectItem>
                          );
                        })}
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
                        {numberEmployess?.data.map((e: any) => {
                          return (
                            <SelectItem
                              key={JSON.stringify(e)}
                              value={e.code.toString()}
                            >
                              {e.name}
                            </SelectItem>
                          );
                        })}
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
                        {salesRevenue?.data.map((e: any) => {
                          return (
                            <SelectItem
                              key={JSON.stringify(e)}
                              value={e.code.toString()}
                            >
                              {e.name}
                            </SelectItem>
                          );
                        })}
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
            <FormField
              control={form.control}
              name="ownsWarehouse"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormLabel className="text-xl font-bold">
                      Owns Warehouse
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-2"
                      >
                        <FormItem className="flex items-center gap-3 !m-0">
                          <span>Yes</span>
                          <RadioGroupItem
                            value="true"
                            className="w-6 h-6 !m-0"
                          />
                        </FormItem>
                        <FormItem className="flex items-center gap-3 !m-0">
                          <span>No</span>
                          <RadioGroupItem
                            value="false"
                            className="w-6 h-6 !m-0"
                          />
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                );
              }}
            ></FormField>
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border border-black">
                            <SelectValue placeholder="Select an nation code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border border-black">
                          {country?.data.map((e: any) => {
                            return (
                              <SelectItem
                                key={JSON.stringify(e)}
                                value={JSON.stringify({
                                  code: e.code,
                                  name: e.name,
                                  dial_code: e.dial_code,
                                })}
                              >
                                <div className="flex gap-2 w-full items-center text-lg">
                                  <img
                                    src={e.image}
                                    alt={e.name}
                                    className="w-14 h-7"
                                  />
                                  <span>{e.dial_code}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
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
            <FormField
              control={form.control}
              name="officeAddress"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Office address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="First name"
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
            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Company description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="First name"
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
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Company website
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        {...field}
                        type="text"
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
            <FormField
              control={form.control}
              name="yourPosition"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Your position
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        {...field}
                        type="text"
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
        <div className="flex justify-end w-full">
          <Button type="submit" className="w-1/4">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSchema;
